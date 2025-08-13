# GitHub Pages 部署指南

本文档详细说明如何将VitePress文档部署到GitHub Pages，实现在线访问。

## 部署概述

通过GitHub Actions自动构建和部署VitePress文档到GitHub Pages，每次推送到main分支时自动更新网站。

### 部署后访问地址
- **文档网站**: `https://yourusername.github.io/Immortality/`
- **替换yourusername**: 将yourusername替换为你的GitHub用户名

## 配置步骤

### 1. GitHub仓库设置

#### 启用GitHub Pages（必须手动完成）
1. 进入GitHub仓库页面
2. 点击 **Settings** 选项卡
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**

⚠️ **重要提示**：必须先手动启用GitHub Pages，否则Actions工作流会失败。如果看到"Not Found"错误，请确保已完成此步骤。

#### 配置仓库权限
1. 在 **Settings** → **Actions** → **General**
2. 确保 **Workflow permissions** 设置为：
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**

### 2. 文件配置说明

#### GitHub Actions工作流
文件位置：`.github/workflows/deploy-docs.yml`

```yaml
name: Deploy VitePress Docs to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - 'doc/**'
      - '.github/workflows/deploy-docs.yml'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
          cache-dependency-path: doc/package-lock.json
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Install dependencies
        run: |
          cd doc
          npm ci
      
      - name: Build with VitePress
        run: |
          cd doc
          npm run docs:build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: doc/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### VitePress配置更新
文件位置：`doc/.vitepress/config.mts`

关键配置项：
```typescript
export default withMermaid(
  defineConfig({
    title: "Immortality - 游戏开发文档",
    description: "Web RPG游戏开发文档",
    lang: 'zh-Hans',
    base: '/Immortality/', // GitHub Pages路径配置
    // ... 其他配置
  })
)
```

### 3. 部署流程

#### 自动部署触发条件
- 推送到 `main` 分支
- 修改 `doc/` 目录下的文件
- 修改工作流文件本身
- 手动触发（在Actions页面）

#### 部署步骤
1. **提交更改**：
   ```bash
   git add .
   git commit -m "docs: 更新文档内容"
   git push origin main
   ```

2. **查看部署状态**：
   - 进入GitHub仓库的 **Actions** 选项卡
   - 查看 "Deploy VitePress Docs to GitHub Pages" 工作流
   - 等待构建和部署完成（通常2-5分钟）

3. **访问网站**：
   - 部署成功后访问：`https://yourusername.github.io/Immortality/`

### 4. 故障排除

#### 常见问题

**问题1：Pages未启用（最常见）**
```
Error: Get Pages site failed. Please verify that the repository has Pages enabled
Error: HttpError: Not Found
```
解决方案：
- 进入GitHub仓库 → Settings → Pages
- Source选择"GitHub Actions"
- 必须手动启用，无法通过Actions自动启用

**问题2：Actions权限不足**
```
Error: Resource not accessible by integration
```
解决方案：
- 检查仓库Settings → Actions → General
- 确保Workflow permissions设置正确

**问题3：构建失败**
```
Error: npm ci failed
```
解决方案：
- 检查`doc/package.json`和`doc/package-lock.json`
- 确保依赖版本兼容

**问题4：路径错误**
```
404 Page Not Found
```
解决方案：
- 检查`config.mts`中的`base`配置
- 确保与仓库名称一致

#### 调试方法

1. **查看Actions日志**：
   - GitHub仓库 → Actions → 选择失败的工作流
   - 展开各个步骤查看详细日志

2. **本地测试构建**：
   ```bash
   cd doc
   npm run docs:build
   npm run docs:preview
   ```

3. **检查构建产物**：
   - 确保`doc/.vitepress/dist`目录生成
   - 检查静态文件是否正确

### 5. 高级配置

#### 自定义域名
如果有自定义域名，可以配置：

1. 在`doc/.vitepress/public/`目录下创建`CNAME`文件：
   ```
   docs.yourdomain.com
   ```

2. 更新`config.mts`：
   ```typescript
   export default withMermaid(
     defineConfig({
       // ...
       base: '/', // 自定义域名时使用根路径
       // ...
     })
   )
   ```

#### 环境变量配置
在GitHub仓库Settings → Secrets and variables → Actions中添加：
- `NODE_VERSION`: Node.js版本（可选，默认18）
- `BUILD_COMMAND`: 自定义构建命令（可选）

### 6. 维护和更新

#### 定期维护
- 定期更新GitHub Actions版本
- 检查VitePress和依赖包更新
- 监控构建性能和部署时间

#### 版本管理
- 使用语义化版本标签
- 为重要版本创建Release
- 维护CHANGELOG文档

## 总结

通过以上配置，你的VitePress文档将：
- ✅ 自动构建和部署
- ✅ 支持在线访问
- ✅ 每次更新自动同步
- ✅ 支持Mermaid图表渲染
- ✅ 响应式设计，支持移动端

部署完成后，团队成员和用户都可以通过网页直接访问最新的项目文档。