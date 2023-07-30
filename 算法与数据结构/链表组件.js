// 给定链表头结点 head，该链表上的每个结点都有一个 唯一的整型值 。同时给定列表 nums，该列表是上述链表中整型值的一个子集。

// 返回列表 nums 中组件的个数，这里对组件的定义为：链表中一段最长连续结点的值（该值必须在列表 nums 中）构成的集合。
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number[]} nums
 * @return {number}
 */
var numComponents = function(head, nums) {
    let set=new Set()
    for(let num of nums){
        set.add(num)
    }
    let flag=false
    let res=0
    while(head){
        if(set.has(head.val)){
          if(!flag){
            flag=true
            res++
          }
        }else{
            flag=false
        }
        head=head.next
    }
    return res
};