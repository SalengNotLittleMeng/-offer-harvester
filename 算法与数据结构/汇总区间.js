// 给定一个  无重复元素 的 有序 整数数组 nums 。

// 返回 恰好覆盖数组中所有数字 的 最小有序 区间范围列表 。也就是说，nums 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个范围但不属于 nums 的数字 x 。

// 列表中的每个区间范围 [a,b] 应该按如下格式输出：
// "a->b" ，如果 a != b
// "a" ，如果 a == b

/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function(nums) {
    let stack=[]
    let resList=[]
    for(let i=0;i<nums.length;i++){
        if(stack.length==0||(stack[stack.length-1]==(nums[i]-1))){
            stack.push(nums[i])
        }else{
            resList.push(changeToStr(stack[0],stack[stack.length-1]))
            stack=[nums[i]]
        }
    }
    if(stack.length!=0){
        resList.push(changeToStr(stack[0],stack[stack.length-1]))
    }
    function changeToStr(a,b){
        if(a==b){
            return a+''
        }
        return `${a}->${b}`
    }
     return resList
};