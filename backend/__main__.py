"""Run the site with its backend.

    python -m backend                  # http://localhost:8000, opens browser
    python -m backend --port 9000
    python -m backend --host 0.0.0.0   # reachable from other devices on your network
    python -m backend --set-password   # change the admin password
"""
import argparse
import getpass
import sys
import threading
import webbrowser

from . import db


def main() -> None:
    ap = argparse.ArgumentParser(prog="python -m backend", description=__doc__.split("\n")[0])
    ap.add_argument("-p", "--port", type=int, default=8000)
    ap.add_argument("--host", default="127.0.0.1")
    ap.add_argument("--no-browser", action="store_true")
    ap.add_argument("--reload", action="store_true", help="restart automatically when code changes (development)")
    ap.add_argument("--set-password", action="store_true", help="set a new admin password and exit")
    args = ap.parse_args()

    generated = db.init_db()

    if args.set_password:
        pw = getpass.getpass("New admin password: ")
        if len(pw) < 8 or pw != getpass.getpass("Repeat: "):
            sys.exit("Passwords must match and be at least 8 characters.")
        db.set_password(pw)
        print("Admin password updated. All existing admin sessions were logged out.")
        return

    try:
        import uvicorn
    except ImportError:
        sys.exit("Missing dependencies. Run: pip install -r requirements.txt")

    url = f"http://{'localhost' if args.host in ('127.0.0.1', '0.0.0.0') else args.host}:{args.port}"
    print(f"\n  Site:   {url}/\n  Admin:  {url}/admin/\n  API:    {url}/api/docs")
    if generated:
        print(f"\n  First run: an admin password was generated for you: {generated}"
              "\n  Write it down now. Change it any time with: python -m backend --set-password")
    print()
    if not args.no_browser:
        threading.Timer(1.2, webbrowser.open, (url + "/",)).start()
    uvicorn.run("backend.app:app", host=args.host, port=args.port, reload=args.reload, log_level="info")


if __name__ == "__main__":
    main()
