/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAscendingSum = function(nums) {
    let max=nums[0]
    let list=[]
    list.push(max)
    for(let i=1;i<nums.length;i++){
        const bef=getListTail()
        if(nums[i]>bef){
            list.push(nums[i])
            max=Math.max(max,getListSum())
        }else{
            list=[]
            list.push(nums[i])
            max=Math.max(max,getListSum())
        }
    }
    return max
    function getListTail(){
        return list[list.length-1]
    }
    function getListSum(){
        return list.reduce((bef,aft)=>{
            return bef+aft
        })
    }
};