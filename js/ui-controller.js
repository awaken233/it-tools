/**
 * UIController - UI交互控制器
 * 负责处理用户界面交互、事件绑定和UI状态管理
 * 
 * @author LD (首席开发)
 * @created 2025-06-19
 * @version 1.0.0
 */
class UIController {
    
    /**
     * 初始化UI控制器
     * 绑定所有事件监听器
     */
    static init() {
        // 获取DOM元素
        this.elements = this.getElements();
        
        // 绑定事件监听器
        this.bindEvents();
        
        // 初始化UI状态
        this.initializeUI();
        
        console.log('UIController initialized successfully');
    }

    /**
     * 获取所有需要的DOM元素
     * @returns {Object} DOM元素对象
     */
    static getElements() {
        return {
            inputText: document.getElementById('input-text'),
            outputText: document.getElementById('output-text'),
            convertBtn: document.getElementById('convert-btn'),
            plainJoinBtn: document.getElementById('plain-join-btn'),
            clearBtn: document.getElementById('clear-btn'),
            inputStats: document.getElementById('input-stats'),
            notification: document.getElementById('notification')
        };
    }

    /**
     * 绑定所有事件监听器
     */
    static bindEvents() {
                // 转换按钮点击事件
        this.elements.convertBtn.addEventListener('click', () => {
            this.handleConvert();
        });
        
        // 纯文本合并按钮点击事件
        this.elements.plainJoinBtn.addEventListener('click', () => {
            this.handlePlainJoin();
        });
        
        // 清空按钮点击事件
        this.elements.clearBtn.addEventListener('click', () => {
            this.handleClear();
        });

        // 移除复制按钮相关事件绑定

        // 输入框内容变化事件 (防抖处理)
        let inputTimer;
        this.elements.inputText.addEventListener('input', () => {
            clearTimeout(inputTimer);
            inputTimer = setTimeout(() => {
                this.handleInputChange();
            }, 300); // 300ms防抖
        });

        // 输入框键盘事件 (支持快捷键)
        this.elements.inputText.addEventListener('keydown', (e) => {
            // Ctrl+Enter 快速转换
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.handleConvert();
            }
        });

        // 输出框点击事件 (全选)
        this.elements.outputText.addEventListener('click', () => {
            if (this.elements.outputText.value.trim()) {
                this.elements.outputText.select();
            }
        });
    }

    /**
     * 初始化UI状态
     */
    static initializeUI() {
        // 设置初始统计信息
        this.updateStats('');
        
        // 聚焦到输入框
        this.elements.inputText.focus();
    }

    /**
     * 处理转换操作
     */
    static async handleConvert() {
        const inputText = this.elements.inputText.value;
        
        // 显示转换中状态
        this.setConvertButtonState(true);
        
        try {
            // 调用文本处理器
            const result = TextProcessor.convertToSqlQuotes(inputText);
            
            if (result.success) {
                // 显示转换结果
                this.elements.outputText.value = result.result;
                
                // 自动复制到剪贴板
                await this.copyToClipboard(result.result);
                
                // 更新统计信息
                this.updateStats(inputText);
                
            } else {
                // 显示错误信息
                this.elements.outputText.value = '';
                this.showNotification(result.error, 'error');
            }
            
        } catch (error) {
            // 处理未预期的错误
            this.elements.outputText.value = '';
            this.showNotification('转换失败：' + error.message, 'error');
            console.error('Conversion error:', error);
        }
        
        // 恢复按钮状态
        this.setConvertButtonState(false);
    }

    /**
     * 处理纯文本合并操作
     */
    static async handlePlainJoin() {
        const inputText = this.elements.inputText.value;
        
        // 显示转换中状态
        this.setPlainJoinButtonState(true);
        
        try {
            // 调用文本处理器的纯文本合并方法
            const result = TextProcessor.convertToPlainCommas(inputText);
            
            if (result.success) {
                // 显示转换结果
                this.elements.outputText.value = result.result;
                
                // 自动复制到剪贴板
                await this.copyToClipboard(result.result);
                
                // 更新统计信息
                this.updateStats(inputText);
                
            } else {
                // 显示错误信息
                this.elements.outputText.value = '';
                this.showNotification(result.error, 'error');
            }
            
        } catch (error) {
            // 处理未预期的错误
            this.elements.outputText.value = '';
            this.showNotification('合并失败：' + error.message, 'error');
            console.error('Plain join error:', error);
        }
        
        // 恢复按钮状态
        this.setPlainJoinButtonState(false);
    }

    /**
     * 处理清空操作
     */
    static handleClear() {
        // 显示确认对话框
        if (this.elements.inputText.value.trim() || this.elements.outputText.value.trim()) {
            if (!confirm('确定要清空所有内容吗？')) {
                return;
            }
        }
        
        // 清空输入和输出
        this.elements.inputText.value = '';
        this.elements.outputText.value = '';
        
        // 更新UI状态
        this.updateStats('');
        
        // 聚焦到输入框
        this.elements.inputText.focus();
        
        this.showNotification('已清空所有内容', 'info');
    }



    /**
     * 降级复制方案
     * @param {string} text - 要复制的文本
     */
    static fallbackCopy(text) {
        try {
            // 创建临时textarea元素
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            
            // 选择并复制
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            this.showNotification('转换成功并已复制到剪贴板！', 'success');
            
        } catch (error) {
            this.showNotification('转换成功，但复制失败，请手动复制', 'warning');
            // 全选输出文本作为备选方案
            this.elements.outputText.select();
        }
    }

    /**
     * 处理输入内容变化
     */
    static handleInputChange() {
        const inputText = this.elements.inputText.value;
        this.updateStats(inputText);
        
        // 如果输入为空，清空输出
        if (!inputText.trim()) {
            this.elements.outputText.value = '';
        }
    }

    /**
     * 更新统计信息显示
     * @param {string} text - 文本内容
     */
    static updateStats(text) {
        const stats = TextProcessor.getStats(text);
        const statsText = TextProcessor.formatStats(stats);
        this.elements.inputStats.textContent = statsText;
    }

    /**
     * 复制文本到剪贴板的通用方法
     * @param {string} text - 要复制的文本
     */
    static async copyToClipboard(text) {
        if (!text.trim()) {
            this.showNotification('没有内容可复制', 'warning');
            return;
        }

        try {
            // 检查剪贴板API支持
            if (TextProcessor.isClipboardSupported()) {
                // 使用现代剪贴板API
                await navigator.clipboard.writeText(text);
                this.showNotification('转换成功并已复制到剪贴板！', 'success');
            } else {
                // 降级方案：使用传统方法
                this.fallbackCopy(text);
            }
            
        } catch (error) {
            // 如果现代API失败，使用降级方案
            this.fallbackCopy(text);
        }
    }

    /**
     * 设置转换按钮状态
     * @param {boolean} isLoading - 是否正在加载
     */
    static setConvertButtonState(isLoading) {
        this.elements.convertBtn.disabled = isLoading;
        this.elements.convertBtn.textContent = isLoading ? '转换中...' : '📋 SQL Quote & Copy';
        this.elements.convertBtn.classList.toggle('loading', isLoading);
    }

    /**
     * 设置纯文本合并按钮状态
     * @param {boolean} isLoading - 是否正在加载
     */
    static setPlainJoinButtonState(isLoading) {
        this.elements.plainJoinBtn.disabled = isLoading;
        this.elements.plainJoinBtn.textContent = isLoading ? '合并中...' : '📝 Plain Join & Copy';
        this.elements.plainJoinBtn.classList.toggle('loading', isLoading);
    }

    /**
     * 显示通知消息
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型 ('success', 'error', 'warning', 'info')
     */
    static showNotification(message, type = 'info') {
        const notification = this.elements.notification;
        const notificationText = document.getElementById('notification-text');
        const iconContainer = notification.querySelector('.w-8');
        
        // 设置消息内容
        if (notificationText) {
            notificationText.textContent = message;
        } else {
            notification.textContent = message;
        }
        
        // 设置图标和颜色
        const typeConfig = {
            success: {
                icon: '✅',
                bgColor: 'bg-green-100',
                textColor: 'text-green-800',
                iconBg: 'bg-green-500'
            },
            error: {
                icon: '❌',
                bgColor: 'bg-red-100',
                textColor: 'text-red-800',
                iconBg: 'bg-red-500'
            },
            warning: {
                icon: '⚠️',
                bgColor: 'bg-yellow-100',
                textColor: 'text-yellow-800',
                iconBg: 'bg-yellow-500'
            },
            info: {
                icon: 'ℹ️',
                bgColor: 'bg-blue-100',
                textColor: 'text-blue-800',
                iconBg: 'bg-blue-500'
            }
        };
        
        const config = typeConfig[type] || typeConfig.info;
        
        // 更新图标
        if (iconContainer) {
            iconContainer.className = `w-8 h-8 rounded-full flex items-center justify-center ${config.iconBg}`;
            iconContainer.textContent = config.icon;
        }
        
        // 更新样式
        const notificationCard = notification.querySelector('.bg-white');
        if (notificationCard) {
            notificationCard.className = `${config.bgColor} rounded-xl shadow-2xl border border-gray-200 p-4 flex items-center space-x-3`;
        }
        
        if (notificationText) {
            notificationText.className = `text-sm font-medium ${config.textColor}`;
        }
        
        // 显示通知（移除 translate-x-full 和 opacity-0）
        notification.className = notification.className.replace('translate-x-full opacity-0', 'translate-x-0 opacity-100');
        
        // 自动隐藏通知
        clearTimeout(this.notificationTimer);
        this.notificationTimer = setTimeout(() => {
            notification.className = notification.className.replace('translate-x-0 opacity-100', 'translate-x-full opacity-0');
        }, 3000);
    }
} 