function first_line(doc, pageWidth, y = 6.4) {
    // tetx 
    const text1 = "ด้วยข้าพเจ้า";
    const text2 = `${document.getElementById("responsible_person").value}`
    const text3 = `จะดำเนินการขอให้จัดหาและขออนุมัติ ${document.querySelector('input[name="objective"]:checked')?.value || ''}`;
    const dots = ".....................................................................................................";

    // get text width
    const text1Width = doc.getTextWidth(text1);
    const text2Width = doc.getTextWidth(text2);
    const text3Width = doc.getTextWidth(text3);
    const dotsWidth = doc.getTextWidth(dots);

    // Block 1: x = 3.5
    const x1 = 3.5;
    const x1End = x1 + text1Width; // end of text1

    // Block 3: align right at x = pageWidth - 2
    const x3 = pageWidth - 2;
    const x3Start = x3 - text3Width;

    // วางข้อความจุดไข่ปลาให้อยู่กลางระหว่าง x1End และ x3Start
    const dotsCenterX = (x1End + x3Start) / 2;
    const xDots = dotsCenterX - (dotsWidth / 2);

    // วาง text2 (responsible person) ให้อยู่ตรงกลางของจุดไข่ปลา
    const x2 = xDots + (dotsWidth / 2) - (text2Width / 2);

    // วาดข้อความ
    doc.text(text1, x1, y);                              // Block 1 (ซ้าย)
    doc.text(dots, xDots, y + 0.05);                            // จุดไข่ปลา
    doc.text(text2, x2, y);                              // Block 2 (ตรงกลางจุดไข่ปลา)
    doc.text(text3, x3, y, { align: 'right' });          // Block 3 (ขวา)
    
    y += 0.6;  // Use y += instead of return y + 0.6
    return y;
}
