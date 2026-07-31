Tüm yanıtlarını ve açıklamalarını her zaman akıcı bir Türkçe ile ver.
# Terminal Error Handling

Whenever a terminal command fails:

1. Read the COMPLETE terminal output.
2. Never stop at the first error line.
3. Identify the root cause.
4. Open the referenced files.
5. Fix the issue.
6. Run the same command again.
7. Continue until the command exits successfully.

Always inspect commands such as:

- npm run dev
- npm run build
- npm run lint
- npm run typecheck
- npm test
- pnpm build
- pnpm lint
- yarn build
- git status
- git diff

If multiple errors exist, resolve them one by one in order.

Never ask the user to copy terminal logs unless the terminal is inaccessible.