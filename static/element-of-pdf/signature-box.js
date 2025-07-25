function signature_box1(doc, pageWidth, const1, const2) {
    const text0 = `(1)`
    const text1 = `ลงชื่อ ..................................................... ${const1}`;
    const text2 = `(                                                       ) `;
    const text3 = `  .......................................................................   ......../......../........`;
    const text4 = `${const2}`

    const start1 = pageWidth - 2;
    const x1     = pageWidth - doc.getTextWidth(text1) - 2;
    const x2     = x1;
    const x4     = (x1 + doc.getTextWidth('.......................................................................')/2) - (doc.getTextWidth(text4)/2);

    doc.text(text0, x1 - 0.75, 17.8);
    doc.text(text1, start1, 17.8, {align: 'right'});
    doc.text(text2, x2, 18.4);
    doc.text(text3, x2, 18.45);
    doc.text(text4, x4, 18.4);
}

function signature_box2(doc, pageWidth, const1, const2) {
    const text0 = `(2)`
    const text1 = `ลงชื่อ ..................................................... เจ้าหน้าที่`;
    const text2 = `(                                                       ) `;
    const text3 = ` ........................................................................ `;
    // const text4 = `${const2}`

    const start1 = pageWidth - 2;
    const x1     = pageWidth - doc.getTextWidth(text1) - 2;
    const x2     = x1;
    const x4     = (x1 + doc.getTextWidth('.......................................................................')/2) - (doc.getTextWidth('........../........../..........')/2);

    doc.text(text0, x1 - 0.75, 26.2);
    doc.text(text1, start1, 26.2, {align: 'right'});
    doc.text(text2, x2, 26.8);
    doc.text(text3, x2, 26.85);
    doc.text('........../........../..........',x4,27.4);
    doc.text(`ความเห็น       /2...`, pageWidth - 2, 28, {align: 'right'} );
    createArrow(doc, pageWidth);
    // doc.text(text4, x4, 18.4);
}

function createArrow(doc, pageWidth) {
    doc.setLineWidth(0.1);
    doc.line(pageWidth - 2.9 , 27.7, pageWidth - 2.9 , 28); // x1, y1, x2, y2
    // Draw the arrowhead (triangle)
    doc.triangle(
    pageWidth - 2.9, 28,  // Tip of the arrow
    pageWidth - 2.9 - 0.012, 27.99,   // Bottom-left point of the arrowhead
    pageWidth - 2.9 + 0.012, 27.99   // Bottom-right point of the arrowhead
    );
}


