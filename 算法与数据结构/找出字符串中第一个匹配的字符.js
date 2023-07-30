// 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）
// 如果 needle 不是 haystack 的一部分，则返回  -1 。

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    let index=-1
    haystack=haystack.split('')
    needle=needle.split('')
    const FIRST_INDEX=needle[0]
    for(let i=0;i<haystack.length;i++){
        if(haystack[i]==FIRST_INDEX){
            let flag=true
            index=i
            for(let j=0;j<needle.length;j++){
                if(haystack[i+j]==needle[j]){
                    continue
                }
                flag=false
                index=-1
                break
            }
            if(flag){
                break
            }
        }
    }
    return index
};