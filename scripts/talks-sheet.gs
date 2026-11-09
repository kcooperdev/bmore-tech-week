function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  const headers = body.headers || [];
  const values = body.values || [];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Talks");
  if (!sheet) sheet = ss.insertSheet("Talks");
  if (sheet.getLastRow() === 0 && headers.length) {
    sheet.appendRow(headers);
  }
  sheet.appendRow(values);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  );
}
