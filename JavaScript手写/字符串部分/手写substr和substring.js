// substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
// 如果省略了参数length，则自动截取到字符串的尾部
String.prototype.my_substr = function(start = 0, length = this.length) {
    start = start < 0 ? this.length + start : start;
    if (length < 0) { return ""; }
    length = start + length > this.length ? this.length : start + length;
    let str = "";
    for (let i = start; i < length; i++) {
        str += this[i];
    }
    return str
}

// console.log('123456'.my_substr(-2, 29))

// substring() 方法用于提取字符串中介于两个指定下标之间的字符。
// substring() 方法返回的子串包括 start 处的字符，但不包括 stop 处的字符。

// 如果参数 start 与 stop 相等，那么该方法返回的就是一个空串（即长度为 0 的字符串）。
// 如果 start 比 stop 大，那么该方法在提取子串之前会先交换这两个参数。
// 与 slice() 和 substr() 方法不同的是，substring() 不接受负的参数。
String.prototype.my_substring = function(start, stop = this.length) {
    // 处理负数问题
    start = start < 0 ? 0 : start;
    stop = stop < 0 ? 0 : stop;
    start = Math.min(start, stop);
    stop = Math.max(start, stop);
    // if (start >= stop) {
    //     [start, stop] = [stop, start]
    // }
    // 大的在后面，小的在前面
    start = start < this.length ? start : this.length;
    stop = stop < this.length ? stop : this.length;
    let str = ''
    for (let i = start; i < stop; i++) {
        str += this[i];
    }
    return str;
}
console.log("12345678".my_substring(-4, 1))