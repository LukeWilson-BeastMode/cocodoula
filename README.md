# cocodoula.com

Single-page site for Coco Doula, a birth doula in Austin, Texas.
Static HTML, no build step. Hosted on GitHub Pages at the apex domain.

## Editing

Everything lives in `index.html` - markup, styles, and the booking script are all in that one file.
The photo is `assets/coco.jpg` (1000x1500, compressed).

## The booking form

The popup form posts to the endpoint set in `FORM_ENDPOINT` near the bottom of `index.html`.
If that constant is empty, the form shows its confirmation state but sends nothing.
