function signature_box1(doc, pageWidth, const1, const2, y = 17.8) {
    const text0 = `(1)`
    const text1 = `ลงชื่อ ..................................................... ${const1}`;
    const text2 = `(                                                       ) `;
    const text3 = `  .......................................................................   ......../......../........`;
    const text4 = `${const2}`

    const start1 = pageWidth - 2;
    const x1     = pageWidth - doc.getTextWidth(text1) - 2;
    const x2     = x1;
    const x4     = (x1 + doc.getTextWidth('.......................................................................')/2) - (doc.getTextWidth(text4)/2);

    doc.text(text0, x1 - 0.75, y);
    doc.text(text1, start1, y, {align: 'right'});
    y += 0.6;
    doc.text(text2, x2, y);
    doc.text(text3, x2, y + 0.05);
    doc.text(text4, x4, y);
    
    return y + 0.6;  // Return updated y position
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


