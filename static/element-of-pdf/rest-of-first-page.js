function rest_of_first_page (doc, pageWidth, const1, const2) {
    doc.setFont('THSarabunNew', 'bold')
    doc.text('เรียน',2, 19)
    doc.setFont('THSarabunNew', 'normal')
    doc.text('คณบดีคณะวิศวกรรมศาสตร์ ผ่านหัวหน้าเจ้าหน้าที่', 3,19)
    doc.text('จึงเรียนมาเพื่อโปรดพิจารณาและขออนุมัติ', 3.5, 19.6)
    doc.text('1. ขออนุมัติดำเนินการจัดซื้อ/จัดจ้างพัสดุดังกล่าวและขอความเห็นชอบให้จัดทำรายงานขอซื้อขอจ้างในระบบ e-GP', 3.5, 20.2);
    doc.text('2. ขอความเห็นชอบลงนามในคำสั่งแต่งตั้งผู้รับผิดชอบและหรือคณะกรรมการการกำหนดรายละเอียดคุณลักษณะเฉพาะ', 3.5, 20.8);
    doc.text('พัสดุหรือขอบเขตของงาน และขอความเห็นชอบรายชื่อผู้ตรวจรับพัสดุหรือคณะกรรมการตรวจรับพัสดุดังกล่าวข้างต้น', 2, 21.4);
    doc.text('3. ขอความเห็นชอบรายละเอียดคุณลักษณะเฉพาะของพัสดุหรือขอบเขตของงานจ้างรวมทั้งการกำหนดราคากลางของ', 3.5, 22);
    doc.text('พัสดุที่จะซื้อ/จ้างดังกล่าวและขออนุมัติให้ดำเนินการตามหลักเกณฑ์การเปิดเผยราคากลางและการคำนวณราคากลางของกรมบัญชีกลาง', 2, 22.6);
    doc.text('แบบ บก.06', 2, 23.2);
    doc.text('4. ขอความเห็นชอบ เนื่องจากการจัดซื้อจัดจ้างในครั้งนี้ เจ้าหน้าที่ของหน่วยงาน/เจ้าของงบประมาณโครงการ/', 3.5, 23.2);
    haveconst(doc, pageWidth, const1);
    doc.text('(ผู้ขาย/ผู้รับจ้าง) โดยตรงแล้ว ในส่วนของเจ้าหน้าที่พัสดุได้ดำเนินการจัดทำหน้าที่เฉพาะในส่วนการจัดทำเอกสารจัดซื้อจัดจ้างลงในระบบ', 2, 24.4);
    doc.text('e-GP เท่านั้น ฉะนั้น การจัดซื้อจัดจ้างโครงการ/โครงงานวิจัยดังกล่าวนั้น เจ้าหน้าที่พัสดุจึงมิได้ปฏิบัติหน้าที่ตามระเบียบ ข้อ 79 วรรคหนึ่ง', 2, 25);
    doc.text('แต่อย่างใด', 2, 25.6);
    signature_box2(doc, pageWidth);
    
}

function haveconst(doc, pageWidth, const1) {
    // tetx 
    const text1 = "ผู้รับผิดชอบโครงการ/ผู้รับผิดชอบโครงงานวิจัย โดย";
    const text2 = `${const1}`
    const text3 = "ได้ดำเนินการเป็นผู้เจรจาหรือตกลงราคากับ";
    const dots = " ..........................................................";

    // get text width
    const text1Width = doc.getTextWidth(text1);
    const text2Width = doc.getTextWidth(text2);
    const text3Width = doc.getTextWidth(text3);
    const dotsWidth = doc.getTextWidth(dots);

    const x1 = 2;
    const x1End = x1 + text1Width; // end of text1

    // Block 3: align right at x = pageWidth - 2
    const x3 = pageWidth - 2;
    const x3Start = x3 - text3Width;

    // วางข้อความจุดไข่ปลาให้อยู่กลางระหว่าง x1End และ x3Start
    const dotsCenterX = (x1End + x3Start) / 2;
    const xDots = dotsCenterX - (dotsWidth / 2) - 0.025;

    // วาง text2 (responsible person) ให้อยู่ตรงกลางของจุดไข่ปลา
    const x2 = xDots + (dotsWidth / 2) - (text2Width / 2);

    // วาดข้อความ
    doc.text(text1, x1, 23.8);                              // Block 1 (ซ้าย)
    doc.text(dots, xDots, 23.85);                            // จุดไข่ปลา
    doc.text(text2, x2, 23.8);                              // Block 2 (ตรงกลางจุดไข่ปลา)
    doc.text(text3, x3, 23.8, { align: 'right' });          // Block 3 (ขวา)
}
