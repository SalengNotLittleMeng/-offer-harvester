/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */

var reverseBetween = function(head, left, right) {
    let headnode=new ListNode(null)
    headnode.next=head
    let node=headnode
    while(node?.next?.val!=left){
        node=node.next
    }
    let pre=node
     while(node.val!=right){
        node=node.next
    }
    let rightNode=node
    let aft=rightNode.next
     rightNode.next=null
     let leftNode=pre.next
     pre.next=null
     let nodelist=reserveNode(leftNode,rightNode)
     pre.next=nodelist
     node=nodelist
     while(node.next){
         node=node.next
     }
     node.next=aft
    function reserveNode(leftNode,rightNode){
        let cur=leftNode
        let temp=null
            while(cur.val!=rightNode.val){
                temp=cur.next
                cur.next=rightNode.next
                rightNode.next=cur
                cur=temp
            }
        return rightNode
    }
    return headnode.next
};