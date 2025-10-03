@echo off
echo Clearing Expo and Metro cache...

echo Removing .expo folder...
if exist ".expo" rmdir /s /q ".expo"

echo Removing node_modules\.cache...
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"

echo Removing metro cache...
if exist "%LOCALAPPDATA%\Metro" rmdir /s /q "%LOCALAPPDATA%\Metro"

echo Removing temp files...
if exist "%TMP%\react-native-*" del /s /q "%TMP%\react-native-*"
if exist "%TMP%\metro-*" del /s /q "%TMP%\metro-*"

echo Cache cleared successfully!
echo.
echo Starting Expo development server...
npx expo start --clear

pause