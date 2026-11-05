# Law Firm Website

A static, multi-page law firm website. It uses plain HTML, CSS and JavaScript, with no build step.

## Run locally

You need Python 3.8 or later. There are no other dependencies.

```bash
git clone <repo-url> && cd Law_Service_Vibed

# Windows
serve.cmd

# macOS / Linux
sh serve.sh

# Any OS
python serve.py
```

The site opens in your browser at <http://localhost:8123>. If that port is busy, the next free port is used. Press Ctrl+C to stop.

| Option | Description |
| --- | --- |
| `-p, --port N` | Port to try first (default 8123) |
| `--host 0.0.0.0` | Make the site reachable from other devices on your network |
| `--no-browser` | Don't open a browser tab |
| `-v, --verbose` | Log every request |

## Structure

- `index.html`: home page (hero slider, about, practice areas, why choose us, team, insights)
- `about.html`, `team.html`, `practices.html`, `insights.html`, `contact.html`
- `css/style.css`: all styles (colour tokens are in `:root`)
- `js/main.js`: shared header and footer, plus all content data (`SITE`, `PRACTICES`, `WHY`, `TEAM`, `POSTS`)

## Customising

Edit the `SITE` object at the top of `js/main.js` to change the firm name, address, email and phone. These details are used on every page.
Practice areas, team members and insight articles are all plain arrays in the same file.

The contact form is front-end only: it shows a confirmation message but does not send anything yet.
