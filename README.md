#belt-large-screen-frontend

## 启动 hooks, 生成 .husky 文件夹

`npx husky install`

## 添加 commitlint 的 hook 到 husky 中，commit-msg 时进行校验

`npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`

## 添加 commit 时的 hook，pre-commit 时运行 npx lint-staged

`npx husky add .husky/pre-commit "npx lint-staged"`
