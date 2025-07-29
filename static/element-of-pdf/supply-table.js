// Supply table generator with pagination support
function generateSupplyTable(doc, pageWidth, supplies, startY = 8) {
    if (!supplies || supplies.length === 0) {
        return startY; // Return original Y if no supplies
    }
    
    const itemsPerPage = 21; // Maximum items per page
    const rowHeight = 0.5;
    const headerHeight = 1.0;
    
    // Table column widths (in cm) - adjusted for better fit
    const colWidths = {
        item: 5.5,      // รายการวัสดุ/งานจ้าง
        amount: 1.2,    // จำนวน
        price: 1.8,     // ราคาต่อหน่วย
        unit: 1.2,      // หน่วย
        total: 1.8,     // รวม
        domestic: 1.0,  // ประเทศไทย
        foreign: 1.0    // ต่างประเทศ
    };
    
    // Table starting positions
    const tableX = 2;
    const colPositions = {
        item: tableX,
        amount: tableX + colWidths.item,
        price: tableX + colWidths.item + colWidths.amount,
        unit: tableX + colWidths.item + colWidths.amount + colWidths.price,
        total: tableX + colWidths.item + colWidths.amount + colWidths.price + colWidths.unit,
        domestic: tableX + colWidths.item + colWidths.amount + colWidths.price + colWidths.unit + colWidths.total,
        foreign: tableX + colWidths.item + colWidths.amount + colWidths.price + colWidths.unit + colWidths.total + colWidths.domestic
    };
    
    let currentY = startY;
    let itemsOnCurrentPage = 0;
    let isFirstTable = true;
    
    // Function to draw table header
    function drawTableHeader(y) {
        doc.setFont("THSarabunNew", "bold");
        doc.setFontSize(10);
        
        const headerY = y;
        const tableWidth = Object.values(colWidths).reduce((sum, width) => sum + width, 0);
        
        // Main header row
        doc.rect(tableX, headerY, tableWidth, headerHeight);
        
        // Column separators
        let currentX = tableX;
        Object.values(colWidths).forEach((width, index) => {
            if (index < Object.values(colWidths).length - 1) {
                currentX += width;
                doc.line(currentX, headerY, currentX, headerY + headerHeight);
            }
        });
        
        // Sub-header for origin columns
        const originHeaderY = headerY + 0.5;
        doc.line(colPositions.domestic, originHeaderY, colPositions.foreign + colWidths.foreign, originHeaderY);
        doc.line(colPositions.foreign, headerY, colPositions.foreign, headerY + headerHeight);
        
        // Header text
        doc.text('รายการวัสดุ/งานจ้าง', colPositions.item + 0.1, headerY + 0.3);
        doc.text('จำนวน', colPositions.amount + 0.1, headerY + 0.3);
        doc.text('ราคาต่อหน่วย', colPositions.price + 0.05, headerY + 0.3);
        doc.text('หน่วย', colPositions.unit + 0.1, headerY + 0.3);
        doc.text('รวม', colPositions.total + 0.1, headerY + 0.3);
        doc.text('พัสดุผลิตที่', colPositions.domestic + 0.2, headerY + 0.25);
        doc.text('ประเทศไทย', colPositions.domestic + 0.05, originHeaderY + 0.25);
        doc.text('ต่างประเทศ', colPositions.foreign + 0.05, originHeaderY + 0.25);
        
        return headerY + headerHeight;
    }
    
    // Function to draw table row
    function drawTableRow(supply, index, y) {
        doc.setFont("THSarabunNew", "normal");
        doc.setFontSize(10);
        
        const tableWidth = Object.values(colWidths).reduce((sum, width) => sum + width, 0);
        doc.rect(tableX, y, tableWidth, rowHeight);
        
        // Column separators
        let currentX = tableX;
        Object.values(colWidths).forEach((width, idx) => {
            if (idx < Object.values(colWidths).length - 1) {
                currentX += width;
                doc.line(currentX, y, currentX, y + rowHeight);
            }
        });
        
        // Row data
        const textY = y + 0.35;
        if (supply.name) {
            // Truncate long text to fit in column
            let itemName = supply.name;
            if (doc.getTextWidth(itemName) > colWidths.item - 0.2) {
                while (doc.getTextWidth(itemName + '...') > colWidths.item - 0.2 && itemName.length > 0) {
                    itemName = itemName.slice(0, -1);
                }
                itemName += '...';
            }
            doc.text(itemName, colPositions.item + 0.1, textY);
            doc.text(supply.amount ? supply.amount.toString() : '', colPositions.amount + 0.1, textY);
            doc.text(supply.price ? formatNumberWithCommas(supply.price.toFixed(2)) : '', colPositions.price + 0.1, textY);
            doc.text('ชิ้น', colPositions.unit + 0.1, textY);
            doc.text(supply.sum ? formatNumberWithCommas(supply.sum.toFixed(2)) : '', colPositions.total + 0.1, textY);
            
            // Origin checkmarks
            if (supply.isDomestic) {
                doc.text('✓', colPositions.domestic + 0.4, textY);
            } else {
                doc.text('✓', colPositions.foreign + 0.4, textY);
            }
        }
        
        return y + rowHeight;
    }
    
    // Function to add new page for table continuation
    function addNewPageForTable() {
        doc.addPage();
        doc.setFont("THSarabunNew", "normal");
        doc.setFontSize(12);
        
        // Page header
        doc.text('EN-PS-01', pageWidth - 2, 0.5, { align: 'right' });
        
        doc.setFont("THSarabunNew", "bold");
        doc.setFontSize(14);
        doc.text('รายการวัสดุ (ต่อ)', pageWidth / 2, 1.5, { align: 'center' });
        
        itemsOnCurrentPage = 0;
        return 2.5; // Return Y position for table start on new page
    }
    
    // Add table title if it's the first table
    if (isFirstTable) {
        doc.setFont("THSarabunNew", "bold");
        doc.setFontSize(12);
        doc.text('รายการวัสดุที่ขอจัดหา', tableX, currentY);
        currentY += 0.6;
    }
    
    // Draw initial header
    currentY = drawTableHeader(currentY);
    
    // Draw each supply item
    supplies.forEach((supply, index) => {
        // Check if we need a new page (leave space for footer content)
        if (itemsOnCurrentPage >= itemsPerPage || currentY > 25) {
            currentY = addNewPageForTable();
            currentY = drawTableHeader(currentY);
        }
        
        currentY = drawTableRow(supply, index, currentY);
        itemsOnCurrentPage++;
    });
    
    // Add some empty rows to make the table look complete (minimum 3 rows)
    const minRows = Math.max(3, Math.min(itemsPerPage - itemsOnCurrentPage, 5));
    for (let i = 0; i < minRows; i++) {
        if (currentY > 25) break; // Don't add if we're running out of space
        currentY = drawTableRow({}, itemsOnCurrentPage + i, currentY);
    }
    
    return currentY + 0.5; // Return Y position after table
}

// Function to format number with commas for display
function formatNumberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}