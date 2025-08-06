function third_line(doc, pageWidth, Const1, Const2, y = 7.6) {
    // tetx 
    const text1 = `(                                                                             )`;
    const dot1 = '.......................................................................................................';
    const text101 = `${Const1}`

    const text2 = `เพื่อใช้`
    const dot2 = "........................................................................................................................................................................"; 
    const text3 = `${Const2}`;
    const text4 = "จึงใคร่เสนอดังต่อไปนี้";

    // get text width
    const text101Width = doc.getTextWidth(text101);
    const dot1Width = doc.getTextWidth(dot1);
    const text2Width = doc.getTextWidth(text2);

    const x1 = 2;

    const x2start = 8.1;

    const dot1CenterX = (1.85 + x2start) / 2;
    const xDot1 = dot1CenterX - (dot1Width / 2);
    const x101 = 2.1 + (dot1Width / 2) - (text101Width / 2);


    const xDot2 = 2 + text2Width;
    const x3Start = xDot2 + 0.2;

    // วาดข้อความ
    // First line
    doc.text(text1, x1, y);
    doc.text(text101, x101, y);                            // Block 1 (ซ้าย)
    doc.text(dot1, 2.1, y + 0.05);                            // จุดไข่ปลา

    y += 0.6;  // Move to next line

    // Second line
    doc.text(text2, 2, y);                              // Block 2 (ตรงกลางจุดไข่ปลา)
    doc.text(text3, x3Start, y);
    doc.text(dot2, xDot2, y + 0.05);

    doc.text(text4, pageWidth-2, y, {align:'right'});

    y += 0.6;  // Use y += instead of return y + 0.6
    return y;
}
