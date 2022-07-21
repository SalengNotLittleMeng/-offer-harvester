我是小小蒙，准大三，非正式前端，正在为成为一名正式的前端工程师而不断努力

话说最近刚刚去了一家公司实习，老早之前就听过业内有实习生进去第一天因为不会用git而被开掉的传闻。但毕竟自己也在gitee上维护过一段时间的开源项目，在学校的项目也都是用git去完成的.在自己的项目中也写过git-hook的脚本，感觉自己git的水平或许说不上多好，但达到“会用”的程度问题应该还是不大的。结果入职第一天，还是因为git栽了跟头，被leader说太"慢"了


![H0FGMKJ13CJKD@VT2K29W9G.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/223e74fb7f5c42469a55a146b285d708~tplv-k3u1fbpfcp-watermark.image?)

谨以此文记录我实习第一天因为“不够快”而被领导嫌弃的经历


——————————（假装自己是分割线）——————————

## Github加速
入职第一天，在经典的自我介绍环节后，leader把我拉进了公司的GitHub的仓库里，让我把仓库先拉下来熟悉代码

说实话，之前我一直是用的gitee,GitHub用的很少。但入职前听说公司的仓库是建在GitHub里，而我直接访问GitHub的话，速度慢的一批，还会经常断连。于是，在入职前，我开始寻找能快速访问GitHub的方式，而网上大多推荐的都是这种域名映射IP的方式：
[GitHub快速访问](https://blog.csdn.net/weixin_45604606/article/details/116399620)

说实话，这种方式虽然在设置好以后可以访问到GitHub，但网速依然感人，同时经常会间歇性断开，体验极差

### 使用加速器
为了保证自己能稳定访问GitHub,我整了一个GitHub加速器

[dotnetcore/FastGithub: github加速神器，解决github打不开、用户头像无法加载、releases无法上传下载、git-clone、git-pull、git-push失败等问题](https://github.com/dotnetcore/FastGithub)

这个东西是真香，在本地安装后，打开软件再访问github,速度直接就立竿见影地快的飞起

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77386dd81b8043fbb2abc662b67aa3ed~tplv-k3u1fbpfcp-watermark.image?)

(项目运行页面)

当然，这个项目是在GitHub上的，所以对于一些网速太差，根本进不去GitHub的小伙伴来说，就出现了“想要访问GitHub就要去GitHub上下载GitHub加速器”这种悖论，因此，这个项目作者很人性化地提供了第二种下载方式：


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7ffb0b81de94a2a9ba58b499e5a4be8~tplv-k3u1fbpfcp-watermark.image?)

只要给指定邮箱发送一封邮件就可以获取代码啦！是不是非常人性化？

总之，在用了这个项目后，我访问GitHub的速度基本跟访问国内网站的速度没什么区别了。于是我感觉剩下的东西应该跟之前用Gitee差不多了，直接关机睡觉。

然鹅，这只是看起来没什么区别了

这个加速器虽然能加速GitHub这个网站的访问速度和下载速度，但对克隆仓库的的加速却并不明显（但如果直接下载压缩包还是很快的），导致我克隆项目仓库时，下载速度非常稳定地保持在20KB/s以内

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c47e50622684d8f8c2d1fcc97a9b629~tplv-k3u1fbpfcp-watermark.image?)
### 使用梯子
leader看到我那低到令人发指的下载速度，问道：

**“你不会用梯子吗？”**

于是当即丢给我一个链接：[https://glados.rocks](https://glados.rocks/)

#### 安装软件
首先要用邮箱注册一个账号，在这个过程种需要一个类似序列码的东西的时候leader把他的让我用了，但经过我的测试，直接跳过用免费试用版好像也可以，这个软件可以免费使用3天，但它良心的地方在于每天可以通过签到的方式延长免费使用的期限

可以通过这种方式进行自动化连续白嫖：[图文解释Glados自动签到免费获取天数（github action版](https://blog.csdn.net/weixin_37551036/article/details/115415358)


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b9529ccb6a041b5a189748ad18b3989~tplv-k3u1fbpfcp-watermark.image?)

之后按照系统提示流程，安装windows版本的软件


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1171b91e5799493d82292597df6cf9d5~tplv-k3u1fbpfcp-watermark.image?)

进来是这样的一个界面

后面的绿色数字是延迟，咱们只需要点击选择一个延迟最低的就可以了

之后点击上面的General,有一个port选项标识端口号，现在我这里的是7890


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbc77fc4cfc84334aa3618b8e879ce12~tplv-k3u1fbpfcp-watermark.image?)

#### git配置代理
之后，咱们要在git上配置代理

直接在桌面上使用git bash,输入以下指令在全局配置http代理
```git
git config --global http.proxy http://127.0.0.1:7890
```
注意这里最后的端口哦好7890是我们下载的梯子软件种开启的端口，如果跟我这个不同按照上面的方式查看端口号并做出修改即可

当然，如果不想在全局使用代理，只需要对某个项目使用git bash,然后输入以下命令即可

```git
git config http.proxy http://127.0.0.1:7890
```
当我们关闭梯子软件时，记得取消代理，否则会导致下一次没有开启梯子时使用git push或pull时失败的情况
```git
git config --global --unset http.proxy  //取消全局代理
git config --unset http.proxy  //对某个项目取消代理
```
接下来，再次克隆项目，速度直接达到2-3MB/s，不能说很快，但基本能够满足我们的使用了
## 使用淘宝镜像加速

克隆好项目后，我啪地一下就把项目拖进祖传的VsCode，直接执行npm install

结果....项目卡住了，半天都没下载好

既然npm不行，那就改用yarn,先果断按下ctrl+C停止进程，然后输入yarn

但万万没想到，又卡住了...

按照我以往的经验，卡住就只能一次一次慢慢试了，正当我打算一次一次跟npm死磕到底的时候，leader看到我这么久还没搞好，又一次灵魂发问：

**“你不会用淘宝镜像吗！”**

随后，他给我发了一串命令：

```git
npm config set registry https://registry.npm.taobao.org
```
随后，他又发给我第二串命令,让我用这个命令代替npm install：
```
npm install xxxx --legacy-peer-deps
```

这行命令被敲好后，随着一个清脆的回车声，不到10秒，依赖就全部下好了

讲道理，我虽然知道淘宝镜像，但平时用的比较少，主要是一般npm整不对的时候，用yarn都能解决。相比之下，淘宝镜像就用的很少了，也没想过它会这么快（以前总感觉yarn就很快了）
 ## 解决npm依赖冲突
但是，后面第二串命令我却从来没有见过，难道也是用来加速的吗？我很好奇，因此趁leader不注意，我有克隆了一份项目，然后用npm install的方式进行安装，想看看这种方式安装的速度会跟刚才有什么变化

结果....安装过程中直接报错了！！

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0650a2b27dc4f918c34cda1c3baac0a~tplv-k3u1fbpfcp-watermark.image?)

我又试了几次，最后发现，如果直接使用npm insatll 就会报错，但如果使用leader给出的神秘指令，就可以安装成功

（上班第一天就摸鱼真刺激）

那么，为什么使用那串神秘指令就可以解决错误了呢，首先，我们要知道这串指令到底干了什么

```git
npm install xxxx --legacy-peer-deps
```
网上对于这个指令的解释倒是很统一：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9944f7a472394b8195bf4d01b0464881~tplv-k3u1fbpfcp-watermark.image?)

(这么多都是搬运的同一篇文章......这里贴个原文链接：[npm install xxxx --legacy-peer-deps命令是什么？](https://bbs.huaweicloud.com/blogs/349716?utm_source=zhihu&utm_medium=bbs-ex&utm_campaign=other&utm_content=content))

经过我在网上的查证，当我们安装包时，当两个包(姑且称为A包和B包)同时依赖于第三个包（C包）时，那么npm并不会将C包在A包和B包中都安装一遍，因为如果这样的话就会造成大量的体积浪费。npm在出现这种情况时，会在公共的node模块中安装C包，然后让A包和B包进行引用。官方说法叫做**peerDependencies**，从V7版本的npm开始，就默认采用这种方式进行下载了。


这种方式虽然节省了体积，但也会导致一个问题：如果用户也在npm包中显式声明了要安装C包，同时安装C包的版本跟A包和B包依赖的C包版本又不一样，那么npm就会搞不清究竟应该安装哪个包，然后就会报错，随着我们项目体积的增大，依赖的增多，出现这种情况的概率就会增大，而这个项目光node模块就接近1.5G了，自然很容易出现问题

而--legacy-peer-deps这个指令，会指示npm忽略默认采用的peerDependencies方式进行安装，当出现上面这种冲突时，采用旧版npm的方式安装，也就是当不同依赖所需要的多个npm包的版本冲突时，会将这些版本的包都安装上。以node模块体积增大的代价解决冲突。同时深度递归（-deps），用这个方式安装所有依赖

![0MY4HC_$Q15M{}@Q6G13ZYS.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f116d310aae34e8caefd077a2959da0b~tplv-k3u1fbpfcp-watermark.image?)

但是，前面的xxxx是什么意思呢？

经过我在本地的一个demo中尝试，发现这个命令会安装一个叫xxxx的依赖（一直以为这个xxxx是关键字，居然真有这个包？？？），那么按照刚才分析出的原理，我们完全可以不写这个xxxx,直接将命令简化为：
```git
    npm install --legacy-peer-deps
```

经过尝试，在删掉package.json中的xxxx依赖后，用上面这个命令依然可以成功安装项目的node模块并运行

所以说一定要思考原理，直接CV会让你莫名其妙多下好多无效依赖！

## 快速创建分支

好不容易把仓库来下来并且可以正常运行了，leader让我在仓库中新建一个自己的分支并把代码推上去，我二话不说，直接啪的一下就点开GitHub准备新建分支，但看到leader的眼神，已经经历了好几波摧残的我突然明白，用UI界面新建显然是不够快的，要快的话应该使用命令行来完成


![W8F3@QYC2W{OQA6RC_GNEGO.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/391d52743fe242d3ba9304e5315d6cea~tplv-k3u1fbpfcp-watermark.image?)

于是我直接打开命令行，啪的一下打出

```git
    git branch xiaoxiaomeng
```
正当我自信满满地准备敲下回车时，leader又发话了：

**“你这样建立分支的话，等下还要再切换到你自己的分支，直接用checkout指令建立不就可以了吗”**

leader建议的创建方式：

```git
    git checkout -b xiaoxiaomeng
```
这样可以在创建分支的同时切换到新建的分支，相比用branch更快

## 尾声
果然，作为一个实习生，我还是不够快

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59302f49232e4751935d96d61ef5d88e~tplv-k3u1fbpfcp-watermark.image?)

文中对leader的描写纯属写文需要，其实leader本人很友善的（不是文中写的那样凶巴巴），对我也很照顾，虽然入职第一天增加了他不少工作量，但他还是很乐意帮我解决问题，真的很感谢他！

明天要继续努力啊！

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87b5d14a6e1840109ffed7ebea0ca76a~tplv-k3u1fbpfcp-watermark.image?)

我是小小蒙，正在为成为一名正式的前端工程师而不断努力！


