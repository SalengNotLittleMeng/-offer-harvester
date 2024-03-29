const arr = [1, 1,[2, [3, [4, [5, [6, [7]]]]]]]
const res = arr.flat(Infinity);
// console.log(res)

const flatten=function(arr){
   return arr.reduce((pre,cur)=>{
        if(Array.isArray(cur)){
            return [...pre].concat(flatten(cur))
        }
        return [...pre,cur]
    },[])
}
res2 = flatten(arr);
console.log(res2)
Array.prototype.my_flat = function() {
    let arr = this;
    while (arr.some((item) => { return Array.isArray(item) })) {
        console.log(...arr)
            //此处利用了concat的特性，如果此参数中有数组，那么concat会将数组中的每个元素连接进去
            //可以理解为concat可以拆解一次括号
        arr = [].concat(...arr)
    }
    return arr;
}
// console.log(arr.my_flat())
let ar = [
    [1, 2],
    [1, 2]
]
// console.log([].concat(...ar))

function getFlatten(array){
    let res=[]
    while(array.some(item=>Array.isArray(item))){
        array=res.concat(...array)
    }
    return array
}
// console.log(getFlatten(arr))