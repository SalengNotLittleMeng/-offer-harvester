/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    if(s.length==0){return true}
    let len=s.length
    let index=0
    for(let i=0;i<t.length;i++){
        if(s[index]==t[i]){
            index++
            if(index==len){
               return true
            }
        }
    }
    return false
};