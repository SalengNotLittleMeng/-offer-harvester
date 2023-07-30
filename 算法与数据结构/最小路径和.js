/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    for(let j=0;j<grid[0].length;j++){
        for(let i=0;i<grid.length;i++){
           if(i==0&&j==0){continue;}
           if(i==0){
               grid[i][j]=grid[i][j]+grid[i][j-1]
               continue
           }
            if(j==0){
                console.log(i,j)
               grid[i][j]=grid[i][j]+grid[i-1][j]
               continue
           }
        let left=grid[i-1][j]
        let top=grid[i][j-1]
           grid[i][j]=Math.min(grid[i][j]+left,grid[i][j]+top)
        }
    }
    return grid[grid.length-1][grid[0].length-1]
};