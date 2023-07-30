/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function(n) {
    if(n<1){
        return false
    }
    let p=1
    let left=null
    let right=null
    while(1){
        if(Math.pow(3,p)==n){
            return true
        }else if(Math.pow(3,p)<n){
            left=p
            p*=2
        }else{
            left=p/2
            right=p
            break
        }
    }
    while(left<right){
        let mid=Math.floor((left+right)/2)
        if(Math.pow(3,mid)==n){
            return true
        }else if(Math.pow(3,mid)<n){
            left=mid
        }else{
            right=mid
        }
        if(mid==right-1&&mid==left){
           break
        }
    }
    return false
};

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function(n) {
    while(n&&n%3==0){
        n/=3
    }
    return n==1
};