# ☃️fdm-cli

<p align="left">
  <a href="https://www.npmjs.com/package/fdm-cli">
    <img src="https://img.shields.io/npm/v/fdm-cli?color=f03e3e" alt="npm" />
  </a>
  <a href="https://github.com/wangenze267/fdm-cli">
    <img src="https://img.shields.io/github/stars/wangenze267/fdm-cli?color=1c7ed6" alt="star" />
  </a>
  <a href="https://github.com/wangenze267/fdm-cli">
    <img src="https://img.shields.io/npm/l/fdm-cli?color=37b24d" alt="license" />
  </a>
  <a href="https://npm-stat.com/charts.html?package=fdm-cli">
    <img src="https://img.shields.io/badge/dynamic/json?label=downloads&color=f76707&query=$.downloads&url=https://api.npmjs.org/downloads/point/last-week/fdm-cli" alt="npm-stats">
  </a>
</p>

A freedom-cli ( 一个向往自由的脚手架 )

## 📜 目的

提高脚手架的自由度，可以灵活的搭建自己想要的初始化项目

## 🛻 安装

```bash
npm install fdm-cli -g
```

## 📣 如何使用

### 基础命令

1. `fdm create` 根据模板库创建项目
   - 支持交互式配置
   - 自动安装依赖
   - 项目创建完成后显示后续步骤

2. `fdm list` 查看模板清单
   - 显示本地和远程模板
   - 包含模板描述和标签

3. `fdm switch <packageManager>` 切换使用的包管理器
   - 不填则默认使用 npm
   - 支持 npm/yarn/pnpm

4. `fdm install <package>` 下载依赖 同 npm
5. `fdm uninstall <package>` 卸载依赖 同 npm

### 模板管理

6. `fdm save <path> [newName]` 保存模板
   - 将指定路径的项目保存为模板
   - 可选择重命名
   - 自动验证模板结构
   ```bash
   fdm save ./my-project my-template
   ```

7. `fdm save -l <templatesPath>` 批量保存模板
   - 保存指定目录下的所有子目录为模板
   ```bash
   fdm save -l ./my-templates
   ```

8. `fdm delete <templateName>` 删除模板
   ```bash
   fdm delete my-template
   ```

### 远程模板

9. `fdm sync` 同步远程模板
   - 从远程仓库同步官方模板
   - 自动验证模板有效性

10. `fdm add-remote <repository> <name>` 添加远程模板
    - 支持 GitHub/GitLab 仓库
    ```bash
    fdm add-remote github:user/repo my-template
    ```

## 🔧 模板配置

在模板根目录创建 `fdm.config.js` 文件进行配置：

```javascript
module.exports = {
  name: 'template-name',
  description: 'Template description',
  // 交互式配置选项
  prompts: [
    {
      name: 'projectName',
      type: 'input',
      message: 'Project name:'
    },
    {
      name: 'version',
      type: 'input',
      message: 'Project version:',
      default: '1.0.0'
    }
  ],
  // 依赖配置
  dependencies: {
    'vue': '^3.0.0'
  },
  devDependencies: {
    'vite': '^2.0.0'
  },
  // 分类和标签
  category: 'frontend',
  tags: ['vue', 'typescript']
}
```

## 🤝 参与贡献

欢迎你参与到 fdm-cli 项目的建设中来！🎉

通过参与 fdm-cli 项目，我们可以一起：

🔥 学习最新的 TypeScript 技术

🎁 学习如何设计和开发一款自己的脚手架

⭐ 磨练编程技能，学习优秀的编程实践

🎊 结识一群热爱学习、热爱开源的朋友

如果你不知道从哪儿开始，可以阅读我们的 [贡献指南](https://github.com/wangenze267/fdm-cli/blob/main/Contributor.md)

## 🌠 维护者

- [Ned](https://github.com/wangenze267)
- [Conard](https://github.com/Conard-Ferenc)