// 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

// 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let stack=[]
    let max=0
    prices.push(-1)
    for(let i=0;i<prices.length;i++){
        while(stack.length!=0&&stack[stack.length-1]>prices[i]){
                let bottom=stack[0]
                let val= stack.pop()
                max=Math.max(max,val-bottom)
        }
        stack.push(prices[i])
    }
    return max
};
// 用栈来解决队列比大小问题