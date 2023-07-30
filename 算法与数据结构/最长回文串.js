/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function(s) {
    let map=new Map()
     for(let i=0;i<s.length;i++){
         map.set(s[i],map.has(s[i])?map.get(s[i])+1:1)
     }
     let double=0
     console.log(map)
    let center = 0
     map.forEach(value=>{
         if(value%2==0){
             double=double+value
         }else{
           if(value>2){
                double=double+value-1
           }
          center = 1
         }
     })
     return double+center
}