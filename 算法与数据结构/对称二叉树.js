// 给你一个二叉树的根节点 root ， 检查它是否轴对称。
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
var isSymmetric = function(root) {
   let leftNode=root.left;
   let rightNode=root.right;
   function contrastNode(left,right){
       if(left?.val!==right?.val){
           return false
       }
        if(!left?.left&&!left?.right&&!right?.left&&!right?.right){
           return true
       }
       if((left.left?.val==right.right?.val)&&(left.right?.val==right.left?.val)){
      return  contrastNode(left.left,right.right)&&contrastNode(left.right,right.left)
       }
       return false
   }
  return contrastNode(leftNode,rightNode)
};