/** Bind this script to the private enquiries spreadsheet. Deploy as Web app: Execute as Me; access Anyone. */
const OWNER_EMAIL = 'work.ashutosh1873@gmail.com';
const SHEET_NAME = 'Enquiries';
function doPost(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};
    if (p.website) return response_('Thank you. Your message was received.', true, p.contactNonce || '');
    const name=String(p.name||'').trim(), email=String(p.email||'').trim(), phone=String(p.phone||'').trim(), description=String(p.description||'').trim();
    if (!name || !email || !phone || !description) throw new Error('Required fields are missing.');
    if (name.length>100 || email.length>150 || phone.length>25 || description.length>3000) throw new Error('Field length limit exceeded.');
    const ss=SpreadsheetApp.getActiveSpreadsheet(); if(!ss) throw new Error('Bind this script to the enquiry spreadsheet.');
    let sh=ss.getSheetByName(SHEET_NAME); if(!sh){sh=ss.insertSheet(SHEET_NAME);sh.appendRow(['Timestamp','Name','Email','Phone','Description','Source']);sh.setFrozenRows(1);}
    sh.appendRow([new Date(),safe_(name),safe_(email),safe_(phone),safe_(description),'Portfolio website']);
    const body=['A new enquiry was submitted through your portfolio.','','Name: '+name,'Email: '+email,'Phone: '+phone,'','Description:',description,'','Google Sheet: '+ss.getUrl()].join('\n');
    MailApp.sendEmail({to:OWNER_EMAIL,subject:'New portfolio enquiry — '+name,body:body,replyTo:email,name:'Portfolio Contact Form'});
    return response_('Thank you. Your message was received.', true, p.contactNonce || '');
  } catch(err) { console.error(err); return response_('We could not process your message. Please email the portfolio owner directly.', false, (e && e.parameter && e.parameter.contactNonce) || ''); }
}
function safe_(v){return /^[=+\-@]/.test(v)?"'"+v:v;}
function response_(message, ok, nonce){const payload=JSON.stringify({type:'portfolio-contact-result',ok:!!ok,message:message,nonce:nonce});const html='<!doctype html><html><body><script>window.top.postMessage('+payload+', \"*\");</script></body></html>';return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);}
