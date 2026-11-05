#!/usr/bin/env sh
# macOS/Linux launcher: ./serve.sh [--port 9000] [--no-browser]
DIR="$(cd "$(dirname "$0")" && pwd)"
if command -v python3 >/dev/null 2>&1; then exec python3 "$DIR/serve.py" "$@"
elif command -v python >/dev/null 2>&1; then exec python "$DIR/serve.py" "$@"
else echo "Python 3 is required: https://www.python.org/downloads/" >&2; exit 1
fi
