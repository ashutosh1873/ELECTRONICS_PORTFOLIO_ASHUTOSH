# Contact form backend — Google Sheets + Apps Script

The portfolio is a static GitHub Pages site. This free backend stores every enquiry in a private Google Sheet and sends an email notification.

## One-time setup
1. Create a Google Spreadsheet named **Portfolio Enquiries**.
2. Open **Extensions → Apps Script**.
3. Replace the editor contents with `Code.gs` from this folder and save.
4. Select **Deploy → New deployment → Web app**.
5. Set **Execute as: Me** and **Who has access: Anyone**.
6. Deploy and authorize the requested Google permissions.
7. Copy the Web app URL ending in `/exec`.
8. In `script.js`, replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with the deployed URL.
9. Commit and push the website to GitHub Pages.

## Where enquiries are stored
The script creates an `Enquiries` sheet tab on the first valid submission. Columns: Timestamp, Name, Email, Phone, Description, Source. The same submission triggers an email to `work.ashutosh1873@gmail.com`. Keep the spreadsheet private.

## Important
The contact form is not live until the Web App URL is configured and deployed. The public endpoint includes basic server-side validation and a honeypot, but is intended for a personal portfolio, not high-security data collection. Google Apps Script and Gmail quotas apply and may change. Check the current Google Apps Script quotas if usage grows.
