@echo off
echo Start bat...
echo.
cd ../proxy/nodpi
uv run src/nd.py
echo.
echo Прокси-сервер был остановлен.
echo Нажмите любую клавишу для закрытия окна...
pause > nul