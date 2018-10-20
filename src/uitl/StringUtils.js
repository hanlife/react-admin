
class StringUtilsClass {
    constructor(str) {
        this.string = str;
    }

    /**
     * 校验字串是否为空
     * @returns {boolean}
     */
    isEmpty() {
        return this.string === null || this.string === undefined || (this.string + '').length === 0;
    }

    /**
     * 校验字串是否不为空
     * @returns {boolean}
     */
    isNotEmpty() {
        return !this.isEmpty();
    }

    /**
     * 从文件路径中获取文件名
     * @returns {string}
     */
    getFileNameByFilePath() {
        if (!this.string) {
            return '';
        }
        return this.string.replace(new RegExp('^[\\s\\S]+\\/([^\\?]+)(\\?[^\\?]+)?$'), '$1');
    }

    /**
     * 格式化空字符
     * @returns {string}
     */
    formartEmpty() {
        return this.isNotEmpty() ? this.string : '';
    }

    /**
     * 格式化秒
     * @returns {string}
     */
    formatSeconds() {
        let s = parseInt(this.string);              // 秒数
        let hour = null;                            // 时
        let minute = null;                          // 分
        let seconds = s % 60 > 9 ? s % 60 : '0' + s % 60;   // 秒
        if (s >= 60) {
            let m = Math.floor(s / 60);
            minute = m % 60 > 9 ? m % 60 : '0' + m % 60;
        }
        if (s >= 3600) {
            hour = Math.floor(s / 3600);
        }

        if (s < 60) return '00:' + seconds;

        if (s < 3600) return minute + ':' + seconds;

        return hour + ':' + minute + ':' + seconds;
    };

    // 获取格式化时间
    getFormatDate() {
        let date = this.string;
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }
}

export default function (str) {
    return new StringUtilsClass(str);
}