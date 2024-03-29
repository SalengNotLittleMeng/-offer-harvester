# 美团跨平台性能优化实践

## Picasso 简介

性能优化在开发领域是一个经久不衰的话题，同时，移动端 app 作为用户量最庞大的设备，秒开率，Tp 等性能指标更是尤为重要，但必须注意的是，移动端的内容也是更常变更的部分，传统 Native 开发的一大弊端就是，定式的开发方式无法满足不断变化的需求。

因此，混合 app 正在逐渐代替 Native 开发成为主流，社区也有包括 flutter,react-native，uniapp 等成熟的手段。而在美团系的移动端产品中，采用的则是美团内部自研的跨端框架 Picasso，可以一套化的开发去适配小程序，H5，安卓，IOS 等平台。

相比于 Native 方案，Picasso 实现了容器隔离，可以对 js-bundle 进行动态引入，大大降低了模块之间耦合程度和版本更新的成本，使开发环境不必与部署环境强耦合，只要使用模拟器编写 JavaScript，就可以使用框架转译为 bundle 并引入，而不必像 RN 那样将开发环境与虚拟机/真机进行强绑定，即使在浏览器的环境下也可以进行跨端开发，大大提高了开发体验。

另外

同时，相对于 RN，flutter 等方案，Picasso 实现了完全的容器化，在既定的容器里，将 JS 代码编译成 P-model，然后根据各平台的差异提供接口进行转译，利用中间产物屏蔽了各个平台的底层差异，并使用“桥”作为了底层模块通信的唯一渠道。不必像 RN 那样为了使用一些原生功能和跨段适配，将 JS-bridge（桥）和 Native 代码混合在一起。

Picasso 目前的整体秒开率已经达到 90%以上，但对于框架来说，优化永远是一个不间断的过程，目前 Picasso 团队正在为将 Picasso 项目的整体秒开率提高到 99%而努力，而其中一个比较好的切入点就是基于容器化的预加载和 JS 预热

## Picasso 为什么比原生更快

Picasso 的代码最终会被编译为原生的安卓或 IOS 代码，因此极限性能跟原生一致，但是整体性能要优于原生，这主要是由于以下两点：

### 1.锚点布局

安卓的渲染性能瓶颈之一，就在于其视图组件的递归渲染会导致大量的重复计算，IOS 也会存在类似的问题。因此，页面的层级越多，渲染所消耗的性能就也越多。但在实际开发中，我们为了页面的实现和可维护性，往往不得不增加大量层级，消耗大量无效的性能

相比而言，Picasso 采用的锚点布局（类似于我们所说的绝对定位布局），会按照“还原图像”的原则进行绝对布局定位，通过计算元素之间的位置提供数值来进行布局。这种布局的优势是：会拥有更少的层级，在编译后递归计算的复杂度大幅减少，从而提升性能

2.采用预计算的方案，当我们进入某个页面之前，会触发页面的预计算（此时真实的请求数据还没有接通，还不确定页面要被渲染成的准确形态），容器会将获取到的 JS 视图数据进行预计算，并转化为 Native 侧的视图数据，当真正渲染时，只需要调整有偏差的结构即可，比较类似于瀑布流虚拟列表的原理，充分复用异步加载数据时的时间

## Picasso 渲染流程

Picasso 渲染的流程大致如下：

- 容器准备阶段：Picasso 准备业务 JS 环境的过程，容器准备完成后才能真正开始执行 Picasso 的业务逻辑

- 容器初始化：Native 容器 ViewController/Activity 初始化的过程

- 获取 JS：获取业务 JS 资源的过程，优先取本地缓存，无缓存时通过网络拉取

- 加载 JS：将业务 JS 加载到 JS 引擎中，完成 JS 侧页面实例的创建。Picasso 是采用单引擎机制，所有的业务运行在同一个 JS 引擎中，仅 App 启动后第一个使用 Picasso 的业务需要创建引擎，后面打开的业务都是复用同一个引擎。

- 获取业务数据：获取页面加载所需要的业务数据的过程

- 请求参数准备：发起业务请求通常需要准备一系列参数，如用户信息，定位等，这类信息通常需要通过桥来获取。该阶段耗时通常意味着业务使用的某些桥的耗时。

- 请求数据：真正发起请求至 JS 侧获取到数据的过程，包括了网络请求和数据反序列化

- 首屏渲染：执行业务 JS 逻辑，直至完成首屏渲染的过程

- 预计算：执行 JS 布局逻辑得到结构化的视图数据，并将 JS 侧的结构化的视图数据转换为 Native 结构化的视图数据的过程

- 视图绘制：根据 Native 结构化的视图数据创建并绘制 Native 视图

## 预加载

所谓预加载，就是将一部分将要执行的代码提前进行请求并缓存到本地，当使用这些数据的时候就可以基于 Picasso 缓存优先的准则优先调用缓存，这样就可以将进入页面后加载数据的过程前移，达到加快页面开启速度的效果

但是这样就会有一个问题，那就是我们应该在什么时候去执行预加载的操作，显然，如果我们在不合适的时机（比如当前页面进行大量计算或绘制时）进行预加载的操作，那么必然会影响当前页面的性能状况。而我们预期的是**在不影响当前页面性别的情况下，优化后续页面的进入速度**，那么，如何确定在何时，如何进行预加载就变得异常重要，确切来说，如何执行预加载跟三个因素有关：

- 资源：去加载哪些资源，加载多少资源
- 事件：在什么时机去进行预加载的操作
- 优先级：如果一个页面之后可能路由到多个页面，那么这些页面进行预加载的优先级和顺序该如何确定？

那么，我们该如何把握这些因素呢？

### 资源和优先级：基于统计的路由权重图

首先，我们可以通过埋点上报的数据进行建模分析，去得到用户在各个页面之间跳转访问顺序的逻辑模型，通过这个模型去分析出当用户各个页面后，接下来跳转到其他各个页面的可能性，最后得出一个有向图的数据结构。当用户在某一个页面时，就可以利用这个有向图去分析出加载各个资源的优先级和权重，同时，我们还可以通过端智能，基于埋点的数据去分析用户行为，对这些权重进行进一步细化，去加大预测的命中率

### 事件：基于埋点 SDK 的 hook 去选择加载时机

一般来说，我们应该将业务代码和处理预加载的代码进行解耦，也就意味着我们不可能在各个页面中手动去收集触发预加载的 hook。

我们可以通过埋点 SDK 来获取用户操作 app 的整个行为链，在此基础上去开发可以接入埋点系统的 SDK，在这个 SDK 中添加多个 hook，这些 hook 会获取埋点系统收集的用户操作和代码运行数据，并在我们认为触发预加载的合适时机进行触发，而我们只需要在业务代码中订阅这些 hook 触发预加载即可，用这种方式来达到业务代码和预加载优化的解耦

## JS 预热

JS 预热：提前将 JS 加载到容器中，使用双引擎同时加载，通过 host 缓存池，在相应的页面中对对应可能加载的 js 进行预热

我们可以理解为，容器是一个在 native 上内置的 JS 环境，可以封闭地执行 JS 代码。同时，我们从拿到后端返回（或缓存）的 JS 文件，到我们真正执行完成这些 JS 是需要一定时间的。那么，我们就可以对这些 js 进行提前的执行，来达到所谓“预热”的效果

这里有两个问题：如果进行预热的话，那么如何保证不影响当前容器内应页面的性能，另外，如何确定需要进行预热的 js 资源

关于不影响当前页面的性能这个问题，Picasso 采用了双引擎的方式，两个引擎同时工作，一个引擎用来专门维持当前页面的 js 计算渲染，另一个则用来进行下一个可能要渲染的页面进行 JS 预热，保证预热不会影响当前应用的性能

对于确定预热资源的方式，Picasso 采用了本地 host 缓存池的方法，通过用户前期的每次跳转的过程和映射关系计算出一个缓存池，里面对应了用户在某一个页面时最可能跳转到的下一个页面，并对对应的 JS 进行预热

这里不采用端智能的原因是 Picasso 预热属于框架层面的优化，不应该跟非框架的部分产生强相关

## 内置 JS

内置 JS 很好理解，就是将用户很可能要用到的 JS 提前内置到 app 中，这样要使用时就可以直接走本地加载，不需要请求。是一种经典空间换时间的优化方式。内置 js 可以在特定的时间进行请求删除覆盖

内置 JS 常用的领域是，在繁忙状态（从外链进入页面）下或应用出现问题后的后备方案，确保在弱网状态下也可以正常交互一部分逻辑

另一个经典的场合是刚进入 app 时，入门引导达的内置 JS，保证用户在离线状态下也可以完成功能

内置 JS 不可能一直留在 app 中无效占用空间，因此如果使用内置 JS 的方案，就需要对应的更新和销毁策略保证内存不会持续增加

### 内置 JS 的更新销毁策略

1.更新时机：一定时间后触发更新状态，当用户将 app 置于后台/关闭屏幕/长期未操作时，向后台重新拉去需要内置的 Js 版本列表，跟当前已有内置的 JS 列表进行比对，并替换版本不同的 JS

2.维护一个列表结构，每次有资源请求了内置 JS 就在列表中添加数据，当请求列表到达一定长度后，利用版本号对比后台数据进行更新

## 预下载

预下载和内置 JS 的策略很相似，对用户需要加载的一些资源进行提前下载并保存到内存中，同时维护一个更新替换策略保证更新（同上）

## 请求前置

请求前置是一个很细的优化方式，他通过将本来应该在页面（或者在 spa 应用中应该说组件）初始化时要调用的请求方法提前到了跳转页面（或者说执行路由跳转）这个环节，这样就可以充分利用容器（组件）初始化的这部分时间去请求资源，减小响应时间。一般在 web 端的开发中，这种方式可优化的时间基本可以忽略不计。

当然，对于 data 中数据量非常大的组件来讲，这种会有一定的意义，可以因为此时 Vue 初始化 data 的响应式会消耗很多时间，但这情况相比于请求前置，我们更应该想办法优化组件结构，对 data 中不需要响应式的数据进行抽离

唯一的例外可能是异步组件，对于异步耗时可能比较久的组件可以考虑使用请求前置的方法将首屏数据先进行请求并读入缓存，异步组件加载后直接读缓存，以此来优化加载时间

但是，在 Picasso 中，由于进入/修改页面要重新获取并加载 js，那么这种情景下使用请求前置，就可让视图 JS 和业务 JS 几乎并行请求，以此来降低首屏时间

## 其他优化手段

1.使用单线程优化数据桥的使用，对于 Native 和容器的通信，不必开启多线程，直接使用桥即可进行通信

2.取消不必要的数据序列化和反序列化

3.减少首屏渲染的数据，预计算，根据业务预测出渲染首屏幕需要的数据量（滚动组件）
