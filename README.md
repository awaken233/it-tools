# SQL Quote Tool

一个简洁高效的文本转SQL引号格式工具，支持批量处理多行文本。

![SQL Quote Tool](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Language](https://img.shields.io/badge/language-JavaScript-yellow.svg)

## ✨ 功能特性

- 🚀 **批量转换** - 支持多行文本一次性转换
- 💎 **Material Design** - 现代化美观的用户界面
- 📱 **响应式设计** - 完美支持桌面、平板和手机
- 📋 **自动复制** - 转换完成后自动复制结果到剪贴板
- ⚡ **实时统计** - 显示行数、字符数等统计信息
- 🛡️ **安全防护** - 内置XSS防护和SQL注入预防
- ♿ **无障碍支持** - 符合WCAG可访问性标准
- 🌐 **纯前端** - 无需服务器，完全在浏览器中运行

## 🎯 使用场景

- **SQL开发** - 快速生成IN语句的引号列表
- **数据处理** - 批量处理文本数据格式化
- **开发调试** - 处理日志文件、ID列表等
- **数据分析** - 准备查询条件和参数

## 🚀 快速开始

### 在线使用

访问 [SQL Quote Tool](https://awaken233.github.io/it-tools/) 立即开始使用。

### 本地部署

1. **克隆仓库**
   ```bash
   git clone https://github.com/awaken233/it-tools.git
   cd it-tools
   ```

2. **直接使用**
   
   使用任意HTTP服务器运行：
   ```bash
   # 使用Python内置服务器
   python -m http.server 8000
   
   # 或使用Node.js的http-server
   npx http-server
   
   # 或直接在浏览器中打开index.html
   ```

3. **访问应用**
   
   打开浏览器访问 `http://localhost:8000`

## 📖 使用指南

### 基本使用

1. **输入文本**
   ```
   odb581Wb5zJ2dUqRaS9OpJwps6Rw
   odb581cB0lSbJkWgKAxpXrrnmBO4
   odb581ek021PSWpPuA0GNFlqON0g
   ```

2. **点击"📋 Convert & Copy"按钮**

3. **获得结果并自动复制**
   ```sql
   'odb581Wb5zJ2dUqRaS9OpJwps6Rw','odb581cB0lSbJkWgKAxpXrrnmBO4','odb581ek021PSWpPuA0GNFlqON0g'
   ```
   
   结果会自动复制到剪贴板，无需额外操作！

### 高级功能

- **快捷键** - 使用 `Ctrl+Enter` (Windows/Linux) 或 `Cmd+Enter` (Mac) 快速转换
- **自动统计** - 实时显示行数和字符数统计
- **智能处理** - 自动过滤空行，处理特殊字符
- **错误提示** - 详细的错误信息和使用提示

### SQL使用示例

转换后的结果可直接用于SQL查询：

```sql
-- IN 查询
SELECT * FROM users WHERE user_id IN ('odb581Wb5zJ2dUqRaS9OpJwps6Rw','odb581cB0lSbJkWgKAxpXrrnmBO4','odb581ek021PSWpPuA0GNFlqON0g');

-- EXISTS 查询  
SELECT * FROM orders WHERE customer_id IN ('odb581Wb5zJ2dUqRaS9OpJwps6Rw','odb581cB0lSbJkWgKAxpXrrnmBO4','odb581ek021PSWpPuA0GNFlqON0g');
```

## 🏗️ 技术架构

### 技术栈
- **前端**: HTML5 + CSS3 + Vanilla JavaScript
- **样式**: Material Design 风格
- **部署**: GitHub Pages 静态托管

### 模块结构
```
├── index.html          # 主页面
├── css/
│   ├── styles.css      # 主样式文件  
│   └── responsive.css  # 响应式样式
├── js/
│   ├── text-processor.js  # 文本处理模块
│   ├── ui-controller.js   # UI交互控制  
│   └── app.js            # 应用主控制器
└── README.md
```

### 核心特性

- **模块化设计** - 清晰的职责分离
- **纯函数实现** - 易于测试和维护
- **错误处理** - 完善的异常处理机制
- **性能优化** - 防抖处理和内存优化
- **安全编码** - XSS防护和输入验证

## 🔧 开发指南

### 本地开发

1. **环境要求**
   - 现代浏览器（Chrome 60+, Firefox 60+, Safari 12+）
   - HTTP服务器（用于本地测试）

2. **开发模式**
   ```bash
   # 启动开发服务器
   python -m http.server 8000
   
   # 打开浏览器控制台查看调试信息
   ```

3. **代码结构**
   - `TextProcessor` - 核心文本处理逻辑
   - `UIController` - 用户界面交互管理
   - `App` - 应用初始化和协调

### 自定义配置

可以通过修改CSS变量来自定义主题：

```css
:root {
  --primary-color: #1976d2;    /* 主色调 */
  --accent-color: #03dac6;     /* 强调色 */
  --background: #fafafa;       /* 背景色 */
  /* 更多变量... */
}
```

## 🧪 测试

### 功能测试

应用内置自检功能，打开浏览器控制台可查看测试结果：

- TextProcessor 核心功能测试
- UI 元素完整性检查  
- 浏览器兼容性检测

### 手动测试

- **基本功能**: 输入 → 转换 → 复制
- **边界条件**: 空输入、特殊字符、大量数据
- **响应式**: 不同设备和屏幕尺寸
- **可访问性**: 键盘导航、屏幕阅读器

## 📱 浏览器支持

| 浏览器 | 版本要求 | 备注 |
|--------|----------|------|
| Chrome | 60+ | 完全支持 |
| Firefox | 60+ | 完全支持 |
| Safari | 12+ | 完全支持 |
| Edge | 79+ | 完全支持 |
| IE | ❌ | 不支持 |

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 开发规范

- 遵循现有代码风格
- 添加适当的注释
- 确保浏览器兼容性
- 测试新功能

## 📝 更新日志

### v1.1.0 (2025-06-19)
- 🚀 **重大改进**: Convert按钮现在自动复制结果到剪贴板
- 🎯 **UI优化**: 移除单独的Copy按钮，简化操作流程
- 📋 **用户体验**: 一键转换并复制，提升效率
- 📄 **许可证**: 添加MIT许可证文件

### v1.0.0 (2025-06-19)
- ✨ 初始版本发布
- 🎨 Material Design UI设计
- 📱 响应式设计支持
- 🔒 安全防护机制
- ♿ 无障碍支持
- 📋 基础复制功能

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE) - 查看详情了解使用条款。

## 🙋‍♂️ 常见问题

### Q: 为什么有些字符显示异常？
A: 工具会自动转义SQL中的特殊字符，这是正常的安全处理。

### Q: 支持处理多大的文本？
A: 建议限制在100KB以内，超过1000行可能影响性能。

### Q: 可以离线使用吗？
A: 是的，下载到本地后可以完全离线使用。

### Q: 如何报告问题？
A: 请在 [GitHub Issues](https://github.com/awaken233/it-tools/issues) 中提交问题。

## 📞 联系方式

- GitHub: [@awaken233](https://github.com/awaken233)
- Issues: [项目Issues](https://github.com/awaken233/it-tools/issues)

---

**Made with ❤️ for SQL developers** 