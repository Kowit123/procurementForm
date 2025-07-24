function second_line(doc, pageWidth, Const1, Const2) {
    // tetx 
    const text1 = "ขอซื้อวัสดุการศึกษา (ตามกำหนดรายละเอียดแนบท้าย) จำนวน";
    const text2 = `${Const1}`
    const text3 = " รายการ เป็นจำนวนเงิน";
    const text4 = `${Const2}`;
    const text5 = "บาท";
    const dot1 = "......................";
    const dot2 = "............................................";

    // get text width
    const text1Width = doc.getTextWidth(text1);
    const text2Width = doc.getTextWidth(text2);
    const text3Width = doc.getTextWidth(text3);
    const text4Width = doc.getTextWidth(text4);
    const text5Width = doc.getTextWidth(text5);
    const dot1Width  = doc.getTextWidth(dot1);
    const dot2Width  = doc.getTextWidth(dot2) 

    // Block 1: x = 3.5
    const x1 = 2;
    const x1End = x1 + text1Width; // end of text1

    // Block 3
    const x3Start = x1End + text2Width + 1.5;
    const x3End = x3Start + text3Width;

    // block 2
    const dot1CenterX = 0.07 + (x1End + x3Start) / 2;
    const xDot1 = dot1CenterX - (dot1Width / 2);
    // วาง text2 (responsible person) ให้อยู่ตรงกลางของจุดไข่ปลา
    const x2 = xDot1 + (dot1Width / 2) - (text2Width / 2);

    // block 5
    const x5Start = (pageWidth - text5Width) - 2;

    // block 4
    const dot2CenterX = 0.03 + (x3End + x5Start) / 2;
    const xDot2 = dot2CenterX - (dot2Width / 2);
    const x4 = xDot2 + (dot2Width / 2) - (text4Width / 2);

    // วาดข้อความ
    doc.text(text1, x1, 7);                              // Block 1 (ซ้าย)
    doc.text(dot1, xDot1, 7.05);                            // จุดไข่ปลา
    doc.text(text2, x2, 7);                              // Block 2 (ตรงกลางจุดไข่ปลา)
    doc.text(text3, x3Start, 7);
    doc.text(text4, x4, 7);
    doc.text(dot2, xDot2, 7.05);
    doc.text(text5, pageWidth - 2, 7, {align:'right'});
              // Block 3 (ขวา)
}
