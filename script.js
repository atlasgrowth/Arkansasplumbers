
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.name,
    data.pathname,
    data.referrer,
    new Date(data.time).toLocaleString(),
    data.userAgent
  ]);
}
