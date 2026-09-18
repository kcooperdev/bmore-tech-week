/**
 * Baltimore Tech Week. One spreadsheet, four form tabs.
 *
 * 1. Create a Google Sheet.
 * 2. Extensions → Apps Script, paste this file, Save.
 * 3. Set WEBHOOK_SECRET to the same value as GOOGLE_SHEETS_SECRET.
 * 4. Run setupTabs() once (Run ▶) and approve Google permissions.
 * 5. Deploy → New deployment → type: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 6. Copy the web app URL into GOOGLE_SHEETS_WEBHOOK_URL.
 */

var WEBHOOK_SECRET = ''
var NOTIFY_EMAIL = 'team@bmoretechweek.com'

var TABS = {
  hosts: {
    name: 'Hosts',
    headers: [
      'Submitted',
      'ID',
      'Venue',
      'Neighborhood',
      'Address',
      'Capacity',
      'Nights',
      'Type',
      'Cost',
      'Amenities',
      'Contact name',
      'Contact email',
      'Status',
    ],
    keys: [
      'submittedAt',
      'id',
      'name',
      'neighborhood',
      'address',
      'capacity',
      'availableDates',
      'venueType',
      'cost',
      'amenities',
      'contactName',
      'contactEmail',
      'status',
    ],
  },
  speakers: {
    name: 'Speakers',
    headers: [
      'Submitted',
      'ID',
      'Name',
      'Email',
      'Talk title',
      'Talk description',
      'Topic',
      'Format',
      'Preferred neighborhood',
      'Preferred night',
      'LinkedIn',
      'Website',
      'Portfolio',
      'Status',
    ],
    keys: [
      'submittedAt',
      'id',
      'name',
      'email',
      'talkTitle',
      'talkDescription',
      'topic',
      'format',
      'preferredNeighborhood',
      'preferredDate',
      'linkedinUrl',
      'websiteUrl',
      'portfolioUrl',
      'status',
    ],
  },
  volunteers: {
    name: 'Volunteers',
    headers: [
      'Submitted',
      'ID',
      'Name',
      'Email',
      'Phone',
      'Roles',
      'Nights',
      'Preferred neighborhood',
      'Notes',
      'Status',
    ],
    keys: [
      'submittedAt',
      'id',
      'name',
      'email',
      'phone',
      'roles',
      'availableDates',
      'preferredNeighborhood',
      'notes',
      'status',
    ],
  },
  tickets: {
    name: 'Tickets',
    headers: ['Submitted', 'ID', 'Email'],
    keys: ['submittedAt', 'id', 'email'],
  },
}

function setupTabs() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  Object.keys(TABS).forEach(function (key) {
    getOrCreateTab_(ss, TABS[key])
  })
}

function doPost(e) {
  try {
    var data = {}
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents)
    }

    if (WEBHOOK_SECRET && data.secret !== WEBHOOK_SECRET) {
      return json_({ ok: false, error: 'Unauthorized' })
    }

    var spec = TABS[data.tab]
    if (!spec) {
      return json_({ ok: false, error: 'Unknown tab' })
    }

    var fields = data.fields || {}
    var row = spec.keys.map(function (key) {
      return fields[key] == null ? '' : String(fields[key])
    })

    var sheet = getOrCreateTab_(SpreadsheetApp.getActiveSpreadsheet(), spec)
    sheet.appendRow(row)

    notify_(spec.name, fields)

    return json_({ ok: true, tab: spec.name })
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  }
}

function doGet() {
  return json_({ ok: true, service: 'btw-forms' })
}

function getOrCreateTab_(ss, spec) {
  var sheet = ss.getSheetByName(spec.name)
  if (!sheet) {
    sheet = ss.insertSheet(spec.name)
  }
  var lastCol = spec.headers.length
  var header = sheet.getRange(1, 1, 1, lastCol).getValues()[0]
  var blank = header.every(function (cell) {
    return cell === ''
  })
  if (blank) {
    sheet.getRange(1, 1, 1, lastCol).setValues([spec.headers])
    sheet.setFrozenRows(1)
    sheet.getRange(1, 1, 1, lastCol).setFontWeight('bold')
  }
  return sheet
}

function notify_(tabName, fields) {
  if (!NOTIFY_EMAIL) return
  var name = fields.name || fields.contactName || 'Someone'
  var email = fields.email || fields.contactEmail || ''
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: email || NOTIFY_EMAIL,
    subject: 'BTW ' + tabName + ': ' + name,
    body: [
      'New ' + tabName.toLowerCase() + ' submission',
      '',
      'Name: ' + name,
      email ? 'Email: ' + email : '',
      fields.talkTitle ? 'Talk: ' + fields.talkTitle : '',
      fields.roles ? 'Roles: ' + fields.roles : '',
      fields.neighborhood ? 'Neighborhood: ' + fields.neighborhood : '',
      fields.availableDates ? 'Nights: ' + fields.availableDates : '',
      '',
      'Open the spreadsheet to see the full row.',
    ]
      .filter(Boolean)
      .join('\n'),
  })
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
