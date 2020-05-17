/**
 * @author xianxian
 * @date 2019/7/17
 */
import Vue from 'vue';

/**
 * @param {String} str 传入原始数据值
 * @param {RegExp} reg 正则匹配出需要改变值的规则
 * @returns {String} 返回格式化的数据值
 */

/**
 * @description 寻找到.号之前以金额3位数倍数结尾的位置, .号之后的 ? 代表是否有小数情况
 */
export const formatMoney = (str) => {
    if (isEmpty(str)) {
        return;
    }
    if (typeof (str) !== 'string') {
        str = str.toString();
    }
    let reg = /(\d{1,3})(?=(\d{3})+(\.\d*)?$)/g;
    let stringf = str.replace(reg, '$1,');
    return stringf;
};

export const formatDate = (str) => {
    if (isEmpty(str)) {
        return;
    }
    let reg = /(\d{4})(\d{2})(?=\d{2})/g;
    let nstr = str.replace(reg, '$1-$2-');
    return nstr;
};

/**
 * @description 寻找到4位数倍数结尾的位置即可
 */
export const formatCard = (str) => {
    if (isEmpty(str)) {
        return;
    }
    let reg = /(\d{4})(?=(\d{4})+$)/g;
    let cstr = str.replace(reg, '$1 ');
    return cstr;
};

export const formatPhone = (str) => {
    if (isEmpty(str)) {
        return;
    }
    let reg = /(\d{3})(\d{4})(?=\d{4})/;
    return str.replace(reg, '$1****');
};

/**
 * checks if `value` is an empty String or object
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 */
function isEmpty(value) {
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    if (value == null) {
        return true;
    }
    if (typeof value === 'string') {
        return !value.length;
    }
    if (isPrototype(value)) {
        return !Object.keys(value).length;
    }
    for (const key in value) {
        if (hasOwnProperty.call(value, key)) {
            return false;
        }
    }
    return true;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
    const objectProto = Object.prototype;
    const Ctor = value && value.constructor;
    const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto;

    return value === proto;
}
Vue.prototype.$formatMoney = formatMoney;
Vue.prototype.$formatDate = formatDate;
Vue.prototype.$formatCard = formatCard;
Vue.prototype.$formatPhone = formatPhone;
Vue.prototype.$isEmpty = isEmpty;
