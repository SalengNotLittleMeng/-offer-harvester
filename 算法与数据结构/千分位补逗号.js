let num=12345678.345678
function addComma(num){
    let array=String(num).split('.')
    array=array.map(item=>{
        return parseInt(item).toLocaleString('en-US')
    })
    return `${array[0]}.${array[1]}`
}
console.log(addComma(num))