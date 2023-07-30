/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    let strMap=new Map()
    let tMap=new Map()
    let flag=true
    if(s.length==1||s==t){
        return true
    }
    for(let i=0;i<s.length;i++){
       if(!strMap.has(s[i])){
            strMap.set(s[i],t[i])
       }else{
           notNums=true
          flag=strMap.get(s[i])==t[i]
       }
        if(!tMap.has(t[i])){
            tMap.set(t[i],s[i])
       }else{
           notNumt=true
            flag=tMap.get(t[i])==s[i]
       }
       if(!flag){
           return false
       }
    }
       console.log(notNums,notNumt)
    return true
};