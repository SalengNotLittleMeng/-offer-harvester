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
var minDepth = function(root) {
    if(!root){return 0}
    function deps(node,num){
        if(!node){
            return num
        }
        if(!node.left&&!node.right){
            return num
        }
        if(!node.left){
            return deps(node.right,num+1)
        }
        if(!node.right){
            return deps(node.left,num+1)
        }
        let left=deps(node.left,num+1)
        let right=deps(node.right,num+1)
        return Math.min(left,right)
    }
   return deps(root,1)
};