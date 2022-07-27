大家好，我是小小蒙，准大三，非正式前端

axios，一个用于网络请求的库，这应该是绝大多数前端项目都会用到的库了。最开始我们可以按照官方文档上的教程，直接引入调用即可。

但而随着我们项目规模的庞大，直接使用axios已经不能满足我们的需求了。毕竟谁也不想在业务层里写一大坨网络请求的代码，或者当项目上线时把上百个接口的测试环境地址一个一个改为生产环境地址。包括如果后端配置了token或者auth,在每个接口上一个一个添加更是一场灾难

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/589c1db79f754512a81350965e9cd338~tplv-k3u1fbpfcp-watermark.image?)

因此，面对庞大的项目，封装axios是我们必须要做的一件事情，今天我就来带大家，封装一个功能完整的axios

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/337a02c9b94442f6992c18ce18f2b6c2~tplv-k3u1fbpfcp-watermark.image?)

## 直接使用axios存在的问题？

在进行封装之前，我们必须明确，在项目中直接使用axios中存在哪些问题或者不足，这样才能对症下药

我稍微总结了一下，将axios直接在项目中使用的问题大概有这么几个：

* 请求代码分散在业务层，无法集中管理
* 对于token，auth，timeout，baseurl这些配置无法统一设置
* 每次拿到响应报文后需要response.data获取后端传过来的数据
* 无法区分开发和生产环境，导致当环境变化时需要手动更换接口
* 当请求方式不是默认请求头时，需要手动添加请求头配置
* 使用formData,urlencoded类型参数需要做额外处理
* 没有统一错误处理机制
* 当用户连续进行请求时，会消耗大量性能并可能导致信息提交重复
* 请求过程中没有给用户反馈，用户体验不好
* 请求失败后无法进行重连
* ....

那么，我们的封装就应该着眼于解决上面的这些问题

## 封装的功能

针对上面的问题，我们就可以分析出解决的方式,并得出最后封装出的功能：
* 将api抽离，分离业务层和请求层
* 设置了统一配置并区分开发生成环境
* 添加了请求，响应拦截器，直接返回响应信息的 data
* 对各种类型的错误进行了统一处理
* 自动取消短时间内发出的连续请求
* 统一参数配置，不论是json,formdata还是urlencoded，我们data都只需要传一个对象即可
* 根据参数配置请求头
* 在请求响应前添加loading动画，优化用户体验
* 支持重连机制

需求明确了，我们直接来吧！

## 抽离api
首先我们要做的，是将所有api从业务代码中抽离出来统一管理，这样无论我们之后是要修改接口还是调试都很清晰简单。因为很多时候一个接口要用在多个地方，而如果这个接口需要修改，我们只需要修改一处即可，避免了一个接口有改动，必须翻遍项目把所有用到这个接口的地方都该一遍的问题。

那么我们应该如何将api抽离出来呢？考虑到我们之后还要去做其他封装，因此我们首先可以写一个函数,将参数从函数里传进去，并在函数内部调用axios方法。最后将这个函数暴露出去，之后每个模块只需要引入这个函数并配置参数，就可以访问使用axios的方法了

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51a6e46227ed4a5293b1ce68bea5fb73~tplv-k3u1fbpfcp-watermark.image?)
### 创建包装函数

建立http/http.js文件，在里面引入axios，然后创建一个函数，在函数内部调用axios方法，由于axios返回的是一个promise，因此我们在函数中直接return就可以了.最后，我们把这个函数暴露出去

```js
    import axios from 'axios'
    function myAxios(config) {
       return axios(config)
    }
    export default myAxios;
```
这样我们第一步就完成了！你可能会问，这样调用跟直接使用axios有什么区别吗？

别急，到这一步我们只是在axios外包装了一个函数并传参，之后我们会在这个函数中去做更多的处理。而且将这个函数暴露出去，也可以让我们的各个模块进行统一调用

那么我们现在来建立各个模块

### 对接口划分模块

在http文件夹下建立homeApi.js的文件，并引入我们刚在包装的函数，现在，我们可以在这个文件中使用刚才我们封装的函数了。我们可以写一个函数,通过给这个函数传参的方式给myAxios的参数选择中传data参数，而剩下的一些配置（比如url）我们可以直接写死在参数里，这样的话，比如我们要去请求：'http://localhost:8888/getMessage' 这个接口,只需要调用getMsg这个方法即可，并将请求所需的参数传进去即可

```js
function getMsg(params) {
  return myAxios({
    url: "http://localhost:8888/findByName",
    method: "get",
    data: params,
  });
}
```
那么我们在业务层要如何调用这个函数呢？别着急，容我细细道来。


![0](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93a35c02fe4d4f5d9008b08b04938076~tplv-k3u1fbpfcp-watermark.image?)

咱们先在homeApi.js这个文件夹里做一点修改，将我们刚才定义的函数暴露出来，这个ES6语法别告诉我你不知道哦
```js
import myAxios from './http'
    export default {
     getMsg(params) {
      return myAxios({
        url: "http://localhost:8888/findByName",
        method: "get",
        params
      });
     }
}
```
之后，我们要建立一个api.js的文件，这个文件用来收集各个模块的接口并进行统一暴露

```js
import homeApi from './homeApi'

export default {
    homeApi
}
```

为什么要将一个模块先引入再暴露出去呢？看起来好像有点多此一举啊！其实这部分代码跟功能无关，而是为了**可维护性**，我们的示例中只有一个homeApi模块，但如果之后还有loginApi,admineApi,userInfoApi呢？业务中不同页面，不同功能模块的接口往往是不一样的，如果我们将所有接口都一股脑得写在一个文件里，势必会导致代码功能界限的模糊，为之后的维护造成困难，另外，各个模块的开发者共同操作一个文件，也会容易造成各种隐患。但如果我们每个功能模块暴露一个接口模块，又容易导致混淆，影响开发体验。

因此，我们采用**划分模块，统一暴露**的方式，划分开各个接口模块，但最后将他们收集在一个对象里统一暴露出去，这样就可以兼顾可维护性和开发体验了。

现在我们得到了一个里面装着各个接口模块函数的对象，只要访问这个对象并调用对应模块的函数我们就可以使用axios完成请求了。因此，最简单的方式显然是在各个模块中直接引入这个对象并调用

```js
import $http from '../../http/api'
export default {
  mounted() {
    $http.homeApi.getMsg({id:1}).then(res=>{
        console.log(res)
    })
  }
  }
```
但这样的问题是，我们每次使用都要引入这个对象，而对接口是我们在一个项目中经常会用到的部分。因此，我们完全可以将这个对象挂在Vue的实例上，当用到它的时候直接使用this进行调用
### 全局挂载
在Vue上挂载一个属性，在Vue2中我们可以直接通过操作原型链的方式进行挂载

```js
    import http from './http/http.js'
    Vue.prototype.$http=http
```

在Vue3中，Vue的config属性中给出了我们globalProperties这个对象，在这个对象上挂载属性可以通过Vue内部代理的方式，直接使用this进行访问，相对操作原型链的方式来说更加安全

```js
    import http from './http/http.js'
    const app = createApp(App);
    //将axios的二次封装（api）挂载到全局
    app.config.globalProperties.$http = api;
```

这样，我们无需每次都引入，也可以直接通过this.homeApi.getMsg({id:1})的方式进行请求，怎么样，不用引入的感觉是不少很爽？现在回头来看，我们之前将每个接口模块文件都引入然后统一暴露的方法好像也有一点瑕疵，因为每当我们添加了一个接口模块，就必须手动在api.js这个文件里引入这个模块并暴露出去，那么有没有方法可以让我们自动引入所有我们需要的模块呢？

**还真有！！！**

### 自动化引入

将一个文件夹里的文件批量引入，是webpack给我们提供的功能，这个方法叫做require.context()

这个方法可以给我们返回需要指定文件夹中每个匹配到的文件中被暴露的文件，这么说可能有点绕，但看看他的参数和返回值就会清晰很多：

-   第一个参数是一个路径字符串，表示要搜索的文件夹目录
-   第二个参数是一个布尔值，表示是否需要递归查找指定目录的所有子目录，
-   第三个参数是一个正则表达式，用来匹配文件夹中的文件名。

所以，只要给定目录和匹配方式，这个方法就会返回匹配到的每个文件中被导出的模块了吗？如果是这样，我们只需要用正则匹配这个文件夹里所有接口模块文件不就可以了吗？

我们先打印一下结果：

```js
//这里匹配以Api.js结尾是因为在自己的项目规范里以Api结尾的是接口模块文件，并不绝对
let ms = require.context("./", false, /\w+Api.js$/);
console.log(ms)
```
但结果好像不太对：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec9d9da7b9f04552a4d0afed42eb1bd5~tplv-k3u1fbpfcp-watermark.image?)

所有导出的结果呢？为啥返回的是一个函数？

先别急，其实这个被返回的函数身上还有一个方法keys，执行这个方法后返回的数组就是被暴露出各个对象

```js
console.log(ms.keys())
```


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7fb57c656364f7f8b16890e67fe3d7b~tplv-k3u1fbpfcp-watermark.image?)

现在好像是可以拿到我们匹配到的文件路径了，但是我们现在还是没有拿到这个文件暴露出来的模块啊，而且上面那个函数又是做什么的呢？

我们可以把返回的文件路径作为参数传入require.context()返回的函数中，来打印下结果：

```js
    console.log(ms(ms.keys()[0]))
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/085d2d5860db4d309a5709c5b90c83ea~tplv-k3u1fbpfcp-watermark.image?)
出现了！直接返回了这个模块的所有信息，而我们需要的接口对象就在default这个属性中

原来，require.context()这个方法会返回的内容是一个函数，这个函数的参数是一个路径字符串，返回的结果则是这个路径所在的文件中暴露出模块的所有信息。而这个方法上还有一个属性keys，这个属性是一个函数，它会返回一个包含正则匹配到的所有路径字符串的数组。

有了上面这些知识，我们现在来将模块变成自动化引入应该不是一件难事了，我们可以定义一个对象，将每个文件名作为这个对象的属性名，而对应属性的值则是该文件暴露出来的模块。

```js
let ms = require.context("./", false, /\w+Api.js$/);
let modules = {};
ms.keys().forEach((item) => {
  let name = item.substring(2, item.length - 3);
  modules[name] = ms(item).default;
});
export default modules;
```
这样即使我们之后再添加接口模块，也不需要手动引入他们，只要把他们暴露出去让api.js进行自动引入即可。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c86e081c9d74fb1bdc734f8247c467e~tplv-k3u1fbpfcp-watermark.image?)

## 统一配置

我们现在已经成功将所有接口都从业务层抽离了出去，同时对他们的模块进行了划分，我们现在要进行请求依然需要将所有参数都添加进去，即使这里面有很多重复的参数。因此我们这一步要做的是将统一的配置进行抽离，减小我们的代码量

### 将直接调用改为添加实例

在统一配置前，我们要做的事，是将直接用axios方法进行请求改为添加axios实例，然后利用实例进行请求

为什么要这么做？因为封装是一把双刃剑，在减小我们代码量，保证功能内聚的同时也会导致一个问题，就是在处理比较少见的情况时，过度或不合适的封装会让你不得不做更多的处理。如果我们直接在axios上进行统一设置，那么假如今后我们出现一个特殊需求（比如需要完整的响应报文信息），此时我们的封装的axios已经配置了拦截器对报文进行了处理。如果我们配置的是axios本身，就不得不在拦截器内部为了这一个方法而写一条逻辑，这与我们封装的思路显然是不符的。而我们如果封装阶段操作的是实例，就可以使用原生的axios来处理这个问题。这样就保证了兼顾统一性和变异性

因此我们先在http/http.js下创建一个实例，然后在实例上做一些基本配置
```js
let baseURL="http://localhost:8888"
const instance = axios.create({
  //基础路径
  baseURL,
  // 请求限时
  timeout: 5000,
});
```

之后修改我们封装的函数为实例调用
```js
    function myAxios(config) {
     return instance(config)
    }
```
axios.create这个方法会返回一个axios的实例，这个实例上包括了axios绝大部分方法（比如不包括create这个方法，因为禁止套娃），事实上，axios源码内部这部分非常有意思，Axios是一个构造函数，而axios是一个具有了这个构造函数所有属性和方法的函数，调用create方法就可以利用Axios上的方法来获取一个实例，这也是为什么axios可以调用方法而不是用new来创建实例的原因


那么到这一步，统一配置属性就算是结束了吗？

**还远远不够呢**

### 根据环境区分配置

为什么要根据环境区分配置？

如果你还有过做过上线项目的经历，就会发现，开发环境的接口（一般是内网穿透或后端自己的服务器），生产环境的接口（一般是统一的服务器），以及测试环境的接口（这个我还没遇到过）是不一样的。如果每次更换环境时，你都要狼狈地打开源代码去修改baseurl，那你显然不是一个足够优秀（懒）的前端


区分环境遍历的方法并不复杂，只需要用一个我们很常用的环境变量process.env.NODE_ENV，这个环境变量就是用来帮助我们区分环境的，直接添加这部分代码即可
```js
let baseURL=null
switch(process.env.NODE_ENV){
// 生产环境
    case 'production'  :
        baseURL = 'http://localhost:8888/production';
        break;
// 测试环境
    case 'test':
        baseURL = 'http://localhost:8888/test';
        break;
// 开发环境
    default:
        baseURL = 'http://localhost:8888';
}
```

### 自动在请求头上携带token

在现在前后端分离成为趋势的前提下，token代替了cookie和session,成为了运用最广泛的登录验证的方式。当我们登录成功后，后端会给我们发送一个token，之后每次请求时我们都要在请求头携带这个token来作为我们登录的凭证。这种验证方式应该是现在应用最广泛的登录方式。

如果都在配置的请求头添加token，无疑是不优雅的，因此我们可以使用拦截器的方式，每次发送请求前在请求头携带token

