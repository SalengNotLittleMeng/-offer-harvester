/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function(n, m) {
    let list=[]
    for(let i=0;i<n;i++){
        list.push(i)
    }
    function deleteNumber(list,m){
         for(let i=0;i<m-1;i++){
            list.push(list.shift())
         }
        list.shift()
        return list
    }
    while(list.length!=1){
            list=deleteNumber(list,m)
                console.log(list)
    }
    return list[0]
};