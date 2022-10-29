/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(!root){
        return []
    }
    let res = []
    let flag=true
    let list=[root]
    while(list.length){
        let levelist=[]
        let size=list.length
        for(let i=0;i<size;i++){
            let node=list.shift()
            if(flag){
                levelist.push(node.val)
            }else{
                levelist.unshift(node.val)
            }
            if(node.left){
                list.push(node.left)
            }
            if(node.right){
                list.push(node.right)
            }
        }
        res.push(levelist)
        flag=!flag
    }
    return res
};