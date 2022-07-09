Array.prototype.myforEach = function(callback, thisArg = this) { //将函数挂载到Array的原型链上
    if (typeof callback != 'function') { //首先检测回调函数的类型，如果不是函数抛出异常
        throw new TypeError(callback + "is not a function");
    }
    if (this == undefined) { //如果this没有指向任何对象，抛出异常
        throw new TypeError("this is null or not undefined");
    }
    const o = Object(this) //保证this是一个对象，拥有可遍历的属性,
        //这里的this可以是任何对象，String，Array,Object 都可以
        //这里其实也可以对this提前处理成数组，但考虑到后期可能会用参数绑定其他的this
        //因此考虑到可扩展性可以转化为拥有可以遍历的Object
        // const o = Array.from(this);
    const len = o.length;
    let k = 0;
    while (k < len) { //循环遍历，用回调函数处理数组中的每一项
        if (k in o) { //确保k是一个可以遍历到的对象或者没有出现下标越界的情况
            callback.call(thisArg, o[k], k, o) //绑定this并指定回调函数
                //注意foreach是没有返回值的，每一项会作为参数执行回调函数
        }
        k++;
    }
}
const arr = [{ id: 1 }, { id: 1 }, { id: 1 }];
const Arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
arr.forEach(function(item, index) {
        console.log(this)
        item.id = 9;
    })
    // [ { id: 1 }, { id: 1 }, { id: 1 } ]
    // [ { id: 9 }, { id: 1 }, { id: 1 } ]
    // [ { id: 9 }, { id: 9 }, { id: 1 } ]
    // [ { id: 9 }, { id: 9 }, { id: 9 } ]
    // arr.myforEach(function(item, index) {
    //         console.log(this)
    //         item.id = 8;
    //     }, Arr)
    //  [ { id: 1 }, { id: 2 }, { id: 3 } ]
    // [ { id: 1 }, { id: 2 }, { id: 3 } ]
    // [ { id: 1 }, { id: 2 }, { id: 3 } ]
    // [ { id: 9 }, { id: 9 }, { id: 9 } ]
    // console.log(arr)