// PDF Generator for Procurement Document
document.addEventListener('DOMContentLoaded', function() {
    // Initialize PDF generation functionality when the page loads
    initPdfGenerator();
});

function initPdfGenerator() {
    // Get the preview button
    const previewBtn = document.getElementById('previewBtn');
    
    // Add event listener to the preview button
    if (previewBtn) {
        previewBtn.addEventListener('click', function(event) {
            // Prevent default form submission
            event.preventDefault();
            
            // Validate form before generating PDF
            if (validateForm()) {
                generatePDF();
                console.log(ThaiDate(new Date()));
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
    requiredInputs.forEach(function(input) {
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
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = function() {
            // Load additional font for Thai language support
            const fontScript = document.createElement('script');
            fontScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/polyfills.umd.js';
            fontScript.onload = function() {
                createPDF();
            };
            document.head.appendChild(fontScript);
        };
        document.head.appendChild(script);
    } else {
        createPDF();
    }
}

// Function to create the actual PDF
function createPDF() {
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
    // set img
    const img = document.getElementById("img");
      
    // setup img create canvas for ocnvert img to base64
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const imgData = canvas.toDataURL("{{ url_for('static', filename='img/krut.jpg') if url_for is defined else '../static/img/krut.jpg' }}");

    //get page width
    const pageWidth = doc.internal.pageSize.getWidth();
    // Add content to the PDF

    doc.addImage(imgData, 'jpg', 2, 1, 1, 1.1); // (imageData, type, x, y, width, height)
    doc.setFont("THSarabunNew", "normal");
    doc.setFontSize(12);
    doc.text('EN-PS-01', pageWidth-2, 0.5, { align: 'center' });
    doc.setFont("THSarabunNew", "bold");
    doc.setFontSize(16);
    doc.text('บันทึกข้อความ', pageWidth/2, 2, { align: 'center' });

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
    doc.text(`${ThaiDate(new Date())}`, 11.25, 3.2);
    doc.text(`ขอให้จัดหาพัสดุและขออนุมัติจัดซื้อจัดจ้าง พร้อมเสนอรายชื่อเพื่อแต่งตั้งผู้รับผิดชอบหรือคณะกรรมการกำหนดรายละเอียด`, 2.75, 3.8);
    doc.text(`คุณลักษณะเฉพาะและขอบเขตของงานพัสดุ และเสนอรายชื่อผู้ตรวจรับพัสดุหรือคณะกรรมการตรวจรับพัสดุ โดยวิธีเฉพาะเจาะจง`, 2.75, 4.4);
    doc.text(`คณบดีคณะวิศวกรรมศาสตร์  `, 2.8, 5.4);
    
    //body
    //I will separate them line by line. Each line will be stored in a separate script.
    first_line(doc, pageWidth);





    // use blob to preview pdf before download
    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, "_blank");
}