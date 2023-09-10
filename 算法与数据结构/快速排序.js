let arr=[2,3,5,1,4,8,7,9]

function quickSort(arr){
    if(arr.length<=1){
        return arr
    }
    let base=arr[0]
    let left=[]
    let right=[]
    arr=arr.slice(1)
    for(let i=0;i<arr.length;i++){
        if(arr[i]<base){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return [...quickSort(left),base,...quickSort(right)]
}
console.log(quickSort(arr))


function mergeSort(arr){
    if (arr.length <= 1) {
        return arr;
      }
      
      // 将数组分成两个子数组
      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);
      // 递归地对子数组进行排序
      const sortedLeft = mergeSort(left);
      const sortedRight = mergeSort(right);
      
      // 合并两个有序子数组
      const merged = [];
      let i = 0, j = 0;
      while (i < sortedLeft.length && j < sortedRight.length) {
        if (sortedLeft[i] < sortedRight[j]) {
          merged.push(sortedLeft[i]);
          i++;
        } else {
          merged.push(sortedRight[j]);
          j++;
        }
      }
      return merged.concat(sortedLeft.slice(i)).concat(sortedRight.slice(j));

}
console.log(mergeSort(arr))