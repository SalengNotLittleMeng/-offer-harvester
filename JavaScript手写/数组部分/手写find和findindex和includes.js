// findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1
Array.prototype.my_findIndex = function(callback) {
        if (typeof callback != 'function') {
            throw new TypeError(callback + "is not a function");
        }
        if (typeof callback() != 'boolean') {
            return -1; //注意这一步对于回调函数返回值类型发判断
            //没有返回值会返回-1。本质上是将返回值进行了一个类型转化，没有则为undefined转化为false
        }
        if (this == undefined) {
            throw new TypeError("this is null or not undefined");
        }
        for (let i = 0; i < this.length; i++) {
            if (callback(this[i], i, this)) {
                return i;
            }
        }
        return -1 //当遍历完都没有找到符合条件的item时时return-1
    }
    // find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。

// find() 方法为数组中的每个元素都调用一次函数执行：

// 当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
// 如果没有符合条件的元素返回 undefined
Array.prototype.my_find = function(callback) {
        if (!callback || typeof callback !== 'function') {
            throw new TypeError(callback + "is not a function");
        }
        if (typeof callback() != 'boolean') {
            return undefined;
        }
        if (this == undefined) {
            throw TypeError(this + "is undefined");
        }
        for (let i = 0; i < this.length; i++) {
            if (callback(this[i], i, this)) {
                return this[i];
            }
        }
        return undefined; //没有找到结果则返回undefined
    }
    // includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。
    //要注意includes可以查找NAN
Array.prototype.my_includes = function(value, start = 0) {
    if (typeof value !== 'number') { //value的值不为number时直接return false
        return false
    }

    if (this == undefined) {
        throw TypeError(this + "is undefined");
    }
    if (start < 0) { start = this.length + start }
    //注意start是负值时的情况，从后数start的绝对值位
    const isNAN = Number.isNaN(value);
    console.log(isNAN)
    for (let i = start; i < this.length; i++) {
        //注意对NAN的判断肯出现两个false的情况，因此要确保两个isNAN都是ture才能任务匹配到NAN
        if (this[i] == value || Number.isNaN(this[i]) && isNAN) {
            //注意判断NAN的情况，NAN==NAN返回false，因此只能用Number.isNAN去判断
            console.log(this[i])
            return true;
        }
    }
    return false; //没有找到结果则返回false
}
let arr = [1, 2, 3, 8, 3, 123, 5]
console.log(arr.my_findIndex((item, index) => { return item > 5 }))
console.log(arr.my_find((item, index) => { return item > 15 }))
console.log(arr.my_includes())