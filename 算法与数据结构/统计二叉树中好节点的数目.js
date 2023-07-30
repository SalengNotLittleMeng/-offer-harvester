// 给你一棵根为 root 的二叉树，请你返回二叉树中好节点的数目。

// 「好节点」X 定义为：从根到该节点 X 所经过的节点中，没有任何节点的值大于 X 的值。
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
var goodNodes = function(root) {
   let sum=0
    function findAllNode(node,good){
        if(!node){
            return 0
        }
        let left=node.left
        let right=node.right
        let nodeNumber=0
        if(node.val>=good){
            nodeNumber=1
            good=node.val
            sum++
        }
        leftNumber=left?findAllNode(left,good):0
        rightNumber=right?findAllNode(right,good):0
        return nodeNumber+leftNumber+rightNumber
    }
     return     findAllNode(root,-1)
};

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
var goodNodes = function(root) {
    if(!root){return 0}
   let sum=0
    function findAllNode(node,good){
        if(!node){
            return 
        }
        let left=node.left
        let right=node.right
        if(node.val>=good){
            good=node.val
            sum++
        }
       findAllNode(left,good)
      findAllNode(right,good)
    }
     findAllNode(root,root.val)
     return sum
};