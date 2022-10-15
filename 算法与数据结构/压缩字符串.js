// 给你一个字符数组 chars ，请使用下述算法压缩：

// 从一个空字符串 s 开始。对于 chars 中的每组 连续重复字符 ：

// 如果这一组长度为 1 ，则将字符追加到 s 中。
// 否则，需要向 s 追加字符，后跟这一组的长度。
// 压缩后得到的字符串 s 不应该直接返回 ，需要转储到字符数组 chars 中。需要注意的是，如果组长度为 10 或 10 以上，则在 chars 数组中会被拆分为多个字符。

// 请在 修改完输入数组后 ，返回该数组的新长度。

// 你必须设计并实现一个只使用常量额外空间的算法来解决此问题。

/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
    let stack=[]
    let curSum=0
    let curTop=chars[0]
    chars.push(null)
    for(let i=0;i<chars.length;i++){
        if(chars[i]===curTop){
            curSum++
            continue
        }
        stack.push(curTop)
        if(curSum>=10){
            String(curSum).split('').forEach(item=>{
                stack.push(item)
            })
        }else{
            stack.push(curSum)
        }
        curTop=chars[i]
        curSum=1
    }
    chars=stack
    console.log(chars)
    return chars.length
};


var compress = function(chars) {
    let fast=1
    let slow=0
    let s=''
    let len=chars.length
    while(fast<=len){
        if(chars[fast]==chars[slow]){
            fast++
        }else{
// 这里注意考虑最后一个的问题，当到达最后一个时将当前元素添加进去
            let temp=fast-slow>1?`${chars[slow]}${fast-slow}`:`${chars[slow]}`
            s+=temp
            slow=fast
            fast=slow+1
        }
    }
    for(let i=0;i<s.length;i++){
        chars[i]=s[i]
    }
    return s.length
};