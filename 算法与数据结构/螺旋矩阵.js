// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,3,6,9,8,7,4,5]

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    function notZero(val){
        if(val===0){
            return true
        }
        return val
    }
    function setNull(x,y){
            List.push(matrix[y][x])
            matrix[y][x]=null
    }
    let width=matrix[0].length-1
    let height=matrix.length-1
    let List=[]
    function chanegWay(y,x){
        if((x==0||!notZero(matrix[y][x-1]))&&(y-1>=0&&notZero(matrix[y-1][x]))){
            setNull(x,y)
            return chanegWay(y-1,x)
        }
        if(x<=width&&notZero(matrix[y][x+1])){
             setNull(x,y)
            return chanegWay(y,x+1)
        }else if(y<height&&notZero(matrix[y+1][x])){
             setNull(x,y)
            return chanegWay(y+1,x)
        }else if(x>0&&notZero(matrix[y][x-1])){
            setNull(x,y)
            return chanegWay(y,x-1)
        }else if(y-1>=0&&notZero(matrix[y-1][x])){
            setNull(x,y)
            return chanegWay(y-1,x)
        }
        List.push(matrix[y][x])
        return false
    }
    chanegWay(0,0)
    return List
};