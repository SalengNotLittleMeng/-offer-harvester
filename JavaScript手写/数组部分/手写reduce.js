Array.prototype.myReduce = function(callback, initialValue) {
    if (typeof callback != 'function') { //首先检测回调函数的类型，如果不是函数抛出异常
        throw new TypeError(callback + "is not a function");
    }
    if (this == undefined) { //如果this没有指向任何对象，抛出异常
        throw new TypeError("this is null or not undefined");
    }
    const o = Object(this) //保证this是一个对象，拥有可遍历的属性
        // const o = Array.from(this);
    const len = o.length;
    let temp = initialValue;
    let k = 0;
    if (temp === undefined) {
        while (k < len && !(k in o)) {
            //检测k位上是否有值
            k++;
        }
        if (k >= len) {
            throw new TypeError('reduce of empty array with no initial value')
        }
        temp = o[k++]
    }

    for (let i = k++; i < len; i++) {
        if (i in o) {
            temp = callback.call(undefined, temp, o[i], i, o)
        }
    }

    return temp;
}
let arr = [undefined, 1, 2, 3, 4, 5]
let sum = arr.reduce((pre, cur) => {
    return pre + cur;
}, 'sdf')
let num = arr.myReduce((pre, cur) => {
    return pre + cur;
})
console.log(num)