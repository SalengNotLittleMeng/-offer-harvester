/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if(preorder.length==0){
        return null
    }
    let root=preorder[0]
    let rootIndex=inorder.indexOf(root)
    let rootNode=new TreeNode(root)
    rootNode.left=buildTree(preorder.slice(1,rootIndex+1),inorder.slice(0,rootIndex))
    rootNode.right=buildTree(preorder.slice(rootIndex+1),inorder.slice(rootIndex+1))
    return rootNode
};