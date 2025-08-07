// Supply table generator with pagination support
function generateSupplyTable(doc, pageWidth, supplies, Const1, Const2, Const3, startY = 2.4, vatInfo = null) {
    // Initialize supplies as empty array if not provided
    if (!supplies) {
        supplies = [];
    }
    doc.setFont("THSarabunNew", "normal");
    doc.setFontSize(12);
    doc.text('EN-PS-01', pageWidth - 2, 0.5, { align: 'right' });
    doc.setFont("THSarabunNew", "bold");
    doc.setFontSize(14);
    doc.text("การกำหนดรายละเอียดคุณลักษณะเฉพาะของพัสดุและหรือขอบเขตของงานจ้าง แนบท้ายบันทึกข้อความ", pageWidth / 2, 1, { align: "center" });
    doc.setFont("THSarabunNew", "normal");
    preheader(doc, pageWidth, Const1, Const2, Const3, 1.6);

    const itemsPerPage = 20; // Maximum items per page
    const rowHeight = 0.7;   // Increased for better readability
    const headerHeight = 1.4; // Increased for formal appearance

    // Table column widths (in cm) - optimized for formal layout
    const colWidths = {
        no: 0.8,        // ลำดับ (sequence number)
        item: 10.0,      // รายการวัสดุ/งานจ้าง
        amountUnit: 1.5, // จำนวน/หน่วย (combined)
        price: 1.5,     // ราคาต่อหน่วย
        total: 1.5,     // รวม
        domestic: 1.7,  // ประเทศไทย
        foreign: 1.7    // ต่างประเทศ
    };

    // Table starting positions - centered for formal appearance
    const tableX = 1;
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
        doc.setFontSize(14);

        const headerY = y;
        const tableWidth = Object.values(colWidths).reduce((sum, width) => sum + width, 0);

        // Main header row with thicker border
        doc.setLineWidth(0.01);
        doc.rect(tableX, headerY, tableWidth, headerHeight);

        // Column separators - draw all except the one between domestic and foreign (for T-shape)
        let currentX = tableX;
        Object.values(colWidths).forEach((width, index) => {
            if (index < Object.values(colWidths).length - 1) {
                currentX += width;
                // Skip drawing the line between domestic and foreign columns in the upper part
                if (currentX !== colPositions.foreign) {
                    doc.line(currentX, headerY, currentX, headerY + headerHeight);
                }
            }
        });

        // Create T-shaped layout for origin columns
        const originHeaderY = headerY + 0.7;

        // Horizontal line across both origin columns (top of the T)
        doc.line(colPositions.domestic, originHeaderY, colPositions.foreign + colWidths.foreign, originHeaderY);

        // Vertical line between domestic and foreign columns (stem of the T) - only from horizontal line down
        doc.line(colPositions.foreign, originHeaderY, colPositions.foreign, headerY + headerHeight);

        // Header text positioning
        const textYMain = headerY + 0.4;
        const textYSub = originHeaderY + 0.35;

        // Main column headers
        doc.text('ที่', colPositions.no + colWidths.no / 2, textYMain + 0.5, { align: 'center' });
        doc.text('ชื่อพัสดุและลายละเอียดคุณลักษณะเฉพาะหรือขอบเขตของงานจ้าง', colPositions.item + colWidths.item / 2, textYMain + 0.5, { align: 'center' });
        doc.text('จำนวน', colPositions.amountUnit + colWidths.amountUnit / 2, textYMain + 0.5, { align: 'center' });
        doc.text('ราคา', colPositions.price + colWidths.price / 2, textYMain + 0.1, { align: 'center' });
        doc.text('ต่อหน่วย', colPositions.price + colWidths.price / 2, textYMain + 0.6, { align: 'center' });
        doc.text('รวม', colPositions.total + colWidths.total / 2, textYMain + 0.5, { align: 'center' });

        // T-shaped origin header layout
        const originCenterX = colPositions.domestic + (colWidths.domestic + colWidths.foreign) / 2;
        doc.text('พัสดุผลิตที่', originCenterX, headerY + 0.5, { align: 'center' }); // Top of T
        doc.text('ประเทศไทย', colPositions.domestic + colWidths.domestic / 2, textYSub + 0.2, { align: 'center' }); // Left of T
        doc.text('ต่างประเทศ', colPositions.foreign + colWidths.foreign / 2, textYSub + 0.2, { align: 'center' }); // Right of T

        doc.setLineWidth(0.01); // Reset line width
        return headerY + headerHeight;
    }

    // Function to draw table row
    function drawTableRow(supply, index, y) {
        doc.setFont("THSarabunNew", "normal");
        doc.setFontSize(14);

        const tableWidth = Object.values(colWidths).reduce((sum, width) => sum + width, 0);

        // Add background image for this row
        addRowBackgroundImage(doc, tableX, y, tableWidth, rowHeight, index);

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
            doc.text(combinedText, colPositions.amountUnit + colWidths.amountUnit - 0.1, textY, { align: 'right' });

            // Numeric values with right alignment
            doc.text(supply.price ? formatNumberWithCommas(supply.price.toFixed(2)) : '',
                colPositions.price + colWidths.price - 0.1, textY, { align: 'right' });
            doc.text(supply.sum ? formatNumberWithCommas(supply.sum.toFixed(2)) : '',
                colPositions.total + colWidths.total - 0.1, textY, { align: 'right' });

            // Origin checkmarks with better positioning
            if (supply.isDomestic) {
                doc.text('/', colPositions.domestic + colWidths.domestic / 2, textY, { align: 'center' });
            } else if (supply.isDomestic === false) {
                doc.text('/', colPositions.foreign + colWidths.foreign / 2, textY, { align: 'center' });
            }
        }
        // Empty rows don't show any content, including index numbers

        // Add middle image overlay for this row
        addRowMiddleImage(doc, tableX, y, tableWidth, rowHeight, supply, index);

        return y + rowHeight;
    }

    // Function to add new page for table continuation
    function addNewPageForTable() {
        doc.addPage();
        doc.setFont("THSarabunNew", "normal");
        doc.setFontSize(12);
        doc.text('EN-PS-01', pageWidth - 2, 0.5, { align: 'right' });
        doc.setFont("THSarabunNew", "bold");
        doc.setFontSize(14);
        doc.text("การกำหนดรายละเอียดคุณลักษณะเฉพาะของพัสดุและหรือขอบเขตของงานจ้าง แนบท้ายบันทึกข้อความ", pageWidth / 2, 1, { align: "center" });
        doc.setFont("THSarabunNew", "normal");
        preheader(doc, pageWidth, Const1, Const2, Const3, 1.6);

        const newPageStartY = 3.2;
        // Add background image to the new page as well
        addTableBackgroundImage(doc, pageWidth, newPageStartY, itemsPerPage);

        return newPageStartY; // Return Y position for table start on new page
    }

    // Add table title if it's the first table
    if (isFirstTable) {
        currentY += 0.8;
    }

    // Add background image behind the entire table
    addTableBackgroundImage(doc, pageWidth, currentY, supplies.length);

    // Draw initial header
    currentY = drawTableHeader(currentY);

    // Calculate total pages needed
    const totalPages = Math.ceil(supplies.length / itemsPerPage);
    let currentPage = 1;

    // Draw each supply item
    supplies.forEach((supply, index) => {
        // Check if we need a new page (leave space for footer content)
        if (itemsOnCurrentPage >= itemsPerPage) {
            // Add "หน้าต่อไป (ถ้ามี)....." text before creating new page
            doc.setFont("THSarabunNew", "normal");
            doc.setFontSize(14);
            doc.text('หน้าต่อไป (ถ้ามี).....', pageWidth - 1.3, 28.5, { align: 'right' });

            currentY = addNewPageForTable();
            currentY = drawTableHeader(currentY);
            itemsOnCurrentPage = 0;
            currentPage++;
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
    doc.setLineWidth(0.01);
    doc.line(tableX, currentY, tableX + tableWidth, currentY);
    doc.setLineWidth(0.01);

    // Check if this is the last table/page and add additional content
    const isLastTable = currentPage === totalPages;
    if (isLastTable) {
        // Use passed vatInfo or get from global formData
        const finalVatInfo = vatInfo || {
            vatStatus: window.currentFormData?.vatStatus || 'no_vat',
            vatAmount: window.currentFormData?.vatAmount || '0.00',
            grandTotal: window.currentFormData?.grandTotal || '0.00'
        };
        currentY = addLastTableContent(doc, pageWidth, currentY, supplies.length, finalVatInfo);
    }

    return currentY + 0.5; // Return Y position after table
}

// Function to format number with commas for display
function formatNumberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Function to add content only to the last table
function addLastTableContent(doc, _pageWidth, currentY, _totalItems, vatInfo) {
    doc.setFont("THSarabunNew", "normal");
    doc.setFontSize(14);

    // Parse numeric values
    const grandTotal = parseFloat(vatInfo.grandTotal.replace(/,/g, ''));
    const vatAmount = parseFloat(vatInfo.vatAmount.replace(/,/g, ''));

    // Table dimensions to match the supply table
    const tableX = 1;
    const tableWidth = 18.7; // Match the supply table width
    const rowHeight = 0.7;
    const boxStartY = currentY + 0.1; // Small gap from table

    // Calculate number of rows needed based on VAT status
    let numberOfRows = 0;
    let boxContent = [];

    // Prepare content based on VAT status
    switch (vatInfo.vatStatus) {
        case 'no_vat':
            numberOfRows = 1;
            boxContent = [
                { label: 'ยอดรวม(ไม่คิดภาษี)', value: `เป็นเงิน ${formatNumberWithCommas(grandTotal.toFixed(2))} บาท` }
            ];
            break;

        case 'vat_included':
            const subtotalIncluded = grandTotal - vatAmount;
            numberOfRows = 3;
            boxContent = [
                { label: 'ยอดรวม(ไม่รวมภาษี)', value: `${formatNumberWithCommas(subtotalIncluded.toFixed(2))} บาท` },
                { label: 'ภาษีมูลค่าเพิ่ม 7%', value: `${vatInfo.vatAmount} บาท` },
                { label: 'รวมทั้งสิ้น', value: `เป็นเงิน ${vatInfo.grandTotal} บาท` }
            ];
            break;

        case 'vat_excluded':
            const subtotalExcluded = grandTotal - vatAmount;
            numberOfRows = 3;
            boxContent = [
                { label: 'ยอดรวม(ไม่รวมภาษี)', value: `${formatNumberWithCommas(subtotalExcluded.toFixed(2))} บาท` },
                { label: 'ภาษีมูลค่าเพิ่ม 7%', value: `${vatInfo.vatAmount} บาท` },
                { label: 'รวมทั้งสิ้น', value: `เป็นเงิน ${vatInfo.grandTotal} บาท` }
            ];
            break;

        default:
            numberOfRows = 1;
            boxContent = [
                { label: 'รวมทั้งสิ้น(ไม่คิดภาษี)', value: `เป็นเงิน ${formatNumberWithCommas(grandTotal.toFixed(2))} บาท` }
            ];
            break;
    }

    // Draw the connected box
    const boxHeight = numberOfRows * rowHeight;

    // Set line width for box border
    doc.setLineWidth(0.01);

    // Draw the main box rectangle
    doc.rect(tableX, boxStartY, tableWidth, boxHeight);

    // Draw horizontal lines between rows
    for (let i = 1; i < numberOfRows; i++) {
        const lineY = boxStartY + (i * rowHeight);
        doc.line(tableX, lineY, tableX + tableWidth, lineY);
    }

    // Draw vertical separator line (similar to table structure)
    const separatorX = tableX + tableWidth * 0.5775; // 60% from left for label/value separation
    doc.line(separatorX, boxStartY, separatorX, boxStartY + boxHeight);

    // Add content to each row
    boxContent.forEach((content, index) => {
        const textY = boxStartY + (index * rowHeight) + (rowHeight / 2) + 0.1;

        // Label on the left side
        doc.text(content.label, tableX + 0.2, textY);

        // Value on the right side, right-aligned
        doc.text(content.value, tableX + tableWidth - 0.2, textY, { align: 'right' });
    });

    // Reset line width
    doc.setLineWidth(0.01);

    doc.setFont('THSarabunNew', 'normal');
    doc.setFontSize(14);
    let y = boxStartY + boxHeight + 0.6;
    doc.text('ได้กำหนดการส่งมอบพัสดุ ภายใน 30 วัน/วันเวลาทำการ นับถัดจากวันลงนามในใบสั่งซื้อ/ใบสั่งจ้างหรือหนังสือข้อตกลง', 2, y);
    y += 0.6;
    doc.text('โดยเกณฑ์ที่ใช้ในการพิจารณาเกณฑ์ราคาเป็นสำคัญ', 1, y)
    y += 0.6;
    condition(doc, y);
    doc.setFontSize(14);
    y = signature_box8(doc, y);
    y = signature_box9(doc, y);
    y = signature_box10(doc, y);

    return boxStartY + boxHeight;
}


function preheader(doc, pageWidth, Const1, Const2, Const3, y) {
    const text1 = `รายการ ${document.querySelector('input[name = "objective"]:checked').value}`;
    const text2 = `${Const1}`;
    const dot = '..................................................................................................................................................................................................';

    const text1Width = doc.getTextWidth(text1);

    const x1 = 2;
    const x1End = x1 + text1Width; // end of text1

    doc.text(text1, x1, y);
    doc.text(dot, x1End, y + 0.05);
    doc.text(text2, x1End + 0.2, y);
    y += 0.6;
    doc.text('โดยมีแหล่งที่มาของราคากลางจาก (  ) การสืบราคาในท้องตลาด (  ) ราคามาตรฐานหรือเกณฑ์ราคาพื้นฐาน ในวงเงินงบประมาณ', 1, y);

    const text101 = `${Const2}`;
    const dot2 = '..........................................';
    const text202 = `${Const3}`
    const dot3 = `(                                                                                    )`;
    const dot4 = '...............................................................................................................'

    y += 0.6;
    doc.text(dot2, 1, y + 0.05);
    doc.text(text101, 1 + doc.getTextWidth(dot2) / 2 - doc.getTextWidth(text101) / 2, y);
    doc.text('บาท', 1 + doc.getTextWidth(dot2) + 0.2, y);
    doc.text(dot3, 1 + doc.getTextWidth(dot2) + 0.2 + doc.getTextWidth('บาท') + 0.2, y);
    doc.text(dot4, 1 + doc.getTextWidth(dot2) + 0.2 + doc.getTextWidth('บาท') + 0.35, y + 0.05);
    doc.text(text202, 1 + doc.getTextWidth(dot2) + doc.getTextWidth(text101) + doc.getTextWidth('บาท') + 0.2 + doc.getTextWidth(dot4) / 2 - doc.getTextWidth(text202) / 2, y);
    doc.text('มีรายละเอียดพัสดุที่ต้องการดังต่อไปนี้', pageWidth - 1.4, y, { align: 'right' });

}

function condition(doc, y) {
    doc.setFontSize(11);
    doc.setFont('THSarabunNew', 'bold');
    doc.text('*เงื่อนไขและข้อกำหนด*', 1, y);
    doc.setFont('THSarabunNew', 'normal');
    y += 0.5;
    doc.text('1) งวดงานและการจ่ายเงิน  โดยแบ่งเป็น 1 งวดงาน และ 1 งวดเงิน ซึ่ง', 1, y);
    y += 0.5;
    doc.text('คณะวิศวกรรมศาสตร์ มหาวิทยาลัยมหาสารคาม จะชำระเงินตามใบสั่งซื้อสั่งจ้าง', 1, y);
    y += 0.5;
    doc.text('หรือข้อตกลงไว้เป็นหนังสือ เมื่อผู้ขายหรือผู้รับจ้างได้ส่งมอบพัสดุครบถ้วนตามใบสั่ง', 1, y);
    y += 0.5;
    doc.text('ซื้อสั่งจ้างหรือข้อตกลงไว้เป็นหนังสือ ผู้ตรวจรับพัสดุหรือคณะกรรมการตรวจรับ', 1, y);
    y += 0.5;
    doc.text('พัสดุได้ทำการตรวจรับพัสดุ ถูกต้อง ครบถ้วนแล้ว', 1, y);
    y += 0.5;
    doc.text('2) อัตราค่าปรับ การกำหนดอัตราค่าปรับในสัญญาซื้อหรือจ้าง/ใบสั่งซื้อสั่งจ้าง หรือ', 1, y);
    y += 0.5;
    doc.text('ข้อตกลงไว้เป็นหนังสือ ค่าปรับรายวันเป็นจำนวนเงินตายตัวให้คิดในอัตราร้อยละ', 1, y);
    y += 0.5;
    doc.text('(0.20) ของราคาพัสดุที่ยังไม่ได้รับมอบ หรือ (0.10) ของราคางานจ้างแต่ต้องไม่ต่ำ', 1, y);
    y += 0.5;
    doc.text('กว่าวันละ 100 บาท', 1, y);

}

// Function to add background image behind the entire table
function addTableBackgroundImage(doc, pageWidth, startY, totalItems) {
    try {
        // Get the logo image from the HTML page
        const img = document.getElementById("msuimg");
        if (img && img.complete) {
            // Calculate exact table dimensions
            const tableHeight = 16;
            const tableWidth = 18.7; // Fixed table width
            const tableX = 1; // Fixed table X position

            // Create canvas to convert image to base64
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imgData = canvas.toDataURL("image/JPEG");

            // Calculate perfect center positioning
            const imageSize = 10; // 6x6 cm image
            const centerX = tableX + (tableWidth / 2) - (imageSize / 2); // Perfect horizontal center
            const centerY = startY + (tableHeight / 2) - (imageSize / 2); // Perfect vertical center

            // Add watermark image with good visibility
            doc.setGState(new doc.GState({ opacity: 0.2 })); // Increased to 40% opacity for better visibility
            doc.addImage(imgData, 'JPEG', centerX, centerY, imageSize, imageSize);
            doc.setGState(new doc.GState({ opacity: 1.0 }));
        }
    } catch (error) {
        console.log('Could not add background image:', error);
    }
}

// Function to add background image for individual rows - simplified
function addRowBackgroundImage(doc, x, y, width, height, rowIndex) {
    // Removed individual row background images to keep only the center image
    // This function is kept for compatibility but does nothing
}

// Function to add image in the middle of table rows - simplified
function addRowMiddleImage(doc, x, y, width, height, supply, rowIndex) {
    // Removed individual row middle images to keep only the center table image
    // This function is kept for compatibility but does nothing
}