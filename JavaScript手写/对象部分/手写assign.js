// Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
Object.my_assign = function(target, ...args) {
    if (target == undefined || target == null) {
        throw TypeError(target + "is not a object");
    }
    target = Object(target) //保证target是一个对象
    for (item of args) { //获取参数列表中的所有对象
        for (val in item) { //获取这个对象的所有属性
            item.hasOwnProperty(val) && (target[val] = item[val])
                //如果这个属性是这个对象本身的，就将它添加到target对象上
        }
    }
    return target
}
let a = { a: 2, b: 5 }
let b = { name: 123, age: 12 }
let c = { hell: 'l', lo: 'o' }
console.log(Object.my_assign(a, b, c))
console.log(a)
    // { a: 2, b: 5, name: 123, age: 12, hell: 'l', lo: 'o' }
    // { a: 2, b: 5, name: 123, age: 12, hell: 'l', lo: 'o' }