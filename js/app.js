/**
 * App - 应用主控制器
 * 负责应用初始化和协调各模块
 * 
 * @author LD (首席开发)
 * @created 2025-06-19
 * @version 1.0.0
 */
class App {
    
    /**
     * 应用版本信息
     */
    static version = '1.0.0';
    
    /**
     * 初始化应用
     */
    static init() {
        console.log(`SQL Quote Tool v${this.version} - Initializing...`);
        
        try {
            // 检查必要的依赖
            this.checkDependencies();
            
            // 初始化UI控制器
            UIController.init();
            
            // 设置全局错误处理
            this.setupGlobalErrorHandling();
            
            // 显示应用启动成功消息
            console.log('✅ SQL Quote Tool initialized successfully!');
            
            // 执行自检
            this.performSelfCheck();
            
        } catch (error) {
            console.error('❌ Failed to initialize SQL Quote Tool:', error);
            this.handleInitializationError(error);
        }
    }
    
    /**
     * 检查必要的依赖
     */
    static checkDependencies() {
        // 检查TextProcessor是否可用
        if (typeof TextProcessor === 'undefined') {
            throw new Error('TextProcessor module is not loaded');
        }
        
        // 检查UIController是否可用
        if (typeof UIController === 'undefined') {
            throw new Error('UIController module is not loaded');
        }
        
        console.log('✅ All dependencies loaded successfully');
    }
    
    /**
     * 设置全局错误处理
     */
    static setupGlobalErrorHandling() {
        // 处理未捕获的错误
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.handleGlobalError(event.error);
        });
        
        // 处理未捕获的Promise rejection
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.handleGlobalError(event.reason);
        });
    }
    
    /**
     * 处理全局错误
     * @param {Error} error - 错误对象
     */
    static handleGlobalError(error) {
        // 在生产环境中，可以将错误发送到日志服务
        // 这里仅在控制台显示
        const errorMessage = error.message || 'Unknown error occurred';
        console.error('Application error:', errorMessage);
        
        // 尝试显示用户友好的错误消息
        try {
            if (typeof UIController !== 'undefined' && UIController.showNotification) {
                UIController.showNotification('应用程序遇到错误，请刷新页面重试', 'error');
            }
        } catch (notificationError) {
            // 如果连通知都无法显示，使用alert作为最后手段
            alert('应用程序遇到错误，请刷新页面重试');
        }
    }
    
    /**
     * 处理初始化错误
     * @param {Error} error - 初始化错误
     */
    static handleInitializationError(error) {
        const errorMessage = `应用初始化失败: ${error.message}`;
        
        // 显示错误消息
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #f44336;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            font-family: system-ui, -apple-system, sans-serif;
            z-index: 10000;
            max-width: 90%;
            text-align: center;
        `;
        errorDiv.textContent = errorMessage;
        document.body.appendChild(errorDiv);
        
        // 5秒后移除错误消息
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
    
    /**
     * 执行应用自检
     */
    static performSelfCheck() {
        console.log('🔍 Performing self-check...');
        
        const checks = [
            this.checkTextProcessorFunctionality(),
            this.checkUIElements(),
            this.checkBrowserCompatibility()
        ];
        
        const allPassed = checks.every(check => check.passed);
        
        if (allPassed) {
            console.log('✅ All self-checks passed');
        } else {
            console.warn('⚠️  Some self-checks failed');
            checks.forEach(check => {
                if (!check.passed) {
                    console.warn(`❌ ${check.name}: ${check.message}`);
                }
            });
        }
    }
    
    /**
     * 检查TextProcessor功能
     * @returns {Object} 检查结果
     */
    static checkTextProcessorFunctionality() {
        try {
            const testInput = 'test1\ntest2';
            const result = TextProcessor.convertToSqlQuotes(testInput);
            
            if (result.success && result.result === "'test1','test2'") {
                return { passed: true, name: 'TextProcessor' };
            } else {
                return { 
                    passed: false, 
                    name: 'TextProcessor', 
                    message: 'Conversion test failed' 
                };
            }
        } catch (error) {
            return { 
                passed: false, 
                name: 'TextProcessor', 
                message: error.message 
            };
        }
    }
    
    /**
     * 检查UI元素
     * @returns {Object} 检查结果
     */
    static checkUIElements() {
        const requiredElements = [
            'input-text', 'output-text', 'convert-btn', 
            'clear-btn', 'copy-btn', 'input-stats', 'notification'
        ];
        
        const missingElements = requiredElements.filter(id => !document.getElementById(id));
        
        if (missingElements.length === 0) {
            return { passed: true, name: 'UI Elements' };
        } else {
            return { 
                passed: false, 
                name: 'UI Elements', 
                message: `Missing elements: ${missingElements.join(', ')}` 
            };
        }
    }
    
    /**
     * 检查浏览器兼容性
     * @returns {Object} 检查结果
     */
    static checkBrowserCompatibility() {
        const warnings = [];
        
        // 检查Clipboard API支持
        if (!TextProcessor.isClipboardSupported()) {
            warnings.push('Modern Clipboard API not supported');
        }
        
        // 检查ES6支持
        try {
            eval('const test = () => {};');
        } catch (error) {
            warnings.push('ES6 arrow functions not supported');
        }
        
        if (warnings.length === 0) {
            return { passed: true, name: 'Browser Compatibility' };
        } else {
            return { 
                passed: false, 
                name: 'Browser Compatibility', 
                message: warnings.join(', ') 
            };
        }
    }
    
    /**
     * 获取应用信息
     * @returns {Object} 应用信息对象
     */
    static getAppInfo() {
        return {
            name: 'SQL Quote Tool',
            version: this.version,
            description: 'Convert text lines to SQL quoted format',
            author: 'LD (首席开发)',
            created: '2025-06-19'
        };
    }
}

// DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// 导出模块 (如果在模块环境中)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
} 