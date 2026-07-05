@echo off
echo Adding all files to git...
git add .

echo.
echo Committing changes...
git commit -m "feat: Next.js migration and configurator implementation"

echo.
echo Updating remote URL with provided token...
git remote set-url origin https://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@github.com/c-xLd/eraydus.git

echo.
echo Pushing to GitHub...
git push -u origin main || git push -u origin master

echo.
echo ==============================================
echo Push Complete!
echo ==============================================
pause
