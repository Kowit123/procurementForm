
// Function to wrap text within a specified width
function wrapText(doc, text, x, y, maxWidth, lineHeight = 0.7) {
    // Handle empty or null text
    if (!text || text.trim() === '') {
        return y;
    }

    const words = text.toString().split(' ');
    let line = '';
    let currentY = y;
    let isFirstLine = true;
    const firstLineIndent = 1; // Indent for first line

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = line + word + ' ';
        const currentX = isFirstLine ? x + firstLineIndent : x;
        const currentMaxWidth = isFirstLine ? maxWidth - firstLineIndent : maxWidth;
        const testWidth = doc.getTextWidth(testLine);

        if (testWidth > currentMaxWidth && line !== '') {
            // Print current line and start new line
            doc.text(line.trim(), currentX, currentY);
            line = word + ' ';
            currentY += lineHeight;
            isFirstLine = false;
        } else if (doc.getTextWidth(word) > currentMaxWidth) {
            // Handle words that are too long for the line
            if (line.trim() !== '') {
                doc.text(line.trim(), currentX, currentY);
                currentY += lineHeight;
                isFirstLine = false;
                line = '';
            }
            // Break the long word into smaller parts
            let remainingWord = word;
            while (remainingWord.length > 0) {
                const wordCurrentX = isFirstLine ? x + firstLineIndent : x;
                const wordCurrentMaxWidth = isFirstLine ? maxWidth - firstLineIndent : maxWidth;
                let partialWord = '';
                for (let j = 0; j < remainingWord.length; j++) {
                    const testPart = partialWord + remainingWord[j];
                    if (doc.getTextWidth(testPart) > wordCurrentMaxWidth && partialWord !== '') {
                        break;
                    }
                    partialWord = testPart;
                }
                if (partialWord === '') {
                    partialWord = remainingWord[0]; // At least one character
                }
                doc.text(partialWord, wordCurrentX, currentY);
                remainingWord = remainingWord.substring(partialWord.length);
                if (remainingWord.length > 0) {
                    currentY += lineHeight;
                    isFirstLine = false;
                }
            }
            if (i < words.length - 1) {
                currentY += lineHeight;
                isFirstLine = false;
            }
        } else {
            line = testLine;
        }
    }

    // Print the last line if it exists
    if (line.trim() !== '') {
        const finalX = isFirstLine ? x + firstLineIndent : x;
        doc.text(line.trim(), finalX, currentY);
        currentY += lineHeight;
    }

    return currentY; // Return the final Y position
}

function page4(doc, pageWidth, formData) {
    doc.setFont("THSarabunNew", "bold");
    doc.setFontSize(14);
    doc.text('แบบ บก.๐๖', pageWidth - 2, 1, { align: 'right' });
    let y = 2;
    doc.setFontSize(18);
    doc.text('ตารางแสดงวงเงินประมาณที่ได้รับจัดสรรและลายระเอียดค่าใช้จ่าย', pageWidth / 2, y, { align: 'center' });
    y += 0.7;
    doc.text('การจัดซื้อจัดจ้างที่มิใช่งานก่อสร้าง', pageWidth / 2, y, { align: 'center' });
    y = 4.6;
    doc.setFontSize(16);
    doc.text('๑. ชื่อโครงการ', 2.1, y);
    doc.setFont('THSarabunNew', 'normal');
    y += 0.7;
    doc.text(`${formData.requestingFor || ''}`, 3.1, y);
    doc.text('.....................................................................................................................................................', 2.1, y + 0.05);
    doc.text('โดยวิธีเฉพาะเจาะจง', 2.2 + doc.getTextWidth('....................................................................................................................................................'), y);
    y += 0.7;
    doc.setFont('THSarabunNew', 'bold');
    doc.text('๒. หน่วยงานเจ้าของโครงการ', 2.1, y);
    doc.setFont('THSarabunNew', 'normal');
    y += 0.7;
    doc.text('คณะวิศวกรรมศาสตร์ มหาวิทยาลัยมหาสารคาม', 2.1, y);
    y += 0.7;
    doc.setFont('THSarabunNew', 'bold');
    doc.text('๓. วงเงินงบประมาณที่ได้รับจัดสรร', 2.1, y);
    doc.setFont('THSarabunNew', 'normal');
    y += 0.7;
    doc.text('.........................................................', 2.1, y + 0.05);
    doc.text(`${formData.grandTotal || '0.00'}`, 3.1, y);
    doc.text('บาท (ใช่เกณฑ์ราคาาเป็นสำคัญ)', 2.2 + doc.getTextWidth('.........................................................'), y);
    y += 0.7;
    doc.setFont('THSarabunNew', 'bold');
    doc.text(`๔. วันที่กำหนดราคากลาง (ราคาอ้างอิง)`, 2.1, y);
    doc.setFont('THSarabunNew', 'normal');
    doc.text(`ณ วันที่ ${formData.referenceDate}`, 2.6 + doc.getTextWidth(`๔. วันที่กำหนดราคากลาง (ราคาอ้างอิง)`), y);
    y += 0.7;


    let marginTop = 3.5;
    let marginLeft = 2;
    let marginRight = 2;
    let marginBottom = 5;

    let boxX = marginLeft;
    let boxY = marginTop;
    let boxWidth = pageWidth - marginLeft - marginRight;
    let boxHeight = 17; // Adjust height as needed
    doc.setLineWidth(0.03);
    doc.rect(boxX, boxY, boxWidth, boxHeight);

    doc.setFontSize(14);
    doc.text('- แหล่งที่มาของราคา : สืบราคาจากท้องตลาด และตามหนังสือเวียนกรมบัญชีกลาง ที่ กค 0433.2/54936 ลว 20 ธ.ค. 2562', 2.6, y)
    doc.setFontSize(16);
    let dotY = y;
    for (let i = 0; i < 4; i++) {
        doc.text('.'.repeat(Math.floor(boxWidth * 10.75)), boxX + 0.1, dotY + 0.05);
        dotY += 0.75; // Line spacing
    }

    

    // Get the text content safely
    const detailText = document.getElementById("4-detail") ? document.getElementById("4-detail").value : '';
    wrapText(doc, detailText, boxX + 0.1, y, boxWidth - 0.3, 0.7);

    y = dotY;
    doc.setFont('THSarabunNew', 'bold');
    doc.text(`๕. แหล่งที่มาของราคากลาง (ราคาอ้างอิง)`, 2.1, y);
    doc.setFont('THSarabunNew', 'normal');
    // Display price sources
    if (formData.priceSources && formData.priceSources.length > 0) {
        y += 0.7;
        formData.priceSources.forEach(source => {
            doc.text(`${source.number})`, 2.5, y);
            doc.text(source.text, 3.4, y);
            y += 0.7;
        });
    }
    y += 0.7;
    doc.setFont('THSarabunNew', 'bold');
    doc.text(`๖. รายชื่อเจ้าหน้าที่ผู้กำหนดราคากลาง (ราคาอ้างอิง) ทุกคน`, 2.1, y);
    doc.setFont('THSarabunNew', 'normal');
    y += 0.7;
    p4(doc, pageWidth, formData.responsiblePerson, formData.responsibleCommitteeMember1, formData.responsibleCommitteeMember2, y);

}

function p4 (doc, pageWidth, Const1, Const2, Const3, y = 10) {
    // tetx 
    const text1 = "๖.๑)";
    const text101 = `${Const1}`;
    const text2 = "ตำแหน่ง ผู้รับผิดชอบ";
    const dots = ".............................................................................................";

    // get text width
    const text1Width = doc.getTextWidth(text1);
    const text2Width = doc.getTextWidth(text2);
    const text101Width = doc.getTextWidth(text101);
    const dotsWidth = doc.getTextWidth(dots);

    // Block 1: x = 3.5
    const x1 = 2.5;
    const x1End = x1 + text1Width; // end of text1

    // Block 3: align right at x = pageWidth - 2
    const x2Start = 3.2 + doc.getTextWidth(dots);

    // วางข้อความจุดไข่ปลาให้อยู่กลางระหว่าง x1End และ x3Start
    const dotsCenterX = (x1End + x2Start) / 2;
    const xDots = 0.02 + dotsCenterX - (dotsWidth / 2);

    // วาง text2 (responsible person) ให้อยู่ตรงกลางของจุดไข่ปลา
    const x101 = xDots + 0.25;

    // วาดข้อความ
    doc.text(text1, x1, y); 
    doc.text(text101, x101, y);                             
    doc.text(dots, xDots, y + 0.05);                                            
    doc.text(text2, x2Start, y); 
    
    const text21 = "๖.๓)";
    const text31 = "๖.๓)";
    const text2101 = `${Const2}`;
    const text3101 = `${Const3}`;
    const text22 = "ตำแหน่ง กรรมการ";

    const x21 = 2.5;
    const x22 = 2.65 + dotsWidth + 0.55;
    const x2101 = xDots + 0.25;

    y += 0.6;
    doc.text(text21, x21, y); 
    doc.text(text2101, x2101, y);                             
    doc.text(dots, xDots, y + 0.05);                                            
    doc.text(text22, x22, y);
    
    y += 0.6;
    doc.text(text31, x21, y); 
    doc.text(text3101, x2101, y);                             
    doc.text(dots, xDots, y + 0.05);                                            
    doc.text(text22, x22, y);
    
    return y + 0.6;  // Return updated y position 
}


