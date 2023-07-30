/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
    let arr=new Array(n).fill(false)
    let count=0
    for(let i=2;i<n;i++){
        if(!arr[i]){
            for(let j=2;i*j<n;j++){
                arr[i*j]=true
            }
        count++
        }
    }
    return count
};