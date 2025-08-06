function page3(doc, pageWidth, Const, Const1, Const2, Const3, Const4, Const5, y) {
    const img = document.getElementById("img");
    if (img) {
        // Make sure the image is loaded
        if (img.complete) {
            // setup img create canvas for convert img to base64
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imgData = canvas.toDataURL("image/jpeg");
            doc.addImage(imgData, 'JPEG', pageWidth/2 - 1.4, 1.5, 2.8, 3); // (imageData, type, x, y, width, height)
        } else {
            // If image is not loaded yet, wait for it
            img.onload = function () {
                const canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth || img.width;
                canvas.height = img.naturalHeight || img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                const imgData = canvas.toDataURL("image/jpeg");
                doc.addImage(imgData, 'JPEG', pageWidth/2 - 1.4, 1.5, 2.8, 3);

                // Continue with the rest of the PDF generation
                continueWithPdfGeneration();
            };
            return; // Exit function to wait for image load
        }
    }
    doc.setFont("THSarabunNew", "normal");
    doc.setFontSize(12);
    doc.text('EN-PS-01', pageWidth - 2, 0.5, { align: 'right' });
    doc.setFont("THSarabunNew", "bold");
    doc.setFontSize(14);
    doc.text('คำสั่ง คณะวิศวกรรมศาสตร์ มหาวิทยาลัยมหาสารคาม', pageWidth /2, y, { align: 'center' });
    y += 0.6;
    doc.text('ที่ พ         /..............', pageWidth /2, y, { align: 'center' });
    y += 0.6;
    doc.text('เรื่องแต่งตั้งผู้รับผิดชอบหรือคณะกรรมการกำหนดร่างรายละเอียดคุณลักษณะเฉพาะของพัสดุหรือร่างขอบเขตของงานจ้าง', pageWidth /2, y, { align: 'center' });
    y += 0.6;
    doc.text(`สำหรับ${document.querySelector('input[name="objective"]:checked')?.value || ''} ${document.getElementById("objective").value} ปีงบประมาณ 25...... จำนวน ${document.getElementById('totalItems').textContent} รายการ`, pageWidth /2, y, { align: 'center' });
    y += 0.6;
    doc.text('ของคณะวิศวกรรมศาสตร์ มหาวิทยาลัยมหาสารคาม', pageWidth /2, y, { align: 'center' });
    y += 1;
    doc.setFont("THSarabunNew", "normal");
    doc.text('ด้วยคณะวิศวกรรมศาสตร์ มหาวิทยาลัยมหาสารคาม มีความประสงค์จะดำเนินการจัดหาและขออนุมัติจัดซื้อ/ขอจ้าง/การเช่า', 3.5, y);
    y += 0.6;
    const text1 = "................................. (ตามกำหนดรายละเอียดแนบท้าย) จำนวน";
    const text101 = `${Const}`
    const text2 = `${Const1}`;
    const text3 = "รายการ";
    const dot1 = "......................";
    doc.text(text1, 2, y);
    doc.text(Const, 2, y - 0.04);
    doc.text(text2, doc.getTextWidth(text1) + 2 + doc.getTextWidth(dot1)/2 - doc.getTextWidth(text2)/2, y);
    doc.text(dot1, doc.getTextWidth(text1) + 2, y + 0.05);
    doc.text(text3, doc.getTextWidth(text1) + doc.getTextWidth(dot1)+ 2, y);
    y += 0.6;
    const text4 = `เพื่อใช้`
    const dot2 = ".........................................................................................................................................................................................................."; 
    const text5 = `${Const2}`;
    doc.text(text4, 2, y);
    doc.text(dot2, doc.getTextWidth(text4) + 2, y + 0.05);
    doc.text(text5,2 + doc.getTextWidth(text4) + 0.2, y);
    y += 0.6;
    doc.text('ดังนั้นเพื่อ ให้การดำเนินการดังกล่าวเป็นไปด้วยความเรียบร้อย ถูกต้อง เหมาะสม อาศัยอำนาจตามระเบียกระทรวงการคลัง', 3.5, y);
    y += 0.6;
    doc.text('ว่าด้วยการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ.2560 ส่วนที่3 ผู้มีอำนาจและการมอบอำนาจตามข้อ 6(ข้อ7กรณีรับมอบอำนาจ)', 2, y);
    y += 0.6;
    doc.text('และข้อ 21 จึงขอแต่งตั้งผู้รับผิดชอบ และคณะกรรมการจัดทำการกำหนดรายละเอียดคุณลักษณะเฉพาะของพัสดุหรือ ร่างขอบเขตของ', 2, y);
    y += 0.6;
    doc.text('งานจ้าง (งานจ้างที่มิใช่งานก่อสร้าง) ดังรายชื่อต่อไปนี้', 2, y);
    y += 0.6;
    y = seventhTonineth_line(doc, pageWidth, Const3, Const4, Const5, y);
    doc.setFont("THSarabunNew", "bold");
    doc.text('โดยมีหนาที่', 3.5, y);
    doc.setFont("THSarabunNew", "normal");  
    y += 0.6;
    doc.text('1. จัดทำรายละเอียดคุณลักษณะเฉพาะของพัสดุ หรือร่างขอบเขตของงานจ้าง(งานจ้างที่มิใช่งานก่อสร้าง) และกำหนด', 3.5, y);
    y += 0.6;
    doc.text('หลักเกณฑ์การพิจารณาคัดเลือกข้อเสนอ โดยให้มีรายละเอียดเป็นไปตามกฎหมาย ระเบียบ หนังสือสั่งการและแนวทางปฏิบัติที่เกี่ยวข้อง', 2, y);
    y += 0.6;
    doc.text('2. การคำนวณราคากลางของพัสดุตามนัยมาตรา 4 คำนิยามราคากลาง แห่งพระราชบัญญัติการจัดซื้อจัดจ้างและ การบริหาร', 3.5, y);
    y += 0.6;
    doc.text('พัสดุภาครัฐ พ.ศ. 2560 และจัดส่งรายละเอียดดังกล่าวให้เจ้าหน้าที่ ภายใน 30 วัน เพื่อดำเนินการจัดซื้อจัดจ้าง ตามระเบียบฯ ', 2, y);
    y += 0.6;
    doc.text("และหนังสือสั่งการ แนวปฏิบัติที่เกี่ยวข้องต่อไป", 2, y);
    y += 0.8;
    doc.text('ทั้งนี้ ตั้งแต่บัดนี้เป็นต้นไป', 3.5, y);
    y += 0.6;
    doc.text('สั่ง ณ วันที่.....................เดือน..........................................พ.ศ. 25..............', pageWidth/2, y, {align: 'center'});

    doc.text(`การกำหนดรายละเอียด       /4...`, pageWidth - 2, 28.5, { align: 'right' });
    createArrow(doc, pageWidth, 28.5);

}
