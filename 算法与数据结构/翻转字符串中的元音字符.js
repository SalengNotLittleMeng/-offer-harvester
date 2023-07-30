/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    const map=['a','A','e','E','i','I','o','O','u','U']
    let left=0
    let right=s.length-1
    s=s.split('')
    while(left<=right){
        if(map.indexOf(s[left])!=-1&&map.indexOf(s[right])!=-1){
            [s[left],s[right]]=[s[right],s[left]]
        left++
        right--
        continue;
        }else if(map.indexOf(s[left])==-1){
            left++
        }else if(map.indexOf(s[right])==-1){
            right--
        }
    }
    return s.join('')
};