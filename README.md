# AESTHETIC / WORK — first clickable draft

This is a static HTML, CSS, and vanilla JavaScript prototype. Open `dist/index.html` through a local HTTP server (for example `python3 -m http.server 4173 --directory dist`) and visit `http://localhost:4173`.

## Editing

- Repeated job and candidate content lives in `dist/data.js`. A `null` field means the original brief did not supply a final value. Replace it there once confirmed; the same value updates across the experience.
- Replace `dist/assets/candidate-a.png` and `candidate-b.png` with approved portraits using the same filenames, or change their paths in `data.js`.
- The visual system and responsive rules are in `dist/styles.css`; the journey and interactions are in `dist/app.js`.
- The digital identity card is a temporary web layout. Replace it after the physical card designer supplies the final artwork and field hierarchy.

## Draft boundaries

The portraits are generated, replaceable fictional placeholders. Final names, employer, IDs, dates, classifications, professional details, and selected works were not provided and remain empty. The interface shows the system labels “Candidate A” and “Candidate B” so the known comparison and hiring decision are usable without silently inventing biographies.
