var NOTIFY_EMAIL = 'team@bmoretechweek.com';

function flagYes(value) {
  return value === true || value === 'true' || value === 'Yes';
}

function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var name = String(data.name || '').trim();
    var email = String(data.email || '').trim();
    var company = String(data.company || '').trim();
    var wantHost = flagYes(data.wantHost);
    var wantSponsor = flagYes(data.wantSponsor);
    var wantVolunteer = flagYes(data.wantVolunteer);
    var wantCommunityPartner = flagYes(data.wantCommunityPartner);
    var at = String(data.at || new Date().toISOString());

    if (!name || !email) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Name and email required' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      at,
      name,
      email,
      company || '',
      wantHost ? 'Yes' : 'No',
      wantSponsor ? 'Yes' : 'No',
      wantVolunteer ? 'Yes' : 'No',
      wantCommunityPartner ? 'Yes' : 'No',
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: 'Early Access: ' + name + (company ? ' (' + company + ')' : ''),
      body: [
        'New Early Access signup',
        '',
        'Name: ' + name,
        'Email: ' + email,
        'Company: ' + (company || '-'),
        'Want to host: ' + (wantHost ? 'Yes' : 'No'),
        'Want to sponsor: ' + (wantSponsor ? 'Yes' : 'No'),
        'Want to volunteer: ' + (wantVolunteer ? 'Yes' : 'No'),
        'Want to be a community partner: ' + (wantCommunityPartner ? 'Yes' : 'No'),
        'Submitted: ' + at,
      ].join('\n'),
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'btw-early-access' }))
    .setMimeType(ContentService.MimeType.JSON);
}
