// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

// 子数组 是数组中的一个连续部分。
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let temp=nums[0]
    const len=nums.length
    for(let i=0;i<nums.length;i++){
        if(nums[i]>temp){
            temp=nums[i]
        }
        for(let j=i+1;j<len+1;j++){
            let arr=nums.slice(j)
            arr= arr.reduce((bef,aft)=>{
                return bef+aft
            },0
            )
               let data=nums.slice(i,j).reduce((bef,aft)=>{
                    return bef+aft
                })
                temp=temp>data?temp:data
        }
    }
    return temp
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let ans = nums[0];
    let sum = 0;
    for(const num of nums) {
        if(sum > 0) {
            sum += num;
        } else {
            sum = num;
        }
        ans = Math.max(ans, sum);
    }
    return ans;
};