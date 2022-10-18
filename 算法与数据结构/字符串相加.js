// 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。

// 你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
     num1=num1.split('').map(item=>Number(item))
     num2=num2.split('').map(item=>Number(item))
    let length=num1.length>num2.length?num1.length:num2.length
    let list=[]
    let temp=0
    function addZero(length,nums){
        for(let i=0;i<length-nums.length;i++){
            nums.unshift(0)
            i--
        }
        return nums
    }
    num1=addZero(length,num1)
    num2=addZero(length,num2)
    for(let i=length-1;i>=0;i--){
        let sum=num1[i]+num2[i]+temp
        if(sum>=10){
            temp=Math.floor(sum/10)
            sum=sum%10
        }else{
            temp=0
        }
        list.unshift(sum)
    }
    if(temp!=0){
        list.unshift(temp)
    }
    return list.join('')
};