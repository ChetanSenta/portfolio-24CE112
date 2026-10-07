# Chetan Senta — Student Portfolio

This project is the React and Component Architecture practical for Practical 1. It is a single-page portfolio built with Vite and reusable functional components.

## Practical 2 additions

The portfolio now demonstrates state management and client-side routing:

- `/` — Home page
- `/projects` — Projects page
- `/contact` — Controlled contact form with live character count
- `*` — Custom 404 page

`BrowserRouter` is configured in `src/main.jsx`, and navigation uses `NavLink` so routes change without a full page reload. The contact form uses `useState` for the message input and a second `useState` value to toggle contact details.

## Component structure

- `src/App.jsx` — stores the portfolio data and composes the page.
- `src/components/NavBar.jsx` — page navigation.
- `src/components/Header.jsx` — introduction and theme-color prop example.
- `src/components/About.jsx` — education, experience, and profile summary.
- `src/components/Skills.jsx` — dynamically renders skill groups from props.
- `src/components/Projects.jsx` — dynamically renders project cards from props.
- `src/components/Footer.jsx` — contact and copyright information.

Resume details used in the page are based on Chetan Senta's resume.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Verify

```bash
npm run lint
npm run build
```
