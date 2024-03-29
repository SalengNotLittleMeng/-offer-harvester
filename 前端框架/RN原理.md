## RN优势
RN优势：开发快，多端复用，动态化

## RN 渲染原理

RN的本质上Native渲染，我们写的react代码会被打包成JSbundle上传到服务器（或直接内置在包里），当app启动时，安卓/IOS中的容器会加载这些JS bundle。这些JSbundle会跟原生容器进行通信，告诉app应该如何渲染或如何执行代码，来完成app的渲染和交互

在旧版的RN里，原生app和JS bundle的通信是通过JS桥来完成的，但JS桥会进行大量序列化和反序列化的操作，性能较差，因此新版的RN是通过TruboModule中的HostObject模块代理来完成的，当JS对象执行一个操作，会映射到原生模块，实现JS和原生的同步

基本流程：

首屏：JS层解析出渲染指令（虚拟dom），传递给Native层进行渲染

交互：Native层获取到了交互事件，传递给JS层进行相应，并从JS层获取相应更新操作的指令

## RN跨平台原理

RN通过JSInterface，在不同的平台执行不同的JS引擎，比如安卓使用V8（2022年已经更新为Hermes），IOS使用JS core，通过JSInterface层屏蔽了平台之间的差异，来完成跨平台，同时新版的RN中，JSinterface也可以负责通信

当然，一些原生的API无法在JS层进行跨平台，因此RN允许在源代码中写一部分原生代码进行补充

## JS桥原理

JS桥本质上就是JS层和原生进行通信的工具，也可以说是一种协议

JS调用Native：

JS调用Native是通过映射的方法，Native会将自己的一个方法映射到JS的window对象上，JS调用window对象上的这个方法，就调用了原生方法。

Native 侧：
```
import android.webkit.WebView; /* 引入 WebView 类  */
import android.app.Activity; /* android 里面 Activity 组件 */
​
public class MainActivity extends Activity implements OnClickListener {
    @Override
  protected void onCreate(Bundle savedInstanceState){  /* Activity 初始化调用 */
        //....
        WebView.addJavascriptInterface(JavaScriptInterface, "JSOriginBridge");
    }
}
```

JS侧：

```
window.JSOriginBridge.postMessage(message);
```

Native调用JS

Native调用JS主要通过动态加载解析的方式

```
webView.evaluateJavascript("javascript:alert('我被Native调用了')",resultCallback)
```

这里可以通过操作window的方式来进行传值或通信

## RN优化手段
### 引擎层面
目前引擎层面，官方没有提供对应的方案，
1.引擎预加载

引擎预加载可以通过启动app时，提前请求react-native/Libraries/BatchedBridge/BatchedBridge这个资源并缓存，来预加载容器

2.引擎复用
* webview来保存多个页面之间的状态。
* 使用bundleName作为ID，每一个bundle对应一个引擎，将需要复用的页面打入一个bundle可以实现复用
* 引擎采用延迟回收策略，当退出一个页面后，短时间重新进入会复用引擎


## bundle层面
通过合理打包，懒加载资源等方式，防止大量加载JS资源。拆分bundle

## 请求层
预请求。首屏绕过react加载，从Native层请求数据

分片渲染，并发请求等常规操作

## react层
使用memo和React.Memo缓存子组件，避免重复渲染

使用PureComponent，prop和state不变就不更新

shouldComponentUpdate手动控制组件更新

## 渲染调度
通过实现调度器或利用任务队列，优先渲染重要或内容少的部分（比如优先渲染tabs）

react可以使用transition设置任务优先级，但RN目前没有实现这个方法

## 图片调优

使用resize对本地图片进行压缩，加上这个属性后，会对超过容器大小的图片进行压缩，一般会压缩到1/8的尺寸


通过Image.getSize这个API获取远程图片尺寸，并手动修改到合理尺寸，因为如果图片尺寸过大，在内存中的体积也会很大，可能导致黑屏或闪退

缓存，对于大图或gif这种体积较大的应该开启多级缓存来避免重复加载。目前有现成的方案react-native-fast-image

## 内存管理

手动清理其他页面未使用的资源，停止非当前页面的数据加载等

## 列表调优
长列表不要使用ScrollView和ListView，优先使用FlatList和SectionList，这两者都是基于虚拟列表实现的