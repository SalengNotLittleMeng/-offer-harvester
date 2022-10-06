/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    let count=0;
    function itemStep(current,step,sum){
        const currentValue=current+step
       if(currentValue<sum){
           itemStep(currentValue,1,sum)
           itemStep(currentValue,2,sum)
       }
       if(currentValue==sum){
       count++
       }
       return
    }
    itemStep(0,1,n);
    itemStep(0,2,n)
    return count
};
// 动态规划，每一项的值一定是前两项的和（到达低n-1项时走一部到达n,n-2时走两步到n,往前推都是如此）
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    let dp=[]
    dp[0]=1
    dp[1]=2
    for(let i=2;i<n;i++){
        dp[i]=dp[i-1]+dp[i-2]
    }
    return dp[n-1]
};