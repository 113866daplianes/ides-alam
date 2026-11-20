# iDES – ALAM PWA Prototype

A responsive, installable Progressive Web App prototype for Daplian Elementary School.

## Run locally
A service worker requires HTTPS or localhost. Do not open `index.html` directly with `file://` if you want offline/PWA installation.

### Option A — Python local server
1. Extract the ZIP.
2. Open a terminal in the `iDES-ALAM-Prototype` folder.
3. Run:
   ```bash
   python -m http.server 8080
   ```
4. Visit `http://localhost:8080`.

### Option B — GitHub Pages
Upload the contents of this folder to a GitHub repository and enable GitHub Pages. HTTPS is provided by GitHub Pages, allowing service-worker registration and PWA installation.

## Included PWA features
- Web app manifest with 192px and 512px icons.
- Service worker and app-shell offline cache.
- Install prompt when the browser supports `beforeinstallprompt`.
- Responsive mobile and desktop layouts.
- Mobile fixed bottom navigation and desktop sidebar.
- Green Aero / Windows 7-inspired visual design.
- Custom branded pop-up selection dialogs; no native HTML dropdown menus are used for the learner, support topic, or post category selectors.
- Back navigation.
- Green heart Like button: white fill with green outline when not liked; solid green when liked.

## Supplied school assets
- `assets/ides-app-icon.png`: official iDES app icon and favicon.
- `assets/daplian-school-seal.png`: Daplian Elementary School seal.
- `assets/school-front-post.jpg`: supplied school-front photo used as the regular feed photo placeholder.
- `assets/school-head-emergency-batteries.jpg`: supplied photo for the School Head's emergency-battery article.
- `assets/principal-rosauro-caparino.png`: supplied profile photo for Rosauro B. Capariño Jr., Principal I.

## Featured sample post
**DES Procures Emergency Batteries for Power Shortage**

A short school update by Rosauro B. Capariño Jr., Principal I, ending with `#DESdaBest`.

## Mock accounts
Use My Profile → Switch demo account:
- Parent: Juan Dela Cruz
- Teacher: Maria G. Santisima — Grade 4 Adviser
- School Head: Rosauro B. Capariño Jr. — Principal I
- AO: Ronell Nicolas — Administrative Officer / System Admin
- Public Visitor

## Prototype limitations
This is a front-end demonstration only. It does not include production authentication, account approval, password recovery, real moderation, Google Apps Script/Sheets backend, iAttend integration, or Facebook Page synchronization. Likes, comments, and posts are temporary browser-session data.

The email support address remains a placeholder: `school.office@example.com`. Replace it with the verified school office address before deployment to real users.

The campus map, staff records, calendar entries, and attendance records are illustrative mock data. Confirm all real-world details before publication.

## Security
The prototype disables the browser context menu and common developer-tool shortcuts as a casual deterrent. This is not security and can be bypassed. Never put API keys, credentials, private spreadsheet IDs, or sensitive learner information in frontend files. Production access control and data protection must be enforced by authenticated server-side APIs.
