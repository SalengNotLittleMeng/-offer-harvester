// splice() 方法向/从数组添加/删除项目，并返回删除的项目。

// 注释：splice() 方法会改变原始数组。
Array.prototype.my_splice = function(start, delnum = 0, ...item) {
    start = start < 0 ? Math.abs(this.length + start) : start;
    start = start > this.length ? this.length : start;
    delnum = delnum > this.length - start ? this.length - start : delnum;
    delnum = delnum < 0 ? 0 : delnum;
    let res = [];
    let temp = [...this]
        // 从起始位置替换item中的内容（先替换）
    for (let i = start; i < start + temp.length; i++) {
        this[i] = item[i - start];
    }
    // 如果要删除的长度大于替换元素的长度
    // 那么将删除完后面的部分进行修改
    if (item.length < delnum) {
        let cha = delnum - item.length;
        for (let i = start + item.length; i < temp.length; i++) {
            this[i] = temp[i + cha]
        }
        // 如果要删除的长度小于替换元素的长度
        // 那么将删除完后面的部分连接过去
        if (item.length > delnum) {
            for (let i = start + delnum; i < temp.length; i++) {
                console.log(temp[i])
                this.push(temp[i]);
            }
        }
        // 最后返回的部分
        for (let i = start; i < start + delnum; i++) {
            res.push(temp[i]);
        }

    }
    return res
}
let arr = [1, 2, 3, 4, 5, 6, 7]
console.log(arr.my_splice(1, 3, 9, 9, 9, 9, 9, 9))
console.log(arr)