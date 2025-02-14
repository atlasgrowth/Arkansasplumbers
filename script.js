
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.sessionStart,
    data.businessName,
    data.sessionId,
    data.pageViews.join(','),
    data.timeOnSite,
    data.pageCount
  ]);
}
