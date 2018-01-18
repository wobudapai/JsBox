# JsBox
[点击预览](http://code.smallcfj.club)

采用Vue+nodejs实现的在线Js编辑器，前后台通过接口进行访问，可以在线编辑、保存、分享Js代码，实现了简单的响应式。
前台：vue
后台：nodejs、文件存储
## 界面预览
深色风格界面（装逼专用(〃'▽'〃)）
![](https://github.com/zycfj/JsBox/blob/master/image/1.png?raw=true)
左边可以收起来，中间的横条可以上下拉动噢
![](https://github.com/zycfj/JsBox/blob/master/image/2.png?raw=true)
为了防止重复提交，搞了个简单的验证码，诗歌验证
![](https://github.com/zycfj/JsBox/blob/master/image/3.png?raw=true)
## 运行
下载项目到本地，里面有两个文件夹：
front-vue：采用vue实现的简单单页应用，访问接口与后台通信
JsBox：项目后台，主要采用文件的方式存储信息

1、进入JsBox文件夹
```javascript

// 安装项目的依赖包
npm install

// 运行
npm start
```

2、进入front-vue文件夹
```javascript
// 安装项目的依赖包
npm install

// 运行
npm run dev
```
