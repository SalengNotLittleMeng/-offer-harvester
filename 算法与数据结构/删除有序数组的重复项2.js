// 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。

// 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
var removeDuplicates = function(nums) {
    let map=new Map();
    for(let i=0;i<nums.length;i++){
        if(map.has(nums[i])){
            let num= map.get(nums[i])
            if(num>=2){
                console.log(nums,i,num)
                nums.splice(i,1)
                i--
            }else{
                map.set(nums[i],num+1)
            }
        }else{
            map.set(nums[i],1)
        }
    }
    return nums.length
};