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
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    let wayList=[]
    function getAllWay(node,list){
        if(!node){
            return
        }
        let left=node.left
        let right=node.right
        list+='->'
        list+=node.val
        if(!left&&!right){
            wayList.push(list.slice(2))
            return list
        }
        getAllWay(left,list)
        getAllWay(right,list)
    }
    getAllWay(root,'')
    return wayList
};