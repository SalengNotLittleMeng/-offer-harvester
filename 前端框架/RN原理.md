## RN优势
RN优势：开发快，多端复用，动态化

## RN 渲染原理

RN的本质上Native渲染，我们写的react代码会被打包成JSbundle上传到服务器（或直接内置在包里），当app启动时，安卓/IOS中的容器会加载这些JS bundle。这些JSbundle会跟原生容器进行通信，告诉app应该如何渲染或如何执行代码，来完成app的渲染和交互

在旧版的RN里，原生app和JS bundle的通信是通过JS桥来完成的，但JS桥会进行大量序列化和反序列化的操作，性能较差，因此新版的RN是通过模块代理来完成的，当JS对象执行一个操作，会映射到原生模块，实现JS和原生的同步

基本流程：

首屏：JS层解析出渲染指令（虚拟dom），传递给Native层进行渲染

交互：Native层获取到了交互事件，传递给JS层进行相应，并从JS层获取相应更新操作的指令

## RN跨平台原理

RN通过JSInterface，在不同的平台执行不同的JS引擎，比如安卓使用V8，IOS使用JS core，通过JSInterface层屏蔽了平台之间的差异，来完成跨平台

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