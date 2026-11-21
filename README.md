# PolyMath — Interactive Webapp Demo

Interactive frontend prototype of **PolyMath** built with Vite, React, TypeScript, and Tailwind CSS, implementing all 28 screens and 4 interactive component sets from Figma Page 2.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Deploying to GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` and uses relative asset paths (`base: './'` in `vite.config.ts`) so it works under any repository subpath.

1. Push the `main` branch to your GitHub repository.
2. Open **Settings → Pages** in your GitHub repository.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. The workflow builds `dist/` and publishes the live demo to `https://<username>.github.io/<repo-name>/`.
