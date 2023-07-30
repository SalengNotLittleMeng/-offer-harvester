Array.prototype.myfilter = function(callback, thisArg = this) {
    if (typeof callback != 'function') {
        throw new TypeError(callback + "is not a function");
    }
    if (this == undefined) {
        throw new TypeError("this is null or not undefined");
    }
    let res = [];
    const o = Object(this)
        // const o = Array.from(this);
    const len = o.length;
    for (let i = 0; i < len; i++) {
        if (i in o) { //兼容对象
            if (callback.call(thisArg, o[i], i, o)) {
                res.push(o[i]);
            }
        }
    }
    return res;
}
const arr = [1, 1, 1, 2, 2, 2, 1, 1, 3, 3, 3];
// let ar = arr.myfilter((item, index) => {
//     return item == 1
// })
const arrr = new Set(arr);
console.log(Array.from(arrr).length)
let ar = [];
ar = Array.prototype.filter.call(arrr, (item, index) => {
    return item == 1;
})
console.log(ar)
const Arr = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 }
]
let Arrlist = Arr.myfilter((item, index) => {
        return item.id > 2;
    })
    // console.log(Arrlist)
    // 改写fliter函数让它可以接受一个参数序列
Array.prototype.mefilter = function(callback, thisArg = this) {
    let _this = Array.from(thisArg);
    return _this.filter(callback, _this)
}
console.log(Array.prototype.mefilter.call(arrr, (item, index) => {
    return item == 1
}))