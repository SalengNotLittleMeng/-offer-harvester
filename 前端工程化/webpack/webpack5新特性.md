# webpack5新特性

1.静态文件处理
webpack5直接内置了之前file- loader+url-loader+raw-loader的处理文件组合，直接可以对静态/二进制文件进行处理
2.内置持久化缓存，无需跟webpack4一样调用chache-loader对资源结果进行缓存
3.内容哈希，webpack4的哈希值会根据时间戳进行生成，webpack5则是真正的内容哈希值
4.支持多个webpack同时构建
5.碰到web worker 后，会自动增加打包入口，保证相对路径
6.支持追踪嵌套的tree shaking
7.内部tree-shaking,比如一个暴露的函数未被调用，则这个函数调用的函数也会一同被清理掉。可以通过"sideEffects": false开启
8，增加了部分对common.js的支持
9.配置细化，target配置可以精确指定node版本或浏览器支持列表，来打出对应的包
10.SplitChunks支持wsmb
11.更新了解析器，优化了性能支持更多的依赖追踪