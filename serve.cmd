@echo off
rem Windows launcher: serve.cmd [--port 9000] [--no-browser]
where python >nul 2>nul && (python "%~dp0serve.py" %* & exit /b)
where py >nul 2>nul && (py -3 "%~dp0serve.py" %* & exit /b)
echo Python 3 is required: https://www.python.org/downloads/
exit /b 1
