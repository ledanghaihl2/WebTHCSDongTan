@echo off
title KHOI DONG CONG THONG TIN THCS DONG TAN
echo =======================================================
echo 🚀 ĐANG KÍCH HOẠT HỆ THỐNG CỔNG THÔNG TIN THCS ĐỒNG TÂN
echo 🌐 Trình duyệt sẽ tự động mở tại: http://localhost:3001
echo =======================================================
cd /d "%~dp0"
start "" "http://localhost:3001"
node server/server.js
pause
