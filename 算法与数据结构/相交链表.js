// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let last=headA
    while(last.next){
        last=last.next
    } 
    let temp=last
    last.next=headB
    let fast=headB
    let slow=headB.next
    while(fast!=null&&slow!=null){
        console.log(fast)
        if(fast==slow){
            temp.next=null
            return fast.val
        }
        fast=fast.next
        slow=slow.next?.next
    }
    temp.next=null
    return null
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
// 哈希表法
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let nodeSet= new Set()
    while(headA){
        nodeSet.add(headA)
        headA=headA.next
    }
    while(headB){
        if(nodeSet.has(headB)){
            return headB
        }
        headB=headB.next
    }
    return null
};