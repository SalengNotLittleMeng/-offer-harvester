// Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 
// for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）
Object.prototype.my_entries = function(obj) {
    let res = [];
    if (typeof obj === 'object') {

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                //注意in会枚举原型链中的属性，需要用hasOwnProperty验证自身是否拥有该属性
                res.push([key, obj[key]]);
            }
        }
    } else if (obj.length && obj.length != 0) { //注意当obj拥有可遍历属性时，可能会用[下标字符串，obj的该项]来表示
        for (let i = 0; i < obj.length; i++) {
            res.push([i.toString(), obj[i]]);
        }
    }
    return res;
    // 出现了其他不合法的类型时返回res
}

// Object.fromEntries() 方法把键值对列表转换为一个对象。
Object.prototype.my_fromEntries = function(arr) {
    if (arr == null || typeof arr[Symbol.iterator] !== 'function') { //arr 的条件：可迭代对象
        //检验可迭代属性：检查对象下面Symbol.iterator是不是function
        throw TypeError(arr + "not a iterable value");
    }
    let res = {};
    for (let i = 0; i < arr.length; i++) {
        const [key, val] = arr[i]; //注意获取值的方式
        res[key] = val;
    }
    return res;
}
let obj = {
        name: "xiaom",
        age: "[1, 2, 3, 4]",
        scool: "linyi",
    }
    // console.log(Object.my_entries(obj))
    // console.log(Object.entries(obj.age))
const obj1 = [
    [1, 2],
    [2, 3],
    [3, 4]
]
console.log(Object.fromEntries(obj1))