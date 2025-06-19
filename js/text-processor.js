/**
 * TextProcessor - SQL Quote Tool核心文本处理模块
 * 负责文本转换、验证和统计功能
 * 
 * @author LD (首席开发)
 * @created 2025-06-19
 * @version 1.0.0
 */
class TextProcessor {
    
    /**
     * 将多行文本转换为SQL引号格式
     * @param {string} inputText - 输入的多行文本
     * @returns {Object} 转换结果对象 {success: boolean, result: string, error?: string, stats: Object}
     */
    static convertToSqlQuotes(inputText) {
        try {
            // 输入验证
            const validation = this.validateInput(inputText);
            if (!validation.isValid) {
                return {
                    success: false,
                    result: '',
                    error: validation.message,
                    stats: this.getStats('')
                };
            }

            // 处理文本转换
            const lines = inputText
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0); // 过滤空行

            if (lines.length === 0) {
                return {
                    success: false,
                    result: '',
                    error: '没有有效的文本行',
                    stats: this.getStats('')
                };
            }

            // 转换为SQL引号格式
            const quotedLines = lines.map(line => {
                // 转义单引号 (SQL注入防护)
                const escapedLine = line.replace(/'/g, "''");
                return `'${escapedLine}'`;
            });

            const result = quotedLines.join(',');

            return {
                success: true,
                result: result,
                stats: this.getStats(inputText)
            };

        } catch (error) {
            return {
                success: false,
                result: '',
                error: `处理错误: ${error.message}`,
                stats: this.getStats('')
            };
        }
    }

    /**
     * 验证输入文本
     * @param {string} text - 待验证的文本
     * @returns {Object} 验证结果 {isValid: boolean, message?: string}
     */
    static validateInput(text) {
        // 检查输入类型
        if (typeof text !== 'string') {
            return {
                isValid: false,
                message: '输入必须是文本格式'
            };
        }

        // 检查空输入
        if (!text || text.trim().length === 0) {
            return {
                isValid: false,
                message: '请输入要转换的文本'
            };
        }

        // 检查文本长度限制 (性能考虑)
        const MAX_LENGTH = 100000; // 100KB
        if (text.length > MAX_LENGTH) {
            return {
                isValid: false,
                message: `文本过长，请限制在${MAX_LENGTH}字符以内`
            };
        }

        // 检查行数限制
        const lines = text.split('\n');
        const MAX_LINES = 1000;
        if (lines.length > MAX_LINES) {
            return {
                isValid: false,
                message: `行数过多，请限制在${MAX_LINES}行以内`
            };
        }

        return {
            isValid: true
        };
    }

    /**
     * 获取文本统计信息
     * @param {string} text - 文本内容
     * @returns {Object} 统计信息对象
     */
    static getStats(text) {
        if (!text || typeof text !== 'string') {
            return {
                totalLines: 0,
                validLines: 0,
                totalCharacters: 0,
                emptyLines: 0
            };
        }

        const lines = text.split('\n');
        const validLines = lines.filter(line => line.trim().length > 0);
        const emptyLines = lines.length - validLines.length;

        return {
            totalLines: lines.length,
            validLines: validLines.length,
            totalCharacters: text.length,
            emptyLines: emptyLines
        };
    }

    /**
     * HTML转义函数 (XSS防护)
     * @param {string} unsafe - 不安全的字符串
     * @returns {string} 转义后的安全字符串
     */
    static escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') {
            return '';
        }
        
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /**
     * 格式化统计信息显示
     * @param {Object} stats - 统计信息对象
     * @returns {string} 格式化的统计信息字符串
     */
    static formatStats(stats) {
        if (!stats) {
            return 'Lines: 0 | Characters: 0';
        }

        let result = `Lines: ${stats.validLines}`;
        
        if (stats.emptyLines > 0) {
            result += ` (+${stats.emptyLines} empty)`;
        }
        
        result += ` | Characters: ${stats.totalCharacters}`;

        return result;
    }

    /**
     * 检查浏览器剪贴板API支持
     * @returns {boolean} 是否支持剪贴板API
     */
    static isClipboardSupported() {
        return navigator && navigator.clipboard && 
               typeof navigator.clipboard.writeText === 'function';
    }
}

// 导出模块 (如果在模块环境中)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TextProcessor;
} 