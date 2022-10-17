/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(fruits) {
 let stack=[]
 let stack2=[]
  let curStack=1
  let max=0
  for(let i=0;i<fruits.length;i++){
      if(stack.length==0||fruits[i]==stack[stack.length-1]){
          stack.push(fruits[i])
          curStack=1
      }else if(stack2.length==0||fruits[i]==stack2[stack2.length-1]){
          stack2.push(fruits[i])
          curStack=2
      }else {
          let len=stack2.length+stack.length
          max=Math.max(max,len)
            console.log(stack,stack2)
       if(curStack==2){
           stack=[fruits[i]]
           curStack=1
       }else{
           stack2=[fruits[i]]
           curStack=2
       }
      }
  }
  console.log(stack,stack2)
  let len=stack2.length+stack.length
   max=Math.max(max,len)
    return max
};

/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(fruits) {
 let len=fruits.length
 let left=0
 let max=0
 let map=new Map()
 for(let right=0;right<len;right++){
     map.set(fruits[right],(map.get(fruits[right])||0)+1)
     while(map.size>2){
         map.set(fruits[left],map.get(fruits[left])-1)
         if(map.get(fruits[left])==0){
             map.delete(fruits[left])
         }
         left++
     }
     max=Math.max(max,right-left+1)
 }
 return max
};