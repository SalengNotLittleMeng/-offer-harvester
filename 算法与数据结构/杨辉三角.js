/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
let list=[[1]]
for(let i=0;i<numRows;i++){
    if(i==0){continue}
    let temp=[1]
    for(let j=1;j<list[i-1].length+1;j++){
        let left=list[i-1][j-1]
        let right=j<list[i-1].length?list[i-1][j]:0
        console.log(left,right)
        temp.push(left+right)
    }
    list.push(temp)
}
return list
};