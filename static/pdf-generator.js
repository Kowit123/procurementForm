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
        unit: 'mm',
        format: 'a4'
    });
    // Set font for Thai language support
    doc.addFileToVFS('THSarabunNew-normal.ttf', THSarabunNew_normal);
    doc.addFont('THSarabunNew-normal.ttf', 'THSarabunNew', 'normal');
    doc.addFileToVFS('THSarabunNew-bold.ttf', THSarabunNew_bold);
    doc.addFont('THSarabunNew-bold.ttf', 'THSarabunNew', 'bold');
    doc.setFont("THSarabunNew");

    // Save the PDF
    doc.save('procurement-document.pdf');
}