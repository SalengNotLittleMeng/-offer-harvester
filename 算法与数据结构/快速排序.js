let arr=[2,3,5,1,4,8,7,9]

function quickSort(arr){
    if(arr.length<=1){
        return arr
    }
    let pivot=arr[0]
    let left=[]
    let right=[]
    arr.shift()
    arr.forEach(item=> {
        item<pivot?left.push(item):right.push(item)
    });
    return quickSort(left).concat([pivot],quickSort(right))
}
console.log(quickSort(arr))