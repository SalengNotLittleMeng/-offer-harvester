webpack构建流程：

合并配置（cli,config,node）

初始化compiler（负责编译）和compilation（负责构建）对象

获取入口，从入口开始遍历，每遍历到一个文件先包装成module对象，并执行对应的loader

解析为ast，并进行依赖收集（注意这里使用acorn进行ast解析，因此webpack仅支持JS文件，这也是loader存在的原因）

依赖收集并递归，构建出依赖图

开始生成（seal）阶段，再次找到entry并遍历，创建bundle

bundle生成bundle图

对bundle进行优化（切割，压缩，混淆，按照配置拆分文件等）

生成运行时代码

创建assest静态文件夹

输出打包文件