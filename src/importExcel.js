import XLSX from 'xlsx'
 
function readExcel (file) {
  const types = file.name.split('.')[1];
  const fileType = [
    'xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'
  ].some(item => item == types);
  if (!fileType) {
         alert('Format error! Please reselect');
    return
  }
 
  const reader = new FileReader();
  let result = [];
  reader.onload = function(e) {
    const data =  new Uint8Array(e.target.result);
    const wb = XLSX.read(data, {
      type: 'array'
    });
    wb.SheetNames.forEach((sheetName) => {
      result.push({
        sheetName: sheetName,
        sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
      })
    });
  };
  reader.readAsArrayBuffer(file)
 
  return result;
}

// var files = e.target.files, f = files[0];
// var reader = new FileReader();
// reader.onload = function(e) {
//   var data = new Uint8Array(e.target.result);
//   var workbook = XLSX.read(data, {type: 'array'});
//   let sheetName = workbook.SheetNames[0]
//   /* DO SOMETHING WITH workbook HERE */
//   console.log(workbook);
//   let worksheet = workbook.Sheets[sheetName];
//   console.log(XLSX.utils.sheet_to_json(worksheet));
// };
// reader.readAsArrayBuffer(f);
 
export { readExcel }