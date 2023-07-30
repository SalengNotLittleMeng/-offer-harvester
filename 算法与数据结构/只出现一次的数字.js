/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  let numSet=new Set()
   for(let i=0;i<nums.length;i++){
       if(numSet.has(nums[i])){
           numSet.delete(nums[i])
       }else{
            numSet.add(nums[i])
       }
   }
   return Array.from(numSet)[0]
};

// 位运算，a^a=0,a^0=a
var singleNumber = function(nums) {
    let ans = 0;
    for(const num of nums) {
        ans ^= num;
    }
    return ans;
};
