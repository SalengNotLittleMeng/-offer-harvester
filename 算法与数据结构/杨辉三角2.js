/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {

let list=[[1]]
for(let i=0;i<rowIndex+1;i++){
    if(i==0){continue}
    let temp=[1]
    for(let j=1;j<list[i-1].length+1;j++){
        let left=list[i-1][j-1]
        let right=j<list[i-1].length?list[i-1][j]:0
        temp.push(left+right)
    }
    list.push(temp)
}
return list[rowIndex]
};