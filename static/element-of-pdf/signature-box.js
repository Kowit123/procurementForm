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