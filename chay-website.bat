@echo off
title CHAY WEBSITE PORTAL THCS DONG TAN
echo =======================================================
echo 🚀 KHỞI ĐỘNG CỔNG THÔNG TIN ĐIỆN TỬ THCS ĐỒNG TÂN (OFFLINE & ONLINE)
echo 🌐 Đang kích hoạt Server và Giao diện tại http://localhost:3001
echo =======================================================
cd /d "%~dp0"

IF NOT EXIST "dist\index.html" (
    echo 🔨 Đang biên dịch giao diện Web ngoại tuyến (Build Vite)...
    call npm run build
)

start "" http://localhost:3001
node server/server.js
pause

