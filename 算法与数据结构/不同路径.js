// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

// 问总共有多少条不同的路径？
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    let count=0
    function getWay(m,n){
        if(m==1 && n==1){
            count++
            return true
        }
        if(m>1){
            getWay(m-1,n)
        }
        if(n>1){
            getWay(m,n-1)
        }
        return false
    }
    getWay(m,n)
    return count
};

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    let list=new Array(m).fill(0).map(()=>{return new Array(n).fill(0)})
    console.log(list)
    for(let i=0;i<m;i++){
        list[i][0]=1
    }
    for(let j=0;j<n;j++){
        list[0][j]=1
    }
    for(let i=1;i<m;i++){
        for(let j=1;j<n;j++){
            list[i][j]=list[i-1][j]+list[i][j-1]
        }
    }
    return list[m-1][n-1]
};
