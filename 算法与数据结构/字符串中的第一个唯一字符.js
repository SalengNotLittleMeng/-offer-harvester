/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    let map=new Map()
    for(let i=0;i<s.length;i++){
        if(map.has(s[i])){
            map.set(s[i],false)
            continue;
        }
        map.set(s[i],true)
    }
    for(let i =0;i<s.length;i++){
        if(map.get(s[i])){
            return i
        }
    }
    return -1
};