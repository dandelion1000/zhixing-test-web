/**
 * 倒计时方法
 * @param seconds
 * @param option {Object}
 * @param option.onProgress {Function}
 * @param option.onEnd {Function} 倒计时结束回调
 * @param option.interval {Number}倒时计刷新频率, 单位ms, default: 1000
 * @returns {destroy} 销毁倒计时
 */
export const countdown = (seconds, option) => {
    let sTime = +new Date();
    let timer = setInterval(function () {
        let s = seconds - Math.round((+new Date() - sTime) / 1e3);
        if (s < 0) {
            s = 0;
            option.onEnd && option.onEnd(s);
            clearInterval(timer);
        } else {
            option.onProgress && option.onProgress(s);
        }
    }, option.interval || 1000);

    return function destroy() {
        clearInterval(timer);
    };
};

export const getQueryStringByName  =(name) => {
    const result = location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
    if (result === null || result.length < 1) {
        return '';
    }
    return result[1];
};
