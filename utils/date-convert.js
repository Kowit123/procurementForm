// แสดงผล: 22/07/2025
function convertDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มที่ 0
    const year = d.getFullYear();
  
    return `${day}/${month}/${year}`; 
  }

// แสดงผล: 22/07/2568
function ThaiYear(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มที่ 0
    const thai_year = d.getFullYear() + 543;
  
    return `${day}/${month}/${thai_year}`; 
}

// แสดงผล: 22/มกราคม/2568
function ThaiDate(date) {
    let thai_months = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const thai_month = thai_months[d.getMonth()];
    const thai_year = d.getFullYear() + 543;  
    return `${day} ${thai_month} ${thai_year}`; 

}

  