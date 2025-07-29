// PDF Generator for Procurement Document
document.addEventListener('DOMContentLoaded', function () {
    // Initialize PDF generation functionality when the page loads
    initPdfGenerator();
});

function initPdfGenerator() {
    // Get the preview button
    const previewBtn = document.getElementById('previewBtn');

    // Add event listener to the preview button
    if (previewBtn) {
        previewBtn.addEventListener('click', function (event) {
            // Prevent default form submission
            event.preventDefault();

            // Validate form before generating PDF
            if (validateForm()) {
                generatePDF();
                console.log(convertToThaiDate(new Date()));
            }
        });
    }
}

// Form validation function
function validateForm() {
    const requiredInputs = document.querySelectorAll('#procurementForm [required]');
    let isValid = true;
    let errorMessage = '';

    // Check each required field
    requiredInputs.forEach(function (input) {
        if (!input.value.trim()) {
            isValid = false;
            const label = input.previousElementSibling?.textContent ||
                input.closest('td')?.previousElementSibling?.textContent ||
                'required field';
            errorMessage += `กรุณากรอก ${label.replace('*', '').trim()}\n`;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    // Show error message if validation fails
    if (!isValid) {
        alert(errorMessage);
    }

    return isValid;
}

// Function to generate PDF
function generatePDF() {
    // Load jsPDF library dynamically if not already loaded
    if (typeof jsPDF === 'undefined') {
        const script = document.createElement('script');
        script.src = 'static/jspdf.min.js';
        script.onload = function () {
            createPDF();
        };
        document.head.appendChild(script);
    } else {
        createPDF();
    }
}

// Function to create the actual PDF
function createPDF() {
    // Get the form data
    const formData = getFormData();
    // Create new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'cm',
        format: 'a4'
    });
    // Set font for Thai language support
    doc.addFileToVFS('THSarabunNew-normal.ttf', THSarabunNew_normal);
    doc.addFont('THSarabunNew-normal.ttf', 'THSarabunNew', 'normal');
    doc.addFileToVFS('THSarabunNew-bold.ttf', THSarabunNew_bold);
    doc.addFont('THSarabunNew-bold.ttf', 'THSarabunNew', 'bold');
    //get page width
    const pageWidth = doc.internal.pageSize.getWidth();
    // Add content to the PDF

    // Add logo image if it exists
    try {
        const img = document.getElementById("img");
        if (img) {
            // Make sure the image is loaded
            if (img.complete) {
                // setup img create canvas for convert img to base64
                const canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth || img.width;
                canvas.height = img.naturalHeight || img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                const imgData = canvas.toDataURL("image/jpeg");
                doc.addImage(imgData, 'JPEG', 2, 1, 1, 1.1); // (imageData, type, x, y, width, height)
            } else {
                // If image is not loaded yet, wait for it
                img.onload = function () {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.naturalWidth || img.width;
                    canvas.height = img.naturalHeight || img.height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    const imgData = canvas.toDataURL("image/jpeg");
                    doc.addImage(imgData, 'JPEG', 2, 1, 1, 1.1);

                    // Continue with the rest of the PDF generation
                    continueWithPdfGeneration();
                };
                return; // Exit function to wait for image load
            }
        }
    } catch (error) {
        console.log('Logo image not found, continuing without image:', error);
    }
    doc.setFont("THSarabunNew", "normal");
    doc.setFontSize(12);
    doc.text('EN-PS-01', pageWidth - 2, 0.5, { align: 'right' });
    doc.setFont("THSarabunNew", "bold");
    doc.setFontSize(16);
    doc.text('บันทึกข้อความ', pageWidth / 2, 2, { align: 'center' });

    //header
    doc.setFontSize(14);
    doc.text(`ส่วนราชการ`, 2, 2.6);
    doc.text(`ที่`, 2, 3.2);
    doc.text(`วันที่`, 10.5, 3.2);
    doc.text(`เรื่อง`, 2, 3.8);
    doc.text(`เรียน`, 2, 5.4);
    doc.setFont("THSarabunNew", "normal");
    doc.text(`งานพัสดุ คณะวิศวกรรมศาสตร์  มหาวิทยาลัยมหาสารคาม เบอร์โทรภายใน 3014 `, 3.75, 2.6);
    doc.text(`อว 0605.14(1.1)/ `, 2.25, 3.2);
    // Use the date from form data
    doc.text(`${formData.documentDate}`, 11.25, 3.2);
    doc.text(`ขอให้จัดหาพัสดุและขออนุมัติจัดซื้อจัดจ้าง พร้อมเสนอรายชื่อเพื่อแต่งตั้งผู้รับผิดชอบหรือคณะกรรมการกำหนดรายละเอียด`, 2.75, 3.8);
    doc.text(`คุณลักษณะเฉพาะและขอบเขตของงานพัสดุ และเสนอรายชื่อผู้ตรวจรับพัสดุหรือคณะกรรมการตรวจรับพัสดุโดยวิธีเฉพาะเจาะจง`, 2.75, 4.4);
    doc.text(`คณบดีคณะวิศวกรรมศาสตร์  `, 2.8, 5.4);

    //body
    //I will separate them line by line. Each line will be stored in a separate script.
    let currentY = 6.0; // Starting y position after header

    currentY = first_line(doc, pageWidth, currentY);
    currentY = second_line(doc, pageWidth, formData.totalItems, formData.grandTotal, currentY);
    currentY = third_line(doc, pageWidth, formData.grandTotalText, formData.requestingFor, currentY);
    currentY = forthTosixth_line(doc, currentY);
    currentY = seventhTonineth_line(doc, pageWidth, formData.responsiblePerson, formData.responsibleCommitteeMember1, formData.responsibleCommitteeMember2, currentY);
    currentY = tenthTofourteenth_line(doc, currentY);
    currentY = fiveteenthTonineteenth_line(doc, pageWidth, formData.inspector, formData.inspectorCommitteeMember1, formData.inspectorCommitteeMember2, currentY);
    currentY = signature_box1(doc, pageWidth, 'ผู้ขอให้จัดหาหรือผู้รับผิดชอบ', formData.responsiblePerson, currentY);
    currentY = rest_of_first_page(doc, pageWidth, formData.responsiblePerson, currentY);



doc.addPage();
doc.setFont("THSarabunNew", "normal");
doc.setFontSize(12);
doc.text('-2-', pageWidth / 2, 0.5, { align: 'center' });
doc.text('EN-PS-01', pageWidth - 2, 0.5, { align: 'right' });
doc.setFontSize(14);
y=2;
doc.text('ความเหนของงานการเงินและบัญชี', 3.5, y);

    // use blob to preview pdf before download
    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, "_blank");
}

// function to get form data
function getFormData() {
    const formData = {};

    // Get date information
    const dateInput = document.getElementById('Date');
    formData.documentDate = dateInput && dateInput.value.trim() ? dateInput.value : convertToThaiDate(new Date());

    // Get responsible person information
    formData.responsiblePerson = document.getElementById('responsible_person').value;
    formData.responsibleCommitteeMember1 = document.getElementById('responsible_committee_member1').value;
    formData.responsibleCommitteeMember2 = document.getElementById('responsible_committee_member2').value;
    formData.requestingFor = document.getElementById('requesting_for').value;

    // Get inspector information
    formData.inspector = document.getElementById('inspector').value;
    formData.inspectorCommitteeMember1 = document.getElementById('inspector_committee_member1').value;
    formData.inspectorCommitteeMember2 = document.getElementById('inspector_committee_member2').value;

    // Get supply list
    formData.supplies = [];
    const supplyRows = document.querySelectorAll('.supply-item');
    supplyRows.forEach(function (row, index) {
        const nameInput = row.querySelector('input[name="supply_name[]"]');
        const amountInput = row.querySelector('input[name="supply_amount[]"]');
        const priceInput = row.querySelector('input[name="supply_price_unit[]"]');
        const sumInput = row.querySelector('input[name="sum_supply_price[]"]');
        const isDomestic = row.querySelector(`input[name="product_origin_${index + 1}"][value="domestic"]`).checked;

        if (nameInput && nameInput.value) {
            formData.supplies.push({
                name: nameInput.value,
                amount: amountInput ? parseFloat(amountInput.value) || 0 : 0,
                price: priceInput ? parseFloat(priceInput.value) || 0 : 0,
                sum: sumInput ? parseFloat(sumInput.value) || 0 : 0,
                isDomestic: isDomestic
            });
        }
    });

    // Get totals
    formData.totalItems = document.getElementById('totalItems').textContent;
    formData.grandTotal = document.getElementById('grandTotal').textContent;
    formData.grandTotalText = numToThaiText(parseFloat(formData.grandTotal.replace(/,/g, '')));

    return formData;
}