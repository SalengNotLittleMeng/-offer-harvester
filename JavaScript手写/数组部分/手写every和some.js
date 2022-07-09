Array.prototype.my_every = function(callback) {
    if (typeof callback != 'function') {
        throw new TypeError(callback + "is not a function");
    }
    if (typeof callback() != 'boolean') {
        return Boolean(callback()); //注意这一步对于回调函数返回值类型发判断
        //没有返回值会返回fasle。本质上是将返回值进行了一个类型转化，没有则为undefined转化为false
    }
    if (this == undefined) {
        throw new TypeError("this is null or not undefined");
    }
    let flag = true;
    for (let i = 0; i < this.length; i++) {
        if (!callback(this[i], i, this)) {
            flag = false;
            break;
        }
    }
    return flag;
}
Array.prototype.my_some = function(callback) {
    if (typeof callback != 'function') {
        throw new TypeError(callback + "is not a function");
    }
    if (typeof callback() != 'boolean') {
        return Boolean(callback()); //注意这一步对于回调函数返回值类型发判断
        //没有返回值会返回fasle。本质上是将返回值进行了一个类型转化，没有则为undefined转化为false
    }
    if (this == undefined) {
        throw new TypeError("this is null or not undefined");
    }
    let flag = false;
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            flag = true;
            break;
        }
    }
    return flag;
}
let arr = [2, 1, 3, 4, 5, 6]
console.log(arr.my_some((item, index) => { return item < 3 }))
    // console.log(arr.my_every((item, index) => { return item < 10 }))