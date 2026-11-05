# Law Firm Website

A multi-page law firm website in plain HTML, CSS and JavaScript (no build step), with an optional Python backend for content management and the contact form.

## Run with the backend (recommended)

You need Python 3.10 or later.

```bash
pip install -r requirements.txt
python -m backend
```

| URL | What it is |
| --- | --- |
| <http://localhost:8000/> | The website, with content loaded from the database |
| <http://localhost:8000/admin/> | Admin panel: inquiries, firm details, practices, team, insights, "why choose us" |
| <http://localhost:8000/api/docs> | Interactive API documentation |

On first run the database is created in `data/site.db` and filled with the site's current content. An admin password is generated and printed once in the terminal; set `ADMIN_PASSWORD` before the first run to choose it yourself. To change it later, run `python -m backend --set-password` (this also logs out every admin session).

| Option | Description |
| --- | --- |
| `-p, --port N` | Port (default 8000) |
| `--host 0.0.0.0` | Make the site reachable from other devices on your network |
| `--no-browser` | Don't open a browser tab |
| `--reload` | Restart automatically when Python code changes |
| `--set-password` | Set a new admin password and exit |

Environment variables: `ADMIN_PASSWORD` (initial password), `LAW_DATA_DIR` (database folder, default `data/`), `SECURE_COOKIES=1` (set this when serving over HTTPS).

### What the backend does

- **Content API.** `GET /api/content` returns the firm details, practices, team, insights and "why choose us" points. `js/main.js` loads it on every page and falls back to its built-in data if the API is unavailable.
- **Contact form.** `POST /api/contact` validates and stores inquiries. It is rate-limited to 5 messages per 10 minutes per IP and has a hidden spam-trap field.
- **Admin panel.** Password login with an HttpOnly, SameSite=Strict session cookie (12 hours). Failed logins are rate-limited, and write requests require an `X-Requested-With: admin` header to block cross-site requests. Staff can read, mark, archive, delete and export (CSV) inquiries, edit all site content, and save insights as drafts.
- **Static files.** Only the root `*.html` pages and the `css/`, `js/` and `admin/` folders are served, never `backend/`, `data/` or `.git/`.

## Run without the backend (static preview)

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
- `js/main.js`: shared header and footer, plus built-in content data (`SITE`, `PRACTICES`, `WHY`, `TEAM`, `POSTS`) used when the backend isn't running
- `admin/`: admin panel (`index.html`, `admin.js`, `admin.css`)
- `backend/`: FastAPI app (`app.py`), SQLite storage and validation (`db.py`), launcher (`__main__.py`), and `seed.json` with the initial content
- `data/`: the SQLite database, created on first run and ignored by git

## Customising

With the backend, edit everything in the admin panel. Changes appear on the site immediately.

Without the backend, edit the `SITE` object and the content arrays at the top of `js/main.js`. In this mode the contact form can't send and shows an error with the firm's email and phone instead.

`backend/seed.json` is only read when the database is first created. To start again from it, stop the server and delete `data/site.db`.
