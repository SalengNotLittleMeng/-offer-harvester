/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
     num1=num1.split('').map(num=>{return Number(num)})
     num2=num2.split('').map(num=>{return Number(num)})
    let temp=0
    let NumberList=[]
    for(let k=1;k<=num2.length;k++){
        let currentNumber=num2[num2.length-k]
        let itemList=[]
        temp=0
       for(let i=num1.length-1;i>=0;i--){
         let mult= currentNumber*Number(num1[i])+temp
        if(mult>=10){
            itemList.unshift(String(mult)[1])
            temp=Number(String(mult)[0])
        }else{
            itemList.unshift(String(mult))
            temp=0
        }
        if(i==0&&temp){
            itemList.unshift(temp)
        }
       }
        NumberList.push(itemList)
    }
          let mostlen=0
          NumberList.forEach(item=>{
              if(item.length>mostlen){
                  mostlen=item.length
              }
          })
         NumberList= NumberList.map((item,index,array)=>{
             const less=mostlen-item.length
            let len = array.length-index-1
            for(let i =0;i<len+less;i++){
                item.unshift(0)
            }
            for(let i=len+1;i<array.length;i++){
                item.push(0)
            }
            return item
         })
         temp=0
        let multList=[]
        console.log(NumberList)
         for(let k=NumberList[0].length-1;k>=0;k--){
             let count=0
            for(let i=NumberList.length-1;i>=0;i--){
                  count+=Number(NumberList[i][k])
            }
            count+=Number(temp)
            if(count>=10){
            multList.unshift(String(count)[1])
            temp=Number(String(count)[0])
            }else{
            multList.unshift(String(count))
            temp=0
            }
             }
         let flag=true
                 console.log(multList)
        let multlength=multList.slice().length
        for(let i=0;i<multlength;i++){
            console.log(multList[i])
            if(flag&&(Number(multList[i])==0)&&(i!=multList.length-1)){
                multList.shift()
                i--
            }else{
                flag=false
            }
        }
        return multList.join('')

};