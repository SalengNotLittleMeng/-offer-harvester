// fill 方法接受三个参数 value, start 以及 end. start 和 end 参数是可选的, 其默认值分别为 0 和 this 对象的 length 属性值。

// 如果 start 是个负数, 则开始索引会被自动计算成为 length+start, 其中 length 是 this 对象的 length 属性值。如果 end 是个负数, 则结束索引会被自动计算成为 length+end。

// fill 方法故意被设计成通用方法, 该方法不要求 this 是数组对象。

// fill 方法是个可变方法, 它会改变调用它的 this 对象本身, 然后返回它, 而并不是返回一个副本。

// 当一个对象被传递给 fill方法的时候, 填充数组的是这个对象的引用。
Array.prototype.my_fill = function(value, start = 0, end) {
    if (this == undefined) {
        throw TypeError("this is null or undefined");
    }
    end = end || this.length;
    if (start < 0) { start = this.length + start }
    //注意fill不会改变数组的长度
    if (end > this.length) { end = this.length }
    if (end < 0) { end = this.length + end }
    for (let i = start; i < end; i++) {
        this[i] = value;
    }
    return this //直接返回，会改变对象
}
let arr = ['a', 'a', 'a'];
console.log(arr.my_fill([1, 2, 3], 4))
    // join() 方法将数组作为字符串返回。

// 元素将由指定的分隔符分隔。默认分隔符是逗号 (,)
Array.prototype.my_join = function(value = ',') {
    if (this == undefined) {
        throw TypeError("this is null or undefined");
    }
    let str = "";
    for (let i = 0; i < this.length; i++) {
        str += this[i];
        if (i != this.length - 1) { str += value; }
        //更优质的版本：使用模板字符串
        // str = i === 0 ? `${str}${this[i]}` : `${str}${value}${this[i]}`
    }
    return str;
}
console.log(arr.my_join(""))