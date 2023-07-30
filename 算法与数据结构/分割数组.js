/**
 * @param {number[]} nums
 * @return {number}
 */
var partitionDisjoint = function(nums) {
    let max=Number.MIN_VALUE
    let minRight=new Array(nums.length).fill(0)
    minRight[nums.length-1]=nums[nums.length-1]
    for(let i=nums.length-2;i>0;i--){
        minRight[i]=Math.min(nums[i],minRight[i+1])
    }
    console.log(minRight)
    for(let i=0;i<nums.length;i++){
        max=Math.max(max,nums[i])
        console.log(max,minRight[i+1])
        if(minRight[i+1]>=max){
            return i+1
        }
    }
};