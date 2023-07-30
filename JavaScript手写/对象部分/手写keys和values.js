// Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，
// 数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
Object.prototype.my_keys = function(obj) {
    const res = [];
    for (let key in obj) {
        obj.hasOwnProperty(key) && res.push(key);
        // 注意要验证只有参数本身存在的属性，否则会将这个对象原型链上的所有属性也添加进去
    }
    return res;
}

let obj = {
    name: "hahah",
    age: 12,
    scol: "linyiz"
}
let arr = '[1, 2, 3, 4]'
    // console.log(Object.keys(arr))
    // 如果没有hasOwnProperty,会打印出[ 'name', 'age', 'scol', 'my_keys' ]
    //如果参数是数组或字符串，会打印所有下标

// Object.values()方法返回一个给定对象自身的所有可枚举属性值的数组，
// 值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。
Object.prototype.my_values = function(obj) {
    let res = [];
    for (let key in obj) {
        obj.hasOwnProperty(key) && res.push(obj[key]);
    }
    return res;
}
console.log(Object.values(obj))