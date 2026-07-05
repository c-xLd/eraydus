@echo off
echo Cleaning up legacy Vite project...
if not exist _legacy mkdir _legacy

move assets _legacy\ >nul 2>&1
move src _legacy\ >nul 2>&1
move public _legacy\ >nul 2>&1
move node_modules _legacy\ >nul 2>&1
move package.json _legacy\ >nul 2>&1
move package-lock.json _legacy\ >nul 2>&1
move vite.config.ts _legacy\ >nul 2>&1
move tsconfig.json _legacy\ >nul 2>&1
move tsconfig.app.json _legacy\ >nul 2>&1
move tsconfig.node.json _legacy\ >nul 2>&1
move index.html _legacy\ >nul 2>&1
move patch_configurator.js _legacy\ >nul 2>&1
move patch_configurator.mjs _legacy\ >nul 2>&1
move metadata.json _legacy\ >nul 2>&1
move README.md _legacy\ >nul 2>&1
move .env* _legacy\ >nul 2>&1

echo.
echo ==============================================
echo Installing Next.js 15 App Router...
echo ==============================================
call npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir false --import-alias "@/*" --use-npm

echo.
echo ==============================================
echo Installing core dependencies...
echo ==============================================
call npm install framer-motion @supabase/supabase-js @supabase/ssr lucide-react zod react-hook-form @hookform/resolvers @tanstack/react-query

echo.
echo ==============================================
echo Initializing Shadcn/UI...
echo ==============================================
call npx shadcn@latest init -y

echo.
echo ==============================================
echo Setup Complete!
echo ==============================================
echo Please return to the chat and type "Done".
pause
