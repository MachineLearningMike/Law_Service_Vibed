#!/usr/bin/env python3
"""Serve the law firm website locally.

Usage:
    python serve.py                 # http://localhost:8123, opens browser
    python serve.py --port 9000     # choose a port
    python serve.py --host 0.0.0.0  # allow access from other devices on your network
    python serve.py --no-browser    # don't open a browser tab

If the requested port is busy, the next free port is used automatically.
Requires only Python 3.8+ (standard library).
"""
import argparse
import functools
import http.server
import socket
import sys
import threading
import webbrowser
from pathlib import Path

SITE_ROOT = Path(__file__).resolve().parent


def find_free_port(host: str, start: int, attempts: int = 50) -> int:
    for port in range(start, start + attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind((host, port))
                return port
            except OSError:
                continue
    sys.exit(f"error: no free port found in range {start}-{start + attempts - 1}")


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        if self.server.verbose:  # type: ignore[attr-defined]
            super().log_message(fmt, *args)

    def end_headers(self):
        # Always serve fresh files while developing.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the law firm website locally.")
    parser.add_argument("-p", "--port", type=int, default=8123, help="port to listen on (default: 8123)")
    parser.add_argument("--host", default="127.0.0.1", help="interface to bind (default: 127.0.0.1)")
    parser.add_argument("--no-browser", action="store_true", help="do not open a browser tab")
    parser.add_argument("-v", "--verbose", action="store_true", help="log every request")
    args = parser.parse_args()

    if not (SITE_ROOT / "index.html").exists():
        sys.exit(f"error: index.html not found in {SITE_ROOT}")

    port = find_free_port(args.host, args.port)
    if port != args.port:
        print(f"Port {args.port} is busy, using {port} instead.", flush=True)

    handler = functools.partial(QuietHandler, directory=str(SITE_ROOT))
    server = http.server.ThreadingHTTPServer((args.host, port), handler)
    server.verbose = args.verbose  # type: ignore[attr-defined]

    shown_host = "localhost" if args.host in ("127.0.0.1", "0.0.0.0") else args.host
    url = f"http://{shown_host}:{port}/"
    print(f"Serving {SITE_ROOT}\n  -> {url}\nPress Ctrl+C to stop.", flush=True)

    if not args.no_browser:
        threading.Timer(0.5, lambda: webbrowser.open(url)).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
