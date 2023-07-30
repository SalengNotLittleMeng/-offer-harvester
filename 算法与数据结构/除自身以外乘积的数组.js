/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    let list=new Array(nums.length).fill(1)
    for(let i=0;i<nums.length;i++){
        for(let j=0;j<nums.length;j++){
            if(j!==i){
                list[j]*=nums[i]
            }
        }
    }
    return list
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  let res=new Array(nums.length).fill(1)
  let left=new Array(nums.length).fill(1)
  let right=new Array(nums.length).fill(1)
  for(let i=0;i<nums.length-1;i++){
   left[i+1]=left[i]*nums[i]
  }
  for(let i=nums.length-1;i>0;i--){
    right[i-1]=right[i]*nums[i]
  }
  for(let i=0;i<nums.length;i++){
      res[i]=left[i]*right[i]
  }
  return res
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  let res=new Array(nums.length).fill(1)
    let left=1
    let right=1
    for(let i in nums){
        res[i]*=left
        res[nums.length-1-i]*=right
        left*=nums[i]
        right*=nums[nums.length-1-i]
    }
    return res
};