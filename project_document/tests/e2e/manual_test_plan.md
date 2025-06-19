# SQL Quote Tool - E2E测试计划

## 测试环境
- 测试URL: http://localhost:8000
- 浏览器: Chrome/Firefox/Safari
- 屏幕分辨率: 1280x720+

## 核心功能测试用例

### 1. 页面加载测试
**用例ID**: TC001
**测试目标**: 验证页面正常加载
**测试步骤**:
1. 访问 http://localhost:8000
2. 验证页面标题为 "SQL Quote Tool"
3. 验证所有关键元素正确显示：
   - 输入文本区域 (data-testid="input-textarea")
   - 输出文本区域 (data-testid="output-textarea")
   - "SQL Quote & Copy" 按钮 (data-testid="convert-button")
   - "Plain Join & Copy" 按钮 (data-testid="plain-join-button")
   - "Clear All" 按钮 (data-testid="clear-button")

**预期结果**: 页面完全加载，所有元素正确显示

### 2. SQL Quote功能测试
**用例ID**: TC002
**测试目标**: 验证SQL引号格式转换功能
**测试步骤**:
1. 在输入框中输入测试数据：
   ```
   odb581Wb5zJ2dUqRaS9OpJwps6Rw
   odb581cB0lSbJkWgKAxpXrrnmBO4
   odb581ek021PSWpPuA0GNFlqON0g
   ```
2. 点击 "SQL Quote & Copy" 按钮
3. 验证输出框内容

**预期结果**: 
```
'odb581Wb5zJ2dUqRaS9OpJwps6Rw','odb581cB0lSbJkWgKAxpXrrnmBO4','odb581ek021PSWpPuA0GNFlqON0g'
```

### 3. Plain Join功能测试
**用例ID**: TC003
**测试目标**: 验证普通连接功能
**测试步骤**:
1. 在输入框中输入同样的测试数据
2. 点击 "Plain Join & Copy" 按钮
3. 验证输出框内容

**预期结果**: 
```
odb581Wb5zJ2dUqRaS9OpJwps6Rw,odb581cB0lSbJkWgKAxpXrrnmBO4,odb581ek021PSWpPuA0GNFlqON0g
```

### 4. 清空功能测试
**用例ID**: TC004
**测试目标**: 验证清空功能
**测试步骤**:
1. 输入任意文本数据
2. 进行转换操作
3. 点击 "Clear All" 按钮
4. 验证输入框和输出框都被清空

**预期结果**: 输入框和输出框内容为空

### 5. 复制功能测试
**用例ID**: TC005
**测试目标**: 验证自动复制功能
**测试步骤**:
1. 执行SQL Quote转换
2. 验证输出自动复制到剪贴板
3. 在另一个应用中粘贴验证

**预期结果**: 转换后的内容自动复制到剪贴板

### 6. 空输入处理测试
**用例ID**: TC006
**测试目标**: 验证空输入的处理
**测试步骤**:
1. 不输入任何内容
2. 点击转换按钮
3. 验证系统响应

**预期结果**: 系统优雅处理空输入，不出现错误

### 7. 响应式设计测试
**用例ID**: TC007
**测试目标**: 验证移动端适配
**测试步骤**:
1. 调整浏览器窗口至移动端尺寸 (375x667)
2. 验证页面布局自适应
3. 验证所有功能正常工作

**预期结果**: 移动端显示正常，功能可用

## 测试数据

### 标准测试数据
```
odb581Wb5zJ2dUqRaS9OpJwps6Rw
odb581cB0lSbJkWgKAxpXrrnmBO4
odb581ek021PSWpPuA0GNFlqON0g
```

### 边界测试数据
```
单行数据
空行

包含特殊字符的数据'test"data
```

## Playwright自动化测试脚本规划

由于浏览器安装问题，将在解决后创建以下自动化脚本：
- `sql-quote-tool.spec.js` - 主要功能测试
- `responsive-design.spec.js` - 响应式设计测试
- `edge-cases.spec.js` - 边界情况测试 