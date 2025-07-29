// Supply table generator with pagination support
function generateSupplyTable(doc, pageWidth, supplies, startY = 8) {
    // Initialize supplies as empty array if not provided
    if (!supplies) {
        supplies = [];
    }

    const itemsPerPage = 20; // Maximum items per page
    const rowHeight = 0.7;   // Increased for better readability
    const headerHeight = 1.2; // Increased for formal appearance

    // Table column widths (in cm) - optimized for formal layout
    const colWidths = {
        no: 0.8,        // ลำดับ (sequence number)
        item: 5.0,      // รายการวัสดุ/งานจ้าง
        amountUnit: 2.0, // จำนวน/หน่วย (combined)
        price: 1.5,     // ราคาต่อหน่วย
        total: 1.8,     // รวม
        domestic: 1.0,  // ประเทศไทย
        foreign: 1.0    // ต่างประเทศ
    };

    // Table starting positions - centered for formal appearance
    const tableX = 1.5;
    const colPositions = {
        no: tableX,
        item: tableX + colWidths.no,
        amountUnit: tableX + colWidths.no + colWidths.item,
        price: tableX + colWidths.no + colWidths.item + colWidths.amountUnit,
        total: tableX + colWidths.no + colWidths.item + colWidths.amountUnit + colWidths.price,
        domestic: tableX + colWidths.no + colWidths.item + colWidths.amountUnit + colWidths.price + colWidths.total,
        foreign: tableX + colWidths.no + colWidths.item + colWidths.amountUnit + colWidths.price + colWidths.total + colWidths.domestic
    };

    let currentY = startY;
    let itemsOnCurrentPage = 0;
    let isFirstTable = true;

    // Function to draw table header
    function drawTableHeader(y) {
        doc.setFont("THSarabunNew", "bold");
        doc.setFontSize(11);

        const headerY = y;
        const tableWidth = Object.values(colWidths).reduce((sum, width) => sum + width, 0);

        // Main header row with thicker border
        doc.setLineWidth(0.02);
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
        const originHeaderY = headerY + 0.6;
        doc.line(colPositions.domestic, originHeaderY, colPositions.foreign + colWidths.foreign, originHeaderY);
        doc.line(colPositions.foreign, headerY, colPositions.foreign, headerY + headerHeight);

        // Header text with better positioning
        const textYMain = headerY + 0.4;
        const textYSub = originHeaderY + 0.35;

        doc.text('ลำดับ', colPositions.no + colWidths.no / 2, textYMain, { align: 'center' });
        doc.text('รายการวัสดุ/งานจ้าง', colPositions.item + colWidths.item / 2, textYMain, { align: 'center' });
        doc.text('จำนวน/หน่วย', colPositions.amountUnit + colWidths.amountUnit / 2, textYMain, { align: 'center' });
        doc.text('ราคาต่อหน่วย', colPositions.price + colWidths.price / 2, textYMain, { align: 'center' });
        doc.text('รวม', colPositions.total + colWidths.total / 2, textYMain, { align: 'center' });

        // Origin header
        const originCenterX = colPositions.domestic + (colWidths.domestic + colWidths.foreign) / 2;
        doc.text('พัสดุผลิตที่', originCenterX, headerY + 0.3, { align: 'center' });
        doc.text('ประเทศไทย', colPositions.domestic + colWidths.domestic / 2, textYSub, { align: 'center' });
        doc.text('ต่างประเทศ', colPositions.foreign + colWidths.foreign / 2, textYSub, { align: 'center' });

        doc.setLineWidth(0.01); // Reset line width
        return headerY + headerHeight;
    }

    // Function to draw table row
    function drawTableRow(supply, index, y) {
        doc.setFont("THSarabunNew", "normal");
        doc.setFontSize(10);

        const tableWidth = Object.values(colWidths).reduce((sum, width) => sum + width, 0);
        doc.setLineWidth(0.01);
        doc.rect(tableX, y, tableWidth, rowHeight);

        // Column separators
        let currentX = tableX;
        Object.values(colWidths).forEach((width, idx) => {
            if (idx < Object.values(colWidths).length - 1) {
                currentX += width;
                doc.line(currentX, y, currentX, y + rowHeight);
            }
        });

        // Row data with better alignment
        const textY = y + 0.45; // Centered vertically in row

        if (supply.name) {
            // Row number
            doc.text((index + 1).toString(), colPositions.no + colWidths.no / 2, textY, { align: 'center' });

            // Item name with proper truncation
            let itemName = supply.name;
            const maxWidth = colWidths.item - 0.2;
            if (doc.getTextWidth(itemName) > maxWidth) {
                while (doc.getTextWidth(itemName + '...') > maxWidth && itemName.length > 0) {
                    itemName = itemName.slice(0, -1);
                }
                itemName += '...';
            }
            doc.text(itemName, colPositions.item + 0.1, textY);

            // Combined amount and unit
            const amountText = supply.amount ? supply.amount.toString() : '';
            const unitText = supply.unit || 'ชิ้น';
            const combinedText = amountText ? `${amountText} ${unitText}` : '';
            doc.text(combinedText, colPositions.amountUnit + colWidths.amountUnit / 2, textY, { align: 'center' });

            // Numeric values with right alignment
            doc.text(supply.price ? formatNumberWithCommas(supply.price.toFixed(2)) : '',
                colPositions.price + colWidths.price - 0.1, textY, { align: 'right' });
            doc.text(supply.sum ? formatNumberWithCommas(supply.sum.toFixed(2)) : '',
                colPositions.total + colWidths.total - 0.1, textY, { align: 'right' });

            // Origin checkmarks with better positioning
            if (supply.isDomestic) {
                doc.text('✓', colPositions.domestic + colWidths.domestic / 2, textY, { align: 'center' });
            } else if (supply.isDomestic === false) {
                doc.text('✓', colPositions.foreign + colWidths.foreign / 2, textY, { align: 'center' });
            }
        }
        // Empty rows don't show any content, including index numbers

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
        doc.setFontSize(14);
        const tableWidth = Object.values(colWidths).reduce((sum, width) => sum + width, 0);
        const titleX = tableX + tableWidth / 2;
        doc.text('รายการวัสดุที่ขอจัดหา', titleX, currentY, { align: 'center' });
        currentY += 0.8;
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

    // Add empty rows to complete the table to exactly 20 rows per page
    const remainingRows = itemsPerPage - itemsOnCurrentPage;

    for (let i = 0; i < remainingRows; i++) {
        if (currentY > 24) break; // Leave space for footer
        currentY = drawTableRow({}, supplies.length + i, currentY);
    }

    // Add table border bottom with thicker line for formal appearance
    const tableWidth = Object.values(colWidths).reduce((sum, width) => sum + width, 0);
    doc.setLineWidth(0.02);
    doc.line(tableX, currentY, tableX + tableWidth, currentY);
    doc.setLineWidth(0.01);

    return currentY + 0.5; // Return Y position after table
}

// Function to format number with commas for display
function formatNumberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}