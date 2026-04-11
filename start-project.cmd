@echo off
start "Tech Path Finder Backend" cmd /k "cd /d %~dp0Backend && node server.js"
start "Tech Path Finder Frontend" cmd /k "cd /d %~dp0Frontend && npm.cmd run dev"
