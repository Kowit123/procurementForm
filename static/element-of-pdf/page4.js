function page4(doc, pageWidth) {
    doc.setFont("THSarabunNew", "bold");
    doc.setFontSize(14);
    doc.text('แบบ บก.๐๖', pageWidth - 2, 1, { align: 'right' });
    let y = 2;
    doc.setFontSize(18);
    doc.text('ตารางแสดงวงเงินประมาณที่ได้รับจัดสรรและลายระเอียดค่าใช้จ่าย', pageWidth/2, y,{align:'center'});
    y += 0.7;
    doc.text('การจัดซื้อจัดจ้างที่มิใช่งานก่อสร้าง', pageWidth/2, y, {align:'center'});

    let marginTop = 3.5;
    let marginLeft = 2;
    let marginRight = 1;
    let marginBottom = 5;
    
    let boxX = marginLeft;
    let boxY = marginTop;
    let boxWidth = pageWidth - marginLeft - marginRight;
    let boxHeight = 15; // Adjust height as needed
    doc.setLineWidth(0.05);
    doc.rect(boxX, boxY, boxWidth, boxHeight);
    
}