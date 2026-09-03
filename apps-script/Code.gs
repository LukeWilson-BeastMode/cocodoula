// Receives booking submissions from cocodoula.com.
// Appends a row to the sheet and emails Courtney.
// Deployed as a web app: Execute as "Me", Who has access "Anyone".

var SHEET_ID = '1KXaQWtWpDw1WdfgK5_L3N0Ageo014sgsukJD9N6urIA';
var NOTIFY   = 'courtneywilsonco@gmail.com';

function doPost(e) {
  var p = (e && e.parameter) || {};

  var name  = p.name      || '';
  var email = p.email     || '';
  var phone = p.phone     || '';
  var due   = p.due_date  || '';

  SpreadsheetApp.openById(SHEET_ID)
    .getSheets()[0]
    .appendRow([new Date(), name, email, phone, due]);

  MailApp.sendEmail({
    to: NOTIFY,
    replyTo: email,
    subject: 'New booking inquiry: ' + (name || 'no name given'),
    body:
      'A new inquiry came in through cocodoula.com.\n\n' +
      'Name:      ' + name + '\n' +
      'Email:     ' + email + '\n' +
      'Phone:     ' + phone + '\n' +
      'Due date:  ' + prettyDate(due) + '\n\n' +
      'Reply to this email to answer her directly.\n\n' +
      'All inquiries: https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/edit'
  });

  return ContentService.createTextOutput('ok');
}

function doGet() {
  return ContentService.createTextOutput('Coco Doula booking endpoint is live.');
}

// Turn 2027-03-14 into March 14, 2027 without tripping over time zones.
function prettyDate(s) {
  var m = String(s || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return s;
  var months = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
  return months[Number(m[2]) - 1] + ' ' + Number(m[3]) + ', ' + m[1];
}
