# webpack的loader机制

## 为什么要有loader：
webapck是微内核的，因此只会处理一部分JS和JSON文件（只处理这两种格式是因为webapck生成ast的库是acorn）对于其他资源需要用loader的形式来补充（转换为JS让webpack识别）

## loader的类型：
* 同步loader：可以直接return资源，也可以用this.callback触发下一个loader，如果需要传参数只能用后者
* 异步loader，一般用于IO密集场景，只能用callback的方式调用下一个loader

## loader的参数：

* content:上一个loader传过来的content
* map:上一个资源传来的source.map
* data：其他参数
## loader的一些特殊方法
* this.cacheable(false);：取消loader缓存
* this.emitFile直接在loader中写出文件（比如file-loader）
* addDependency：添加额外依赖，比如less-loader可以通过添加依赖确保一个less文件更新就重新构建
* 输出二进制文件
在loader的后面添加export const raw = true 可以让loader输出二进制文件，比如image-loader
* getLogger：让loader可以处理日志

## loader的处理流程
loader的设计：链式调用，可中断

具体处理的方式是：首先从参数从左往右的顺序执行每个loader的pitch方法，当文件载入后，从后向前执行每个loader

pitch的作用：让每个loader可以感知自己之前和之后有哪些loader会执行，同时提供中断时机

pitch的第一个参数是loader之后的资源请求字符串，第二个参数是之后的loader列表

我们可以在pitch阶段通过修改pitch的值，来中断loader的执行（添加！字符，参考style-loader）


