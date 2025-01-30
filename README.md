# CV generator React demo by Ignacio.

## React + Redux + TypeScript + Vite + React-pdf + Material UI + Cypress

CV generator: After requesting data from the user
and storing in the redux store, it generates a CV downloadable in PDF format.

Created with vite
Run: `npm run dev` (http://localhost:5173/)
Test: `npx cypress open`

This application will be deployed in vercel, check the url as well as other projects in my github repo:
https://github.com/Nacho1980

Some improvements that could be done over this project (I moved on to other stuff :):
-React router to have different paths for each page
-Tests that do not rely on inputs for the previous pages, eg using the Redux store from Cypress
-And of course expanding the functionality: more validations, higher number of templates, etc.
-CSS improved by dividing into different files or the use of new tools like Tailwind
-CSS improvements to accomodate view for phones
