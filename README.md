# Birthday Surprise

A desktop-first, private cinematic surprise site built with HTML, CSS, vanilla ES modules, GSAP, Canvas, and Lenis.

## Personalize it

Edit only `js/config.js`:

- Set the names and all written copy.
- Update the timeline entries.
- Put 3–4 photos in `assets/photos/`, then update each matching `src` in `memories`.
- Add an MP3 at `assets/music/background.mp3`, or change the `music` value.

No other project file needs personal edits.

## Run locally

Use any static server from the project root (for example, VS Code Live Server). ES modules will not load correctly from a `file://` URL in most browsers.

## Deployment

This is a static site. Upload the project directory to Netlify, Vercel, GitHub Pages, or any static host. Ensure the `assets/` directory is included.

## Browser target

Modern desktop Chrome, Edge, Safari, and Firefox at 1366×768 or greater. The experience honors the operating system reduced-motion preference.
