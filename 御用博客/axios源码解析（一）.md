
---
theme: cyanosis
---
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

使用Axios构造函数，是为了能够使用面向对象的方式进行编程，让整个代码更加条理。但带来的问题就是，如果最后暴露的是一个构造函数Axios，那么开发者就可以通过修改原型链对Axios上的方法进行修改，造成各种潜在的风险，同时，axios在开发中使用的频率比较高，多次创建实例化对于开发者来说也不友好。因此，axios最后只暴露出了一个函数，而这个函数可以使用Axios上的所有方法
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

之后，创建了一个实例axios，这也就是我们平时所用到的axios

```javascript
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
// 暴露 Axios 类， 允许类继承
axios.Axios = Axios;
```
注意一点，在这个阶段创建的axios，使用的还是default.js中的默认配置，那么，如果我们想创建多个不同的实例对象对不同情况进行不同处理，该怎么办呢

```javascript
// 创建实例的工厂函数
axios.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios.defaults, instanceConfig));
};
```
这个部分创建了一个工厂函数，用于创建新的Axios实例，其中mergeConfig用于合并两个配置，有重复的配置的话以后面的参数为准，将新的配置作为参数，调用创建axios实例的方法。这就让我们能够利用参数对默认配置进行局部修改，创建多个不同的axios对象
之后，给axios添加了取消请求的方法，由于取消请求是针对于具体某个请求的，因此直接挂在了axios的私有方法下

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
这里注意处理高并发的axios.all和axios.spread,官方调用的实例如下：

```javascript
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread((acct, perms) => {
    // 两个请求都完成后
  }));

