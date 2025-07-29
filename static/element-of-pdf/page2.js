function page2_1(doc, pageWidth, y = 2, Const) {
    const text1 = 'ได้ตรวจสอบแล้ว โดยใช้งบประมาณดำเนินการจัดหาดังกล่าว ในวงเงิน';
    const text101 = `${Const}`;
    const dot = '..........................................................................';
    const text2 = 'บาท';

    const text1Width = doc.getTextWidth(text1);
    const text101Width = doc.getTextWidth(text101);
    const text2Width = doc.getTextWidth(text2);
    const dotWidth = doc.getTextWidth(dot);

    const x1 = 3.5;
    const x1End = x1 + text1Width; // end of text1

    const x2 = pageWidth - 2;
    const x2Start = x2 - text2Width;

    const dotCenterX = (x1End + x2Start) / 2;
    const xDots = dotCenterX - (dotWidth / 2);

    const x101 = xDots + (dotWidth / 2) - (text101Width / 2);

    y += 0.6;

    doc.text(text1, x1, y);                            
    doc.text(dot, xDots, y + 0.05);                          
    doc.text(text101, x101, y);                              
    doc.text(text2, x2, y, { align: 'right' }); 
    
    y+=0.6;
    return y;
}

function page2_2(doc, pageWidth, y, Const1) {
    const text1 = `(                                                      )`;
    const dot1 = '.......................................................................';
    const text101 = `${Const1}`

    const text101Width = doc.getTextWidth(text101);
    const dot1Width = doc.getTextWidth(dot1);

    const x2start = 8.1;

    const dot1CenterX = (1.85 + x2start) / 2;
    const xDot1 = dot1CenterX - (dot1Width / 2);
    const x101 = xDot1 + (dot1Width / 2) - (text101Width / 2);

    doc.text(text1, 2, y);
    doc.text(text101, x101, y);                            
    doc.text(dot1, xDot1, y + 0.05);
}