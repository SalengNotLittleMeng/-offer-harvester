/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
    let len=word1.length>word2.length?word1.length:word2.length
    let list=[]
    for(let i=0;i<len;i++){
        word1[i]&&list.push(word1[i])
        word2[i]&&list.push(word2[i])
    }
    return list.join("")
};