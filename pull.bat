@echo off
echo Updating remote URL with provided token...
git remote set-url origin https://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@github.com/c-xLd/eraydus.git

echo.
echo Fetching latest changes from GitHub...
git fetch origin

echo.
echo Pulling changes into local workspace...
git pull origin main || git pull origin master

echo.
echo ==============================================
echo RECENT CHANGES / DEGISEN DOSYALAR
echo ==============================================
git log -n 1 --stat

echo.
echo ==============================================
echo Pull Complete!
echo ==============================================
pause
