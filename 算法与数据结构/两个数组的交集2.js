/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
   let list
   let list2
   if(nums1.length>nums2.length){
       list=nums1
       list2=nums2
   }else{
       list=nums2
       list2=nums1
   }
   let map=new Map()
   for(let i=0;i<list.length;i++){
       if(map.has(list[i])){
           map.set(list[i],map.get(list[i])+1)
       }else{
           map.set(list[i],1)
       }
   }
   let res=[]
   console.log(map,list2)
   for(let i=0;i<list2.length;i++){
       if(map.has(list2[i])){
           let val=map.get(list2[i])
           if(val==0){
               map.delete(list2[i])
               continue
           }
           res.push(list2[i])
           map.set(list2[i],val-1)
       }
   }
    return res
};