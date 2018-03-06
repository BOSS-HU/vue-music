技术栈
【前端】

Vue：用于构建用户界面的 MVVM 框架。它的核心是响应的数据绑定和组系统件
vue-router：为单页面应用提供的路由系统，项目上线前使用了 
vuex：Vue 集中状态管理，在多个组件共享某些状态时非常便捷
vue-lazyload：第三方图片懒加载库，优化页面加载速度
better-scroll：iscroll 的优化版，使移动端滑动体验更加流畅
stylus：css 预编译处理器
ES6：ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等方法非常好用
【后端】

Node.js：利用 Express 起一个本地测试服务器
jsonp：服务端通讯。抓取 QQ音乐(移动端)数据
axios：服务端通讯。结合 Node.js 代理后端请求，抓取 QQ音乐(PC端)数据
【自动化构建及其他工具】

webpack：项目的编译打包
vue-cli：Vue 脚手架工具，快速搭建项目
eslint：代码风格检查工具，规范代码格式

收获
总结出一套适用于 Vue项目的通用组件
总结了一套常用的 SCSS mixin 库
总结了一套常用的 JS 工具函数库
学会了如何在Vue中优雅的操作Dom来完成优秀的用户交互体验

实现页面
主要页面：播放器内核页、推荐页、歌单详情页、歌手页、歌手详情页等。

核心页面：播放器内核页

推荐页

上部分是一个轮播图组件，使用第三方库 better-scroll 辅助实现，使用 jsonp 抓取 QQ音乐(移动端)数据

下部分是一个歌单推荐列表，使用 axios + Node.js 代理后端请求，绕过主机限制 (伪造 headers)，抓取 QQ音乐(PC端)数据

歌单推荐列表图片，使用图片懒加载技术 vue-lazyload，优化页面加载速度

为了更好的用户体验，当数据未请求到时，显示 loading 组件


歌手页

左右联动是这个组件的难点

左侧是一个歌手列表，使用 jsonp 抓取 QQ音乐(PC端)歌手数据并重组 JSON 数据结构

列表图片使用懒加载技术 vue-lazyload，优化页面加载速度

右侧是一个字母列表，与左侧歌手列表联动，滚动固定标题实现

歌手页 -> 歌手详情页

复用歌单详情页，只改变传入的参数，数据同样爬取自 QQ音乐

播放器内核页

核心组件。用 vuex 管理各种播放时状态，播放、暂停等功能调用 audio API

播放器可以最大化和最小化

中部唱片动画使用第三方 JS 动画库 create-keyframe-animation 实现

底部操作区图标使用 iconfonts。

抽象了一个横向进度条组件和一个圆形进度条组件，横向进度条可以拖动小球和点击进度条来改变播放进度，圆形进度条组件使用 SVG <circle> 元素

播放模式有：顺序播放、单曲循环、随机播放，原理是调整歌单列表数组

歌词的爬取利用 axios 代理后端请求，伪造 headers 来实现，先将歌词 jsonp 格式转换为 json 格式


其他

此应用的全部数据来自 QQ音乐，推荐页的歌单列表及歌词是利用 axios 结合 node.js 代理后端请求抓取的。

全局通用的应用级状态使用 vuex 集中管理

全局引入 fastclick 库，消除 click 移动浏览器300ms延迟

页面是响应式的，适配常见的移动端屏幕，采用 flex 布局

注意
此音乐播放器数据全部来自 QQ 音乐，接口改变了就需要修改 jsonp 和 axios 代码
