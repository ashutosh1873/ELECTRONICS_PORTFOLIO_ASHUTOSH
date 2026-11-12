# Ashutosh — Electronics Engineering Portfolio (Iteration 5)

A dark, responsive, static multi-page portfolio for an Electronics Engineer and research contributor.

## Structure
- `index.html` — portfolio homepage
- `project-filter.html` — existing technical case study for the single-band triangular-ring filter (also linked as Publication 01)
- `publication-02.html` … `publication-11.html` — individual publication pages
- `project-library.html` — Library Management System case study
- `project-employee-payroll.html` — consolidated Employee Management / Employee Payroll project
- `project-portfolio.html` — this portfolio website as a project
- `project-data-portal.html` — detailed three-component technical case study of the Major Project Topic Data Acceptance, Display and Search Portal
- `assets/` — CVs, supplied paper PDFs, certificates, syllabus, project reports and selected screenshots

## CVs
- `assets/ashutosh-academic-cv.pdf`
- `assets/ashutosh-ats-resume.pdf`

## Hosting
Recommended: GitHub Pages for this static website.
1. Create a public repository, e.g. `ashutosh1873.github.io` or `electronics-portfolio`.
2. Upload the contents of this folder (not the outer ZIP folder).
3. In repository Settings → Pages, select deployment from the `main` branch and `/ (root)`.
4. Wait for GitHub Pages to publish the site.

A custom domain is optional. The site does not require a backend or paid hosting.

## Important content notes
- VLSI and CPS are described as coursework exposure, not professional implementation experience.
- Embedded Systems is presented as a research interest.
- M.Tech Cyber Physical Systems at MNNIT Allahabad is shown as discontinued; no degree is claimed.
- The 12th manuscript, “Design of 3rd Order Bandpass Filter with Coupled Lines and Microstrip Stubs”, is listed separately as under consideration, not as published.
- Employee Management System and Employee Payroll Management Software are consolidated as one project.
- Café Management System and Blood Bank Management System remain brief entries pending further project details.
- Weather Monitoring publication page is based on the acceptance certificate and DOI because the full manuscript PDF was not included in the uploaded materials.
- The Library Management System PDF has had an exposed hard-coded database credential masked in the public copy. Do not replace it with an unredacted copy.

## Project Data Portal source review
The case study was updated after inspecting ZIP exports of:
- `Data_Collection_Major_Project_B4`
- `Data_Display_Major_Projects_B4`
- `Data_Search_Major_Project_Table_B4`

The page documents the active form submission flow, client-side validations, Apps Script fetch endpoints, navigation routes, table rendering, keyword filtering and print workflow. The separate roll-number search page is linked because the display portal references it, but its source repository was not included. Apps Script server-side code and Google Sheets permissions were not supplied, so server-side validation and access controls are not asserted.

The review also flags production hardening opportunities: server-side validation, safe text rendering, data minimisation for publicly visible student records, and documented backend deployment permissions.


## Iteration 5
The Project Data Acceptance & Display Portal page now documents all three supplied repositories and the code-level workflow. The homepage project card reflects the three-part architecture.


## Version 6 — publication profiles and Git

- Ten research profile pages have expanded sections with original source page extracts showing diagrams and results.
- The first filter publication continues to use `project-filter.html`.
- Publication 02 (Weather Monitoring) lacks the full paper PDF; figures and methods are not fabricated.
- Git (version control) has been added to the technical skills section.
- All displayed research figures are extracts from the user-provided PDFs, with links to the original source page.


## Version 7 — contact form and Cafe Management System

### Contact form backend
The homepage GET IN TOUCH section now opens an accessible modal collecting Name, Email, Phone and Description. It submits via AJAX to FormSubmit (`formsubmit.co`) and is configured to notify `work.ashutosh1873@gmail.com`. FormSubmit is a third-party form backend; the first test submission triggers an email verification/activation request. Click the verification link in the inbox before expecting ongoing notifications. The service's current documentation describes its free setup and AJAX endpoint. The site does not store submissions in its own database. Review the provider's data handling and privacy terms before publishing.

### Cafe Management System case study
- `project-cafe-management.html` — detailed module-by-module case study.
- `assets/cafe/` — original illustrative UI reconstructions and the MySQL schema diagram. These are not screenshots of a running build.
- The 7z archive contained compiled Java classes and NetBeans `.form` metadata, but no `.java` source, SQL export, model classes or referenced image assets.
- Four table definitions were recoverable from `Database.tables`: `user`, `Category`, `product`, `bill`. `BillDao` references `paidBy` and `address` fields that are absent from the available bill DDL; verify against the original database.
- The uploaded archive contains hard-coded database credentials. It is not redistributed in the public website package.


## V8 contact form
The form uses a Google Apps Script web app to store enquiries in a private Google Sheet and email the owner. Follow `google-apps-script/SETUP.md`, then set the deployed `/exec` URL in `script.js`. Until configured, the form displays a clear setup notice.

## Cafe project assets
The Cafe Management System case study now uses the owner-provided screenshots and MySQL DESCRIBE evidence. A sanitized Java-source ZIP is linked from the case-study page; credentials and the default administrator seed password were removed. The supplied source bundle is not a complete runnable NetBeans project.
