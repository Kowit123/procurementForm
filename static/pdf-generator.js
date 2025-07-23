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
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = function () {
            // Load additional font for Thai language support
            const fontScript = document.createElement('script');
            fontScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/polyfills.umd.js';
            fontScript.onload = function () {
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
        unit: 'mm',
        format: 'a4'
    });
    // Set font for Thai language support
    doc.addFileToVFS('THSarabunNew-normal.ttf', THSarabunNew_normal);
    doc.addFont('THSarabunNew-normal.ttf', 'THSarabunNew', 'normal');
    doc.addFileToVFS('THSarabunNew-bold.ttf', THSarabunNew_bold);
    doc.addFont('THSarabunNew-bold.ttf', 'THSarabunNew', 'bold');
    doc.setFont("THSarabunNew");

    // Get form data
    const formData = getFormData();

    // Add current date in Thai Buddhist Era format
    const currentDate = new Date();
    const thaiDate = convertToThaiDate(currentDate);

    // Add document title
    doc.setFontSize(18);
    doc.setFont("THSarabunNew", "bold");
    doc.text("เอกสารขออนุมัติจัดซื้อจัดจ้าง", 105, 20, { align: "center" });

    // Add date
    doc.setFontSize(12);
    doc.setFont("THSarabunNew", "normal");
    doc.text(`วันที่: ${thaiDate}`, 170, 30, { align: "right" });

    // Add form data
    // This is a simplified version - in a real implementation, you would add all form fields

    // Save the PDF
    doc.save('procurement-document.pdf');
}

// Helper function to get form data
function getFormData() {
    const formData = {};

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