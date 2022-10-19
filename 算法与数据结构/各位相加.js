/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function(num) {
        if(num<10){
        return num
    }
    num=num.toString().split('');
    num=num.reduce((bef,aft)=>{
       return parseInt(bef)+parseInt(aft)
    },0)
  return  addDigits(num)
};