/**
 * @param {string[][]} items
 * @param {string} ruleKey
 * @param {string} ruleValue
 * @return {number}
 */
var countMatches = function(items, ruleKey, ruleValue) {
    let  typeMap=new Map([
        ['type',0],
        ['color',1],
        ['name',2]
    ])
    items=items.filter(item=>{
        return item[typeMap.get(ruleKey)]==ruleValue
    })
    return items.length
};