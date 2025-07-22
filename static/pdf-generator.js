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
    
    // Set document properties
    doc.setProperties({
        title: 'เอกสารขออนุมัติจัดซื้อจัดจ้าง',
        subject: 'Procurement Document',
        author: 'Procurement System',
        creator: 'PDF Generator'
    });
    
    // Add title
    doc.setFontSize(18);
    doc.text('เอกสารขออนุมัติจัดซื้อจัดจ้าง', 105, 20, { align: 'center' });
    
    // Get form data
    const responsiblePerson = document.getElementById('responsible_person').value;
    const responsibleMember1 = document.getElementById('responsible_committee_member1').value;
    const responsibleMember2 = document.getElementById('responsible_committee_member2').value;
    const requestingFor = document.getElementById('requesting_for').value;
    const inspector = document.getElementById('inspector').value;
    const inspectorMember1 = document.getElementById('inspector_committee_member1').value;
    const inspectorMember2 = document.getElementById('inspector_committee_member2').value;
    
    // Add requester information table
    doc.setFontSize(12);
    doc.text('ข้อมูลผู้ขอให้จัดหา', 20, 40);
    
    doc.autoTable({
        startY: 45,
        head: [['รายละเอียด', 'ชื่อ-นามสกุล']],
        body: [
            ['ผู้ขอให้จัดหา/ประธานกรรมการ', responsiblePerson],
            ['กรรมการ', responsibleMember1 || '-'],
            ['กรรมการ', responsibleMember2 || '-'],
            ['ขออนุมัติเพื่อ', requestingFor]
        ],
        theme: 'grid',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: {
            0: { cellWidth: 60 },
            1: { cellWidth: 'auto' }
        }
    });
    
    // Add inspector information table
    doc.text('ข้อมูลผู้ตรวจรับพัสดุ', 20, doc.autoTable.previous.finalY + 10);
    
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 15,
        head: [['รายละเอียด', 'ชื่อ-นามสกุล']],
        body: [
            ['ผู้ตรวจรับพัสดุ/ประธานกรรมการ', inspector],
            ['กรรมการ', inspectorMember1 || '-'],
            ['กรรมการ', inspectorMember2 || '-']
        ],
        theme: 'grid',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: {
            0: { cellWidth: 60 },
            1: { cellWidth: 'auto' }
        }
    });
    
    // Add supply items table
    const supplyItems = document.querySelectorAll('.supply-item');
    const tableData = [];
    let totalAmount = 0;
    
    // Prepare table data
    supplyItems.forEach(function(item, index) {
        const name = item.querySelector('input[name="supply_name[]"]').value;
        const amount = item.querySelector('input[name="supply_amount[]"]').value;
        const price = item.querySelector('input[name="supply_price_unit[]"]').value;
        const sum = item.querySelector('input[name="sum_supply_price[]"]').value;
        const origin = item.querySelector('input[type="radio"]:checked').value === 'domestic' ? '✓' : '';
        const foreign = item.querySelector('input[type="radio"]:checked').value === 'foreign' ? '✓' : '';
        
        tableData.push([name, amount, price, sum, origin, foreign]);
        
        // Calculate total
        const sumValue = parseFloat(sum.replace(/,/g, '')) || 0;
        totalAmount += sumValue;
    });
    
    // Add grand total row
    const grandTotal = document.getElementById('grandTotal').textContent;
    
    // Create supply items table
    doc.text('รายการวัสดุ', 20, doc.autoTable.previous.finalY + 10);
    
    doc.autoTable({
        startY: doc.autoTable.previous.finalY + 15,
        head: [
            [
                { content: 'รายการวัสดุ/งานจ้าง', rowSpan: 2 },
                { content: 'จำนวน', rowSpan: 2 },
                { content: 'ราคาต่อหน่วย', rowSpan: 2 },
                { content: 'รวม', rowSpan: 2 },
                { content: 'พัสดุผลิตที่', colSpan: 2 }
            ],
            ['ประเทศไทย', 'ต่างประเทศ']
        ],
        body: tableData,
        foot: [
            [
                { content: 'ราคารวมทั้งสิ้น', colSpan: 3, styles: { fontStyle: 'bold', halign: 'right' } },
                { content: grandTotal + ' บาท', colSpan: 3, styles: { fontStyle: 'bold' } }
            ]
        ],
        theme: 'grid',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontStyle: 'bold', halign: 'center' },
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: {
            0: { cellWidth: 50 },
            1: { cellWidth: 20, halign: 'center' },
            2: { cellWidth: 30, halign: 'right' },
            3: { cellWidth: 30, halign: 'right' },
            4: { cellWidth: 20, halign: 'center' },
            5: { cellWidth: 20, halign: 'center' }
        }
    });
    
    // Add current date
    const currentDate = document.getElementById('current_date').value;
    doc.setFontSize(10);
    doc.text('วันที่: ' + currentDate, 20, doc.autoTable.previous.finalY + 15);
    
    // Add signature lines
    const signatureY = doc.autoTable.previous.finalY + 30;
    doc.text('ลงชื่อ............................................ผู้ขอให้จัดหา', 40, signatureY);
    doc.text('ลงชื่อ............................................ผู้ตรวจรับพัสดุ', 150, signatureY);
    
    doc.text(`(${responsiblePerson})`, 40, signatureY + 10, { align: 'center' });
    doc.text(`(${inspector})`, 150, signatureY + 10, { align: 'center' });
    
    // Save the PDF
    doc.save('procurement-document.pdf');
}