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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    if(!root){return false}
    let flag=false
    function getWay(node,sum){
        sum=sum+node.val
        if(!node.left&&!node.right){
           if(sum==targetSum){
                 flag=true
           }
        }
        if(node.left){
            getWay(node.left,sum)
        }
        if(node.right){
             getWay(node.right,sum)
        }
    }
    getWay(root,0)
    return flag
};