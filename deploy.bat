@echo off
echo ==============================================
echo 1/3: GITHUB'DAN EN GUNCEL KODLARI CEK (PULL)
echo ==============================================
git remote set-url origin https://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@github.com/c-xLd/eraydus.git
git fetch origin
git pull origin main || git pull origin master

echo.
echo ==============================================
echo 2/3: DEGISIKLIKLERI GITHUB'A GONDER (PUSH)
echo ==============================================
git add .

set commit_msg=
set /p commit_msg="Commit mesaji girin (Varsayilan icin Enter'a basin): "
if "%commit_msg%"=="" set commit_msg=Update and auto deploy

git commit -m "%commit_msg%" || echo Yeni degisiklik bulunamadi, mevcut durum yayinlanacak.
git push origin main || git push origin master

echo.
echo ==============================================
echo 3/3: VERCEL PROJESINE YAYINLA (DEPLOY)
echo ==============================================
vercel --prod --yes

echo.
echo ==============================================
echo TUM ISLEMLER TAMAMLANDI!
echo ==============================================
pause
