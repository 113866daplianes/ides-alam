# iDES – ALAM HTML Prototype

A mobile-first, Facebook-inspired front-end prototype for Daplian Elementary School.

## Run it
1. Extract the ZIP file.
2. Open `index.html` in a modern browser.
3. No build tools or server are required for the basic demo.

## Included
- Mobile-first Facebook-inspired feed and fixed five-item bottom navigation.
- Home, Calendar, Announcements, My Profile, and Side Menu.
- Side-menu destinations: attendance demo, school directory, gallery, interactive campus map, and email support.
- Mock parent, teacher, School Head, AO, and public visitor accounts.
- Role-based front-end previews:
  - Public: read-only.
  - Parent: like and comment.
  - Teacher: create posts, like and comment.
  - School Head and AO: previewed as school personnel in this prototype.
- Placeholder posts, comments, school activities, staff directory entries, and attendance records.

## Demo account switching
Open **My Profile → Switch demo account** to switch between:
- Parent: Juan Dela Cruz
- Teacher: Maria G. Santisima – Grade 4 Adviser
- School Head
- AO: Ronell Nicolas – Administrative Officer / System Admin
- Public Visitor

## Important prototype limitations
This is a static front-end prototype. It does **not** include:
- Real registration, login, password storage, or account approval.
- Google Sheets or Apps Script backend.
- iAttend integration.
- Facebook Graph API / ALAM Sync Bot.
- Real post, comment, like, or media persistence.
- Real administrator authorization or moderation.
- Verified campus map locations.
- Production email delivery.

The mock interactions are local to the browser session. The Email Support form opens the user's email application using a placeholder address (`school.office@example.com`); replace it before any demonstration that sends email.

## Privacy and production notes
- Do not load real learner names, LRNs, attendance, or other confidential information into this prototype.
- No public student directory is included.
- Use authorized school-approved staff information and properly reviewed photographs only.
- Production authentication and APIs must enforce permissions server-side. Hiding controls in the browser is not security.
- The attendance page is mock data and is not connected to iAttend.
