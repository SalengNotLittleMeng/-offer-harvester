/**
 * @param {number[]} nums
 * @return {number}
 */
var arraySign = function(nums) {
    let stack=[]
    for(let i=0;i<nums.length;i++){
        if(nums[i]==0){
            return 0
        }
        if(nums[i]<0){
            stack.push(nums[i])
        }
    }
    if(stack.length%2==0){
        return 1
    }
    return -1
};