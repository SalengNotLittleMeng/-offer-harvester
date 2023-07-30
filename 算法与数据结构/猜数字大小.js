/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function(n) {
    let head=0;
    let rear=n;
    let mid
    while(head<rear){
        mid=head+Math.floor((rear-head)/2)
        console.log(mid)
        if(guess(mid)==0){
            return mid
        }     
        if(guess(mid)==1){
            head=mid+1
        }else{
            rear=mid
        }
    }
     return head
};