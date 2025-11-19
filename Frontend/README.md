# 🟢 SavFi

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-4-yellow)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/tailwindcss-3-teal)](https://tailwindcss.com/)

A React + TypeScript dashboard project with a **sidebar**, **routing**, **icons**, and **responsive design**. Built with **React Router DOM**, **Lucide Icons**, and **Tailwind CSS**.

---

-npm install react react-dom
-npm install react-router-dom
-npm install lucide-react

# 🟢 SavFi Dashboard

## 🌟 Features

- Fully typed with **TypeScript**
- Sidebar with **icons first** and buttons
- SPA navigation with **React Router DOM**
- Responsive design with **Tailwind CSS**
- Easy to extend with new routes or pages

---

## 📸 Screenshots

![Sidebar Example](./screenshots/sidebar.png)
_Sidebar with icons first, active link highlighted_

![Dashboard Example](./screenshots/dashboard.png)
_Sample dashboard page_

> Replace the screenshots with your own images in `./screenshots/`.

---

## 🛠 Project Setup

### 1️⃣ Clone the repository

````bash
git clone <your-repo-url>
cd frontend


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
