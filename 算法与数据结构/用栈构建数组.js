var buildArray = function(target, n) {
  let list=[]
  let stack=[target[0]]
  let curTop=target[0]
  for(let i=0;i<=n;i++){
      if(i+1>target[target.length-1]){
          break
      }
      if(stack.length!=0 &&curTop>i+1){
        list.push('Push')
        list.push('Pop')
      }else{
          list.push('Push')
          stack.push(curTop)
        curTop=target[i+1]
      }
  }
   return list
};

/**
 * @param {number[]} target
 * @param {number} n
 * @return {string[]}
 */
var buildArray = function(target, n) {
  let list=[]
  let index=0
  for(let i=0;i<=n;i++){
      if(i+1>target[target.length-1]){
          break
      }
    list.push('Push')
    if(target[index]>i+1){
        list.push('Pop')
        continue
    }
    index++
  }
   return list
};