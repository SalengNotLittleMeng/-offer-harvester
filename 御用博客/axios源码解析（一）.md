
---
theme: cyanosis
---
我正在参与掘金创作者训练营第5期，[点击了解活动详情](https://juejin.cn/post/7123119385803390983 "https://juejin.cn/post/7123119385803390983")

大家好，我是小小蒙，准大三，非正式前端

之前写了一篇关于axios封装的文章[【细节至上，万字教程】封装axios？看这篇就够了！（上）](https://juejin.cn/post/7125454447979233311)，里面的一些内容提到了axios源码相关的知识。在这篇文章中，我发现axios源码的内容跟封装放在一起讲其实并不容易讲明白，因此，我决定开一篇专栏将axios的源码给大家讲明白

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e275f71cc3d4329921319a9841d0597~tplv-k3u1fbpfcp-watermark.image?)

带注释的axios源码我放到了这个仓库里，需要的自行下载即可：

[axios-source-code-analysis: 学习axios源码的笔记](https://gitee.com/yan-taomeng/axios-source-code-analysis)

## axios目录结构解析
在开始之前，我们要先将一下axios的目录结构

我们进入axios的源代码后，首先找到lib这个文件夹，里面存放着axios的核心源代码，在这个文件夹里分为这么几个文件：

* adapters:适配器，保存了在浏览器和node环境下封装AJAX的代码
* core：axios中核心部分的代码
* helpers：进行辅助处理的一些代码
* axios.js：入口文件
* default.js:设置默认配置的文件夹
* until.js：存放全局的工具函数

其中，core部分又分成了管理拦截器的Intermanger，进行AJAX处理的dispathRuqest,合并配置的mergeConfign等部分

看一个项目的源码，首先要从他的入口文件处开始看起，那么，首先我们从axios.js这个文件开始看起，来对axios的源码进行解析

## axios.js源码分析

### 创建axios的函数
我们进入到axios.js的代码中，首先它定义了一个创建实例的函数：

```javascript
function createInstance(defaultConfig) {
    // 实例化Axios
    var context = new Axios(defaultConfig);
    // 注意这里bind是一个自定义函数，返回一个函数（）=>{Axios.prototype.request.apply(context,args)}
    // 这里request基本是Axios的核心方法，相当于将这些方法全部帮到了实例化的对象上
    var instance = bind(Axios.prototype.request, context);

    // Copy axios.prototype to instance
    // 将Axios原型链上的其他方法也都绑定到instance上去，这些方法的this会指向contxt
    utils.extend(instance, Axios.prototype, context);

    // Copy context to instance
    // 将contxt上的属性复制到instance上去
    utils.extend(instance, context);

    return instance;
}
```
这个函数干了什么事呢？

他先创建了一个Axios构造函数的实例对象，然后将Axios的所有方法都绑定到了axios的身上。

我们想一下，平时们使用axios，是使用的构造函数还是普通函数呢？

没错，我们使用axios时不需要进行实例化，我们使用axios的时候直接就用函数的方式进行调用。

既然如此，我们完全可以创建一个axios函数，并在这个函数上添加属性或方法啊啊，为什么要先创建一个构造函数并在构造函数上添加方法，再将这些方法都搬运到axios这个函数身上呢？

首先，使用构造函数能然我们比较轻松地对一个对象进行属性和方法的扩展，尤其是像axios这样拥有很多方法的对象，用构造函数可以比较轻松地为一个对象进行扩展

其次，axios在有一个功能是可以创建实例，也就是要实现“继承”这一功能，使用构造函数显然可以更好地实现继承

但直接暴露出Axios这个对象又会导致我们每次使用axios时都需要手动去new出一个实例，这样又会导致以下两个问题：

* 操作不方便，如果我们在脚手架中使用的是构造函数Axios,那么我们难道在每个文件中都要new一个Axios对象吗
* 属性无法公用，由于new出来的对象都是独立的，因此如果我们想统一设置axios的一些属性就显得很麻烦

当然，上面两个问题都可以通过封装来解决，但是，问题留给用户去解决显然不是一个优秀的库应该干的事情

因此，axios选择通过上面提到的方式来实现：使用构造函数来维护各种方法，最后将构造函数上的各种方法添加到函数axios上，这样就做到了兼顾构造函数和普通函数的优点

因此，axios最后只暴露出了一个函数，而这个函数可以使用Axios上的所有方法
 
 ### axios.js中的工具函数

补充一些工具函数的源码：bind.js

```javascript
module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
```
bind的用法跟原生JS中的bind基本一致，不过改变了一下参数的位置

```javascript
function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
            a[key] = bind(val, thisArg);
        } else {
            a[key] = val;
        }
    });
    return a;
}
```
extend的作用是将对象b的所有属性值和方法添加到对象a上，如果有方法是函数，则可以通过第三个参数去指定函数this的指向

### create方法
我们平时用的aixos是直接调用了上面写道的createInstance创建了的：

```javascript
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
// 暴露 Axios 类， 允许类继承
axios.Axios = Axios;
```
在这个阶段创建的axios，使用的还是default.js中的默认配置，那么，如果我们想创建多个不同的实例对象对不同情况进行不同处理，该怎么办呢？axios的做法是：给最后暴露出的axios添加一个create方法：

```javascript
// 创建实例的工厂函数
axios.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios.defaults, instanceConfig));
};
```
create是一个工厂函数，用于创建新的Axios实例。

其中mergeConfig这个方法用于合并两个配置，有重复的配置的话以后面的参数为准，将新的配置作为参数，调用创建axios实例的方法。这就让我们能够利用参数对默认配置进行局部修改。

另外，每次调用create方法都会返回一个新的对象，这个对象会拥有Axios上全部的方法，这就达到了继承的目的，我们可以调用create方法来创建axios的多个实例

所以严格地说，axios的create方法并不是创建实例，而是返回了一个拥有Axios全部方法的对象。但create这个方法是在创建实例后手动添加在axios上的，因此实例并没有create这个方法

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81ac18ca04154b41990f27250c525d56~tplv-k3u1fbpfcp-watermark.image?)

### 添加其他方法
之后，给axios添加了取消请求的方法，由于取消请求是针对于具体某个请求的，因此直接挂在了axios的私有方法下：

```javascript
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');
```
再添加其他的一些axios方法

```javascript
// 处理并发请求，直接调用了Priomise的all方法
// axios.all方法接受一个数组作为参数，数组中的每个元素都是一个请求，返回一个promise对象，
// 当数组中所有请求均已完成时，执行then方法。
axios.all = function all(promises) {
    return Promise.all(promises);
};
// 在then方法中执行axios.spread 方法。该方法是接收一个函数作为参数，
// 返回一个新的函数。接收的参数函数的参数是axios.all方法中每个请求返回的响应。
axios.spread = require('./helpers/spread');

// Expose isAxiosError
// 判断是否是axios导致的错误
axios.isAxiosError = require('./helpers/isAxiosError');
// 暴露出axios
module.exports = axios;
```
这里大家可以注意一下axios内置的axios.all和axios.spread,这两个方法本质是调用promsie提供的all来处理多个请求，在当我们需要同时处理多个请求时无需进行链式调用，只要一步就可以搞定了！

官方调用的实例如下：

```javascript
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread((acct, perms) => {
    // 两个请求都完成后的回调函数
  }));
```

那么，axios.js这个文件的分析就算是结束了，这个文件非常短，但里面的精彩的设计思路却很值得我们学习

![W8F3@QYC2W{OQA6RC_GNEGO.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6d2162ca2c045b59414f1928de80ff8~tplv-k3u1fbpfcp-watermark.image?)

我是小小蒙，正在为成为一名正式的前端工程师而努力!
