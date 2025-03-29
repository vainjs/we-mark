# WeMark - 微信公众号 Markdown 编辑器

WeMark 是一款专为微信公众号文章创作者设计的跨平台桌面应用程序，基于 Tauri + React + TypeScript 构建。它允许用户使用 Markdown 语法编写文章，同时提供实时预览功能，让您的文章在发布前就能看到最终效果。

## ✨ 主要功能

- **Markdown 编辑器**：支持标准 Markdown 语法，让您专注于内容创作
- **实时预览**：即时查看文章在微信公众号中的呈现效果
- **主题切换**：多种内置主题，适配不同的公众号风格
- **设备预览**：支持模拟不同移动设备尺寸，确保在各种屏幕上都有良好的阅读体验
- **自动保存**：定期自动保存您的工作，防止意外丢失
- **一键导出**：支持导出为微信公众号兼容的格式
- **离线工作**：完全本地化应用，无需联网即可使用

## 🚀 开始使用

### 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
pnpm tauri dev
```

### 构建应用

```bash
# 构建生产版本
pnpm tauri build
```

## 💻 开发设置

我们推荐以下开发工具:

- [VS Code](https://code.visualstudio.com/)
- [Tauri 扩展](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## 🔧 技术栈

- **前端**: React, TypeScript, Vite
- **后端**: Tauri (Rust)
- **编辑器**: 自定义 Markdown 实现
- **预览**: 使用 marked 和 DOMPurify 进行渲染

## 📝 计划功能

- [ ] 图片上传功能
- [ ] 代码高亮支持
- [ ] 更多微信公众号特殊元素支持
- [ ] 历史版本管理
- [ ] 云端同步
