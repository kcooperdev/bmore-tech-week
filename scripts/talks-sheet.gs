const SHEET_ID = "1zD2jvW08UzFZndyEDOgw_BzWNTFocecTqZZOae4hbUM";
const TAB = "Talks";
const COLS = [
  "Submitted",
  "Name",
  "Email",
  "Company Name",
  "Linkedin",
  "Session Type",
  "Day",
  "Session title",
  "Session Description",
  "Track",
  "Open to a panel",
  "Notes",
];
const ALIASES = {
  "Company Name": ["Company Name", "Company"],
  Linkedin: ["Linkedin", "LinkedIn"],
  "Session Type": ["Session Type", "Format"],
  "Session Description": ["Session Description", "Description"],
  "Open to a panel": ["Open to a panel", "Panelist"],
  Notes: ["Notes", "Accessibility"],
};
const LEGACY = [
  "Submitted",
  "Name",
  "Email",
  "Phone",
  "Company",
  "What you do",
  "City",
  "Session title",
  "Description",
  "Takeaways",
  "Format",
  "Day",
  "Track",
  "Audience",
  "Spoken before",
  "Links",
  "Panelist",
  "Accessibility",
  "Notes",
  "LinkedIn",
  "Website",
];
const WIDTHS = [160, 160, 220, 180, 220, 130, 170, 260, 420, 220, 140, 260];

function json(output) {
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function spreadsheet() {
  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (err) {}
  return SpreadsheetApp.openById(SHEET_ID);
}

function mappedRow(headers, values) {
  const map = {};
  const keys = headers.length ? headers : LEGACY;
  keys.forEach(function (key, i) {
    map[key] = values[i] != null ? String(values[i]) : "";
  });
  function pick(col) {
    const names = ALIASES[col] || [col];
    for (var i = 0; i < names.length; i++) {
      if (map[names[i]]) return map[names[i]];
    }
    return "";
  }
  const row = COLS.map(pick);
  if (row[0]) {
    const when = new Date(row[0]);
    if (!isNaN(when.getTime())) {
      row[0] = Utilities.formatDate(when, "America/New_York", "MMM d, yyyy h:mm a");
    }
  }
  return row;
}

function layout(sheet) {
  const cols = COLS.length;
  sheet.getRange(1, 1, 1, cols).setValues([COLS]);
  const header = sheet.getRange(1, 1, 1, cols);
  header
    .setFontWeight("bold")
    .setFontFamily("Arial")
    .setFontSize(10)
    .setBackground("#111111")
    .setFontColor("#e2b13c")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setWrap(false);
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 36);
  WIDTHS.forEach(function (width, i) {
    sheet.setColumnWidth(i + 1, width);
  });
  const rows = Math.max(sheet.getLastRow() - 1, 1);
  const body = sheet.getRange(2, 1, rows, cols);
  body.setFontFamily("Arial").setFontSize(10).setVerticalAlignment("top").setWrap(true);
  sheet.setRowHeights(2, rows, 48);
  const extra = sheet.getMaxColumns() - cols;
  if (extra > 0) sheet.deleteColumns(cols + 1, extra);
  if (sheet.getFilter()) sheet.getFilter().remove();
  sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), cols).createFilter();
}

function doGet() {
  return json({ ok: true });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const body = JSON.parse(raw);
    const values = body.values || [];
    if (!values.length) return json({ ok: false, error: "No values" });

    const ss = spreadsheet();
    let sheet = ss.getSheetByName(TAB);
    if (!sheet) sheet = ss.insertSheet(TAB);

    const row = mappedRow(body.headers || [], values);
    if (sheet.getLastRow() === 0) sheet.appendRow(COLS);
    sheet.appendRow(row);
    layout(sheet);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
