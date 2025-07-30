function test () {
    for (let i = 0; i < 22; i++) {
    const tabletest = document.getElementById('addSupplyRow');
    tabletest.click();
    }
    for (let i = 1; i <= 22; i++) {
        const input =  document.querySelectorAll('.supply-list-table input' );
        input = input[i].value = `${i}`;
      }
}