/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let map=new Map([
       [nums[0],0]
    ])
    let more=nums[0]
    for(let i=0;i<nums.length;i++){
        if(map.has(nums[i])){
            let number=map.get(nums[i])+1
            more=map.get(more)>number?more:nums[i]
            map.set(nums[i],number)
        }else{
            map.set(nums[i],1)
        }
    }
        return more
};