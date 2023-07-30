/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    let map=new Set()
    function findNumber(n){
        n=String(n).split('')
        let res=0
        for(let i=0;i<n.length;i++){
            res+=Math.pow(n[i],2)
        }
        if(res==1){
            return true
        }
        if(map.has(res)){
            return false
        }
       map.add(res)
       return findNumber(res)
    }
  return  findNumber(n)
};