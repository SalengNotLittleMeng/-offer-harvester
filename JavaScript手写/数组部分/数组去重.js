//利用Set
const arr = [2, 2, 3, 3, 4, 4, 4, 2, 5, 5, 5, ]
let res = new Set(arr); //Set(4) { 2, 3, 4, 5 }
//Set对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set中的元素只会出现一次，即 Set 中的元素是唯一的。
res = Array.from(res)
console.log(res)

//利用indexOf(返回数组参数在数组中的下标，没有则返回-1)
let con = [];
for (let i = 0; i < arr.length; i++) {
    if (con.indexOf(arr[i]) == -1) {
        con.push(arr[i])
    }
}
console.log(con)

//利用include（返回布尔值，表示数组中是否存在参数）
let con1 = [];
for (let i = 1; i < arr.length; i++) {
    if (!con1.includes(arr[i]))
        con1.push(arr[i])
}
console.log(con1)

//利用fliter（按条件过滤）
//原理是indexOf如果数组中有多个重复对象，只会返回第一个的下标
//后面的元素就会因为不符合条件而被过滤
let con2 = [];
con2 = arr.filter((item, index) => {
    return arr.indexOf(item) == index
})
console.log(con2)
    //利用Map
let map = new Map();
let con3 = [];
for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
        map.set(arr[i]);
        con3.push(arr[i])
    }
}
console.log(con3)
let list=[1,1,1,1,2,3,4,5,5]
list=list.filter((item,index,array)=>{
    return array.indexOf(item)==index
})
console.log(list)