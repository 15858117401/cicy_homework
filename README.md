# CURATED. — interactive recruitment prototype

This is a static HTML, CSS, and vanilla JavaScript prototype. Open `dist/index.html` through a local HTTP server (for example `python3 -m http.server 4173 --directory dist`) and visit `http://localhost:4173`.

## Editing

- Repeated brand, job and candidate content lives in `dist/data.js`; changing it there updates the complete experience.
- Replace `dist/assets/candidate-a.png` and `candidate-b.png` with approved portraits using the same filenames, or change their paths in `data.js`.
- The visual system and responsive rules are in `dist/styles.css`; the journey and interactions are in `dist/app.js`.
- The digital identity card is a temporary web layout. Replace it after the physical card designer supplies the final artwork and field hierarchy.

## Candidate data

Both candidates intentionally use the same eight displayed fields: name, current position, professional experience, Taste Index, Originality, Visual Judgment, Cultural Awareness, and verification status. The portraits remain generated, replaceable fictional placeholders. The A/B keys in `dist/data.js` are internal routing identifiers only.
