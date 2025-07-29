function signature_box1(doc, pageWidth, const1, const2, y = 17.8) {
    const text0 = `(1)`
    const text1 = `ลงชื่อ ..................................................... ${const1}`;
    const text2 = `(                                                       )`;
    const text3 = ` .........................................................................`;
    const text4 = `${const2}`

    const start1 = pageWidth - 2;
    const x1     = pageWidth - doc.getTextWidth(text1) - 2;
    const x2     = x1;
    const x4     = (x1 + doc.getTextWidth('.......................................................................')/2) - (doc.getTextWidth(text4)/2);
    const x5     = (x1 + doc.getTextWidth('.......................................................................')/2) - (doc.getTextWidth('........../........../..........')/2);

    doc.text(text0, x1 - 0.75, y);
    doc.text(text1, start1, y, {align: 'right'});
    y += 0.6;
    doc.text(text2, x2, y);
    doc.text(text3, x2, y + 0.05);
    doc.text(text4, x4, y);
    y += 0.6;
    doc.text('........../........../..........', x5, y);
    
    return y += 0.6;  // Return updated y position
}

function signature_box2(doc, pageWidth, const1, const2, y = 26.2) {
    const text0 = `(2)`
    const text1 = `ลงชื่อ ..................................................... เจ้าหน้าที่`;
    const text2 = `(                                                       ) `;
    const text3 = ` ........................................................................ `;

    const start1 = pageWidth - 2;
    const x1     = pageWidth - doc.getTextWidth(text1) - 2;
    const x2     = x1;
    const x4     = (x1 + doc.getTextWidth('.......................................................................')/2) - (doc.getTextWidth('........../........../..........')/2);

    doc.text(text0, x1 - 0.75, y);
    doc.text(text1, start1, y, {align: 'right'});
    y += 0.6;
    doc.text(text2, x2, y);
    doc.text(text3, x2, y + 0.05);
    y += 0.6;
    doc.text('........../........../..........',x4, y);
    y += 0.6;
    doc.text(`ความเห็น       /2...`, pageWidth - 2, y, {align: 'right'} );
    createArrow(doc, pageWidth, y);
    
    return y + 0.6;  // Return updated y position
}

function createArrow(doc, pageWidth, y = 26.2) {
    doc.setLineWidth(0.1);
    doc.line(pageWidth - 2.9 , y - 0.3, pageWidth - 2.9 , y); // x1, y1, x2, y2
    // Draw the arrowhead (triangle)
    doc.triangle(
    pageWidth - 2.9, y,  // Tip of the arrow
    pageWidth - 2.9 - 0.012, y - 0.01,   // Bottom-left point of the arrowhead
    pageWidth - 2.9 + 0.012, y - 0.01   // Bottom-right point of the arrowhead
    );
}

function signature_box3(doc, pageWidth, y) {
    const text0 = `(3)`
    const text1 = `ลงชื่อ .....................................................เจ้าหน้าที่การเงินและบัญชี`;
    const text2 = `(                                                       ) `;
    const text3 = ` .........................................................................`;

    const start1 = 5;
    const x1     = 5;
    const x2     = x1;
    const x4     = (x1 + doc.getTextWidth('.......................................................................')/2) - (doc.getTextWidth('........../........../..........')/2);

    y+=0.6;
    doc.text(text0, x1 - 0.5, y);
    doc.text(text1, start1, y);
    y += 0.6;
    doc.text(text2, x2, y);
    doc.text(text3, x2, y + 0.05);
    y += 0.6;
    doc.text('........../........../..........',x4, y);
    y += 0.6;
    return y;
}

function signature_box4(doc, pageWidth, y) {
    const text01 = "ความเห็นของหัวหน้ากลุ่มงาน"
    const text02 = "(  ) ได้ดำเนินการตรวจสอบ ความถูกต้องแล้วและเห็นควรเสนอเพื่อขออนุมัติ"
    const text03 = "(  ) อื่นๆ ............................."
    const text0 = `(4)`
    const text1 = `ลงชื่อ .....................................................หัวหน้ากลุ่มงานนโยบาย แผนและคลัง`;
    const text2 = `(                                                       ) `;
    const text3 = ` .........................................................................`;

    const start1 = 5;
    const x1     = 5;
    const x2     = x1;
    const x4     = (x1 + doc.getTextWidth('.......................................................................')/2) - (doc.getTextWidth('........../........../..........')/2);

    y+=0.6;
    doc.text(text01, 3.5, y);
    y+=0.6;
    doc.text(text02, 4.5, y);
    y+=0.6;
    doc.text(text03, 4.5, y);
    y+=0.8;
    doc.text(text0, x1 - 0.5, y);
    doc.text(text1, start1, y);
    y += 0.6;
    doc.text(text2, x2, y);
    doc.text(text3, x2, y + 0.05);
    y += 0.6;
    doc.text('........../........../..........',x4, y);
    y += 0.6;
    return y;
}

function signature_box5(doc, pageWidth, y) {
    const text01 = "ความเห็นของหัวหน้าเจ้าหน้าที่"
    const text02 = "(  ) ได้ตรวจสอบความถูกต้องแล้ว เห็นควรเสนอเพื่อขออนุมัติ"
    const text03 = "(  ) อื่นๆ ............................."
    const text0 = `(5)`
    const text1 = `ลงชื่อ .....................................................หัวหน้าเจ้าหน้าที่`;
    const text2 = `(                                                       ) `;
    const text3 = ` .........................................................................`;

    const start1 = 5;
    const x1     = 5;
    const x2     = x1;
    const x4     = (x1 + doc.getTextWidth('.......................................................................')/2) - (doc.getTextWidth('........../........../..........')/2);

    y+=0.6;
    doc.text(text01, 3.5, y);
    y+=0.6;
    doc.text(text02, 4.5, y);
    y+=0.6;
    doc.text(text03, 4.5, y);
    y+=0.8;
    doc.text(text0, x1 - 0.5, y);
    doc.text(text1, start1, y);
    y += 0.6;
    doc.text(text2, x2, y);
    doc.text(text3, x2, y + 0.05);
    y += 0.6;
    doc.text('........../........../..........',x4, y);
    y += 0.6;
    return y;
}

function signature_box6(doc, pageWidth, y) {
    const text01 = "ความเห็นของ .................................................................. /ผู้ที่ได้รับมอบหมาย"
    const text02 = "(  ) ได้ตรวจสอบความถูกต้องแล้ว เห็นควรอนุมัติ "
    const text03 = "(  ) อื่นๆ ............................."
    const text0 = `(6)`
    const text1 = `ลงชื่อ ...............................................................`;
    const text2 = `(                                                       ) `;
    const text3 = ` .........................................................................`;

    const start1 = 5;
    const x1     = 5;
    const x2     = x1;
    const x4     = (x1 + doc.getTextWidth('.......................................................................')/2) - (doc.getTextWidth('........../........../..........')/2);

    y+=0.6;
    doc.text(text01, 3.5, y);
    y+=0.6;
    doc.text(text02, 4.5, y);
    y+=0.6;
    doc.text(text03, 4.5, y);
    y+=0.8;
    doc.text(text0, x1 - 0.5, y);
    doc.text(text1, start1, y);
    y += 0.6;
    doc.text(text2, x2, y);
    doc.text(text3, x2, y + 0.05);
    y += 0.6;
    doc.text('........../........../..........',x4, y);
    y += 0.6;
    return y;
}


function signature_box7(doc, pageWidth, y) {
    const text0 = `(7)`
    const text1 = `ลงชื่อ ...............................................................`;
    const text2 = `(                                                       ) `;
    const text3 = ` .........................................................................`;

    const start1 = 5;
    const x1     = 5;
    const x2     = x1;
    const x4     = (x1 + doc.getTextWidth('.......................................................................')/2) - (doc.getTextWidth('........../........../..........')/2);

    y+=0.6;
    doc.setFont('THSarabunNew', 'bold');
    doc.text("คำสั่ง", 3.5, y);
    doc.setFont('THSarabunNew', 'normal');
    doc.text("คณบดีคณะวิศวกรรมศาสตร์/ผู้ที่ได้รับมอบหมาย", 4.3, y);
    y+=0.6;
    doc.text('เพื่อโปรด', 4.5, y);
    doc.text("(  ) ทราบ/ตามเสนอ", 6, y);
    y+=0.6;
    doc.text("(  ) เห็นควร", 6, y);
    y+=0.6;
    doc.text("(  ) อนุมัติ", 6, y);
    y+=0.6;
    doc.text("(  ) ไม่อนุมัติ", 6, y);
    y+=0.8;
    doc.text(text0, x1 - 0.5, y);
    doc.text(text1, start1, y);
    y += 0.6;
    doc.text(text2, x2, y);
    doc.text(text3, x2, y + 0.05);
    y += 0.6;
    doc.text('........../........../..........',x4, y);
    y += 0.6;
    return y;
}
