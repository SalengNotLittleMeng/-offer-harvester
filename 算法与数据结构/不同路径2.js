/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
   obstacleGrid= obstacleGrid.map(item=>{
      return  item.map(i=>{
            if(i==1){
              return  'flag'
            }
            return i
        })
    })
   if( obstacleGrid[0][0]=='flag'){
       return 0
   }
   obstacleGrid[0][0]==1
    for(let i=0;i<obstacleGrid.length;i++){
        for(let j=0;j<obstacleGrid[0].length;j++){
            if(i==0&&j==0||obstacleGrid[i][j]=='flag'){
                continue
            }
            let left=i==0?0:obstacleGrid[i-1][j]
            let top=j==0?0:obstacleGrid[i][j-1]
            left=left=='flag'?0:left
            top=top=='flag'?0:top   
            obstacleGrid[i][j]=top+left
        }
    }
    console.log(obstacleGrid)
    const last=obstacleGrid[obstacleGrid.length-1][obstacleGrid[0].length-1]
    return last=='flag'?0:last
};


var uniquePathsWithObstacles = function(nums) {
  let m=nums.length,n=nums[0].length;
  if(nums[0][0]===1 || nums[m-1][n-1]===1 || !nums.length) return 0;
  for(let i=0;i<m;i++){
    for(let j=0;j<n;j++){
        if(nums[i][j]===1){
            nums[i][j]=0;
        }else if(i===0 && j===0){
                nums[i][j]=1;  
        }else {
              let up=0;
              let left=0;
              if(i>0) up=nums[i-1][j];
              if(j>0) left=nums[i][j-1];
              nums[i][j]=up+left;
            }
        }
    }
  return nums[m-1][n-1];
};
