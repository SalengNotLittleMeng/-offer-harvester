/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
     let sum=0
     function searchAll(node){
         if(!node){
             return
         }
         if(node.left){
           if(!node.left.left&&!node.left.right)
             sum+=node.left.val
         }
         searchAll(node.left)
         searchAll(node.right)
     }
     searchAll(root)
     return sum
};