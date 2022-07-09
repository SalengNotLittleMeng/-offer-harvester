Array.prototype.myMap = function(callback, thisArg = this) {
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
            res[i] = callback.call(thisArg, o[i], i, o)
        }
    }
    return res;
}
const arr = [{ id: 1 }, { id: 1 }, { id: 1 }];
const Arr = [{ id: 1 }, { id: 2 }, { id: 3 }]
    // let ar = arr.myMap((item, index) => {
    //     return item = item * 2;
    // }, Arr)
let ar = arr.myMap((item, index) => {
    return item = item.id * 2;
})
console.log(ar)