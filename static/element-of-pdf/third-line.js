function third_line(doc, pageWidth, Const1, Const2) {
    // tetx 
    const text1   = `(                                                      )`;
    const dot1    = '.......................................................................';
    const text101 = `${Const1}`
    const text2   = `เพื่อใช้`
    const dot2    = "...........................................................................................";
    const text3   = `${Const2}`;
    const text4   = "จึงใคร่เสนอดังต่อไปนี้";

    // get text width
    const text1Width = doc.getTextWidth(text1);
    const text101Width = doc.getTextWidth(text101);
    const dot1Width  = doc.getTextWidth(dot1);
    const text2Width = doc.getTextWidth(text2);
    const text3Width = doc.getTextWidth(text3);
    const dot2Width  = doc.getTextWidth(dot2)
    const text4Width = doc.getTextWidth(text4); 

    const x1 = 2;
    const x1End = x1 + text1Width;

    const x2start = 8.1;
    const x2End = x2start + text2Width;

    const dot1CenterX = (1.85 + x2start) / 2;
    const xDot1 = dot1CenterX - (dot1Width / 2);
    const x101 = xDot1 + (dot1Width / 2) - (text101Width / 2);

    const x4start = pageWidth - text4Width - 2;

    const dot2CenterX = (x2End + x4start) / 2;
    const xDot2 = dot2CenterX - (dot2Width / 2);
    const x3Start = xDot2 + (dot2Width / 2) - (text3Width / 2);

    // วาดข้อความ
    doc.text(text1, x1, 7.6); 
    doc.text(text101, x101, 7.6);                            // Block 1 (ซ้าย)
    doc.text(dot1, xDot1, 7.65);                            // จุดไข่ปลา
    doc.text(text2, x2start, 7.6);                              // Block 2 (ตรงกลางจุดไข่ปลา)
    doc.text(text3, x3Start, 7.6);
    doc.text(dot2, xDot2, 7.65);
    doc.text(text4, pageWidth - 2, 7.6, {align:'right'});
              // Block 3 (ขวา)
}
