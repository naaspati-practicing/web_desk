@echo off
setlocal

if "%1"=="" (
 echo no command specified
 goto:help
)
if %1==yarn (
 copy package.json  .myfiles\backup\package-1.json
 copy yarn.lock  .myfiles\backup\yarn-1.lock
 echo copy package.json  .myfiles\backup\package-1.json
 echo copy yarn.lock  .myfiles\backup\yarn-1.lock
 goto:eof
)
IF %1==s  (
node live-server.js
goto:eof
)
if %1==collect (
  cd C:\Users\Sameer\Documents\MEGA\programming_backup\CodePens\app
  run pc
  goto:eof
)


set first=%1
set second=%2
set RESTVAR=

for /f "tokens=1,* delims= " %%a in ("%*") do set RESTVAR=%%b

if %first%==change (
   echo %RESTVAR%
  node .myfiles\change-mode.js %RESTVAR%
  goto:eof
)
echo unknown command: %*
:help
echo usage  
 echo     s    run live-server
 
 