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
 * @return {boolean}
 */
var isBalanced = function(root) {
    if(!root){return true}
        function checkHeight(node,num){
            if(!node){return num}
            let left=node.left
            let right=node.right
            if(!left&&!right){
                return num+1
            }
            return Math.max(checkHeight(left,num+1),checkHeight(right,num+1))
        }
       console.log(checkHeight(root.left,0),checkHeight(root.right,0))
       return Math.abs(checkHeight(root.left,0)-checkHeight(root.right,0))<2
};