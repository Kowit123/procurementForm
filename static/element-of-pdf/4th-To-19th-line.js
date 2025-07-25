function forthTosixth_line(doc, y = 8.2) {
    const text1 = "1.ขอเสนอรายชื่อผู้รับผิดชอบและหรือคณะกรรมการกำหนดรายละเอียดคุณลักษณะเฉพาะของพัสดุหรือกำหนดขอบเขต";
    const text2 = "ของงาน ตามระเบียบกระทรวงการคลังว่าด้วยการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. 2560 ข้อ 21 และตามดังกล่าวข้างต้น";
    const text3 = "กฎกระทรวง หนังสือเวียนสั่งการ และแนวทางปฏิบัติที่เกี่ยวข้องดังต่อไปนี้";

    doc.text(text1, 3.5, y);
    y += 0.6;
    doc.text(text2, 2, y);
    y += 0.6;
    doc.text(text3, 2, y);
    
    return y + 0.6;  // Return updated y position
}

function seventhTonineth_line(doc, pageWidth, Const1, Const2, Const3, y = 10) {
    // tetx 
    const text1 = "1.1)";
    const text101 = `${Const1}`;
    const text2 = "ผู้ขอให้จัดหา หรือผู้รับผิดชอบ/ประธานกรรมการ (ถ้ามี)";
    const dots = "..................................................................................................";

    // get text width
    const text1Width = doc.getTextWidth(text1);
    const text2Width = doc.getTextWidth(text2);
    const text101Width = doc.getTextWidth(text101);
    const dotsWidth = doc.getTextWidth(dots);

    // Block 1: x = 3.5
    const x1 = 3.5;
    const x1End = x1 + text1Width; // end of text1

    // Block 3: align right at x = pageWidth - 2
    const x2 = pageWidth - 2;
    const x2Start = x2 - text2Width;

    // วางข้อความจุดไข่ปลาให้อยู่กลางระหว่าง x1End และ x3Start
    const dotsCenterX = (x1End + x2Start) / 2;
    const xDots = 0.02 + dotsCenterX - (dotsWidth / 2);

    // วาง text2 (responsible person) ให้อยู่ตรงกลางของจุดไข่ปลา
    const x101 = xDots + 0.25;

    // วาดข้อความ
    doc.text(text1, x1, y); 
    doc.text(text101, x101, y);                             
    doc.text(dots, xDots, y + 0.05);                                            
    doc.text(text2, x2, y, { align: 'right' }); 
    
    const text21 = "1.2)";
    const text2101 = `${Const2}`;
    const text3101 = `${Const3}`;
    const text22 = "กรรมการ (ถ้ามี)";

    const x21 = 3.5;
    const x22 = 3.5 + dotsWidth + 0.55;
    const x2101 = xDots + 0.25;

    y += 0.6;
    doc.text(text21, x21, y); 
    doc.text(text2101, x2101, y);                             
    doc.text(dots, xDots, y + 0.05);                                            
    doc.text(text22, x22, y);
    
    y += 0.6;
    doc.text(text21, x21, y); 
    doc.text(text3101, x2101, y);                             
    doc.text(dots, xDots, y + 0.05);                                            
    doc.text(text22, x22, y);
    
    return y + 0.6;  // Return updated y position 
}

function tenthTofourteenth_line(doc, y = 11.8) {
    const text01 = "โดยมีหน้าที่";
    const text1  = "จัดทำรายละเอียดคุณลักษณะเฉพาะหรือจัดทำขอบเขตของงานของพัสดุข้างต้น รวมทั้งกำหนดหลักเกณฑ์";
    const text2  = "การพิจารณาคัดเลือกข้อเสนอ และดำเนินการจัดทำราคากลางตามนัยมาตรา 4 คำนิยามราคากลาง โดยให้มีรายละเอียดเป็นไปตาม";
    const text3  = "กฎหมาย ระเบียบ หนังสือเวียนสั่งการ และแนวทางปฏิบัติที่เกี่ยวข้อง";
    const text4  = "2.ขอเสนอรายชื่อผู้ตรวจรับพัสดุและหรือคณะกรรมการตรวจรับพัสดุ (**กรณีจัดหาในวงเงินไม่เกิน 100,000 บาท จะเสนอ";
    const text5  = "ผู้ตรวจรับพัสดุคนเดียวก็ได้ โดยเสนอบุคคลที่เป็นข้าราชการ, ลูกจ้างประจำ, พนักงานมหาวิทยาลัย**) ดังต่อไปนี้ 	";
    
    doc.setFont("THSarabunNew","bold")
    doc.text(text01, 3.5, y);
    doc.setFont("THSarabunNew","normal")
    doc.text(text1, 5.25, y);
    y += 0.6;
    doc.text(text2, 2, y);
    y += 0.6;
    doc.text(text3, 2, y);
    y += 0.6;
    doc.text(text4, 3.5, y);
    y += 0.6;
    doc.text(text5, 2, y);
    
    return y + 0.6;  // Return updated y position
}

function fiveteenthTonineteenth_line(doc, pageWidth, Const1, Const2, Const3, y = 14.8) {
    // tetx 
    const text1 = "1.1)";
    const text101 = `${Const1}`;
    const text2 = "ผู้ตรวจรับพัสดุหรือประธานกรรมการ (ถ้ามี)";
    const dots = "..................................................................................................";
    const text3 = "โดยมีหน้าที่";
    const text4 = `ตรวจรับพัสดุให้ถูกต้อง ครบถ้วนตามสัญญาหรือหลักฐานที่ตกลงกันไว้เป็นหนังสือ`;

    // get text width
    const text1Width = doc.getTextWidth(text1);
    const dotsWidth = doc.getTextWidth(dots);

    // Block 1: x = 3.5
    const x1 = 3.5;
    const x1End = x1 + text1Width; // end of text1

    // Block 3: align right at x = pageWidth - 2
    const x2 = 3.5 + dotsWidth + 0.55;

    // วางข้อความจุดไข่ปลาให้อยู่กลางระหว่าง x1End และ x3Start
    const dotsCenterX = (x1End + x2) / 2;
    const xDots = 0.02 + dotsCenterX - (dotsWidth / 2);

    // วาง text2 (responsible person) ให้อยู่ตรงกลางของจุดไข่ปลา
    const x101 = xDots + 0.25;

    // วาดข้อความ
    doc.text(text1, x1, y); 
    doc.text(text101, x101, y);                             
    doc.text(dots, xDots, y + 0.05);                                            
    doc.text(text2, x2, y); 
    
    const text21 = "1.2)";
    const text2101 = `${Const2}`;
    const text3101 = `${Const3}`;
    const text22 = "กรรมการ (ถ้ามี)";

    const x21 = 3.5;
    const x22 = 3.5 + dotsWidth + 0.55;
    const x2101 = xDots + 0.25;

    y += 0.6;
    doc.text(text21, x21, y); 
    doc.text(text2101, x2101, y);                             
    doc.text(dots, xDots, y + 0.05);                                            
    doc.text(text22, x22, y);
    
    y += 0.6;
    doc.text(text21, x21, y); 
    doc.text(text3101, x2101, y);                             
    doc.text(dots, xDots, y + 0.05);                                            
    doc.text(text22, x22, y);
    
    y += 0.6;
    doc.setFont("THSarabunNew", "bold");
    doc.text(text3, 3.5, y);
    doc.setFont("THSarabunNew", "normal");
    doc.text(text4, 5.25, y);
    
    y += 0.6;
    doc.text('จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ', 3.5, y);
    
    return y + 0.6;  // Return updated y position
}