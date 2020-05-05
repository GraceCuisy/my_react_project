### 我的react项目笔记

### element-ui前后台都用
    组件库一般都是为后台管理系统定制的
### Antd底层样式使用less写的
### 关于脚手架编译less文件
    react脚手架默认是无法编译less文件的,但是配置完antd的高级配置之后,
    脚手架就能够编译less了
### 验证器什么时候调用: 当输入的东西,选择的东西发生改变时调用
### onFinish表单提交的回调
    点击登录按钮之后,只有通过验证才会触发表单提交的回调
    点击登录按钮时,如果没有通过验证,会根据校验规则给你做提示,但是不会触发表单提交的回调
### 在react脚手架中配置代理
    "proxy": "http://localhost:4000"
    所有请求3000的请求都给你转发到4000的服务器上
### 如果你用axios发送请求,第二个参数写的对象, 底层直接调JSON.stringify,把你的对象转成了json字符串
    所以你相当于携带的是json格式的参数
### querystring 安装脚手架时已经自动安装了这个库了
    作用,可以把一个对象转化为urlencoded形式 qs.stringfy()
    {a:1,b:2}===>'a=1&b=2'
### 注意区别:请求成功与业务逻辑的成功是两回事
### axios.post('/login')
    axios.post('http://localhost:3000/login'
    对于简写路径的理解,你没写前面的,就是你站在哪(浏览器地址栏的路径),我就往哪给你发请求
### axios请求拦截器是在底层处理很多事之前给你的权利,底层很多事还没做
### 请求拦截器与相应拦截器的理解(地铁安检比喻)
### 在执行请求拦截器时,axios底层还没有将传入的第二个参数对象转化为json串,所以我们在
   请求拦截器里才能拿到传入的对象,将其转化为urlencoded格式
### 在公司的项目中一般用api,ajax,request文件夹用来统一配置拦截器,统一管理ajax请求
### 在公司的项目中一般用在api文件夹中用index.js,request.js,myRequest.js文件用来统一管理项目的ajax请求
### 注意 axios请求返回的status和服务器返回数据data中的status不是一个东西
### axios什么时候走成功的回调,什么时候走失败的回调?
    走成功的回调:返回的状态码是2开头
    走失败的回调:
            1.返回的状态码不是2开头
            2.达到了超时时间
            3.网络不通
### axios封装的发送请求返回的response.code和http的状态码是一一对应的关系
### 关于axios中的偏爱图标请求: 代理转发请求,不是很生硬的帮你转发
    比如你向3000端口要网站偏爱图标,代理发现3000上存在偏爱图标,就把数据返给你,
    如果在3000端口没有找到数据才会转发给4000端口的服务器
### axios改变了请求的参数的类型,不用自己加请求头,axios内部会帮你自动加上
### 响应状态码
    404: 请求资源未定位
    401: 请求资源已经找到,但是没有权限查看,被回绝了
### react脚手架配置代理
### 关于ES6模块化和commonJS在项目中的使用
    你写组件的时候用前端人员喜欢用的ES6的模块化
    但是写各种配置的时候是在改webpack的配置,webpack是基于Node的,
    Node中用的是CJS(commonJS),所以写配置时用commonJS
### 配置路径别名
    用一个字符串代替一个文件的根路径
### config-overrides.js文件
    项目都是用webpack搭建的,webpack最重要的就是配置(config),
    webpack的配置很重要,项目中没有直接暴露出来,怕我们一碰就碰坏了
    我们可以用config-overrides.js文件把我们要配置的东西带过去,内部去修改,如果我们改错了,
    可以直接把这个文件一删,但是webpack的配置还是可用的.
### path是Nodejs中的一个内置库,Nodejs中内置了很多库, 项目是webpack搭建的,webpack基于nodejs
    所以我们在项目中可以直接引入path这个库进行使用
### __dirname是nodejs中的一个内置变量,能拿到当前文件所在文件夹的根路径
### 一个应用是从路由开始架构的
### 关于screenfull全屏的一些坑
    1.使用toggle方法就自动带检测了,不要使用request  screenfull.toggle();
    2.onchange检测全屏切换的方法,调用时传一个回调
    3.注意浏览器全屏和页签全屏,我们程序员不能用代码控制浏览器全屏(f11);
      我们只能控制网页的全屏
### 大多数网站进度条都是假的,用nprogress包
    1.引入Nprogress对象 
    2.引入样式
### redux是把东西存在内存中, 而localStorage是把东西存放在硬盘中
    使用localStorage的场景:不用local能实现功能的时候,

### 装饰器语法
    装饰器函数也是函数,为什么称之为装饰器函数:
        传入一个类或对象经过这个函数,就给类或对象身上添加了一些属性,相当于家里面房子装修
    三种情况:
      一.如果装饰器函数没有return,那么就是正常的装饰
      二. 如果装饰器函数有返回值,那么就把被装饰的人改写了,被装饰的人被赋值为了函数的返回值
          函数返回啥,我的被装饰的人就变成了啥
      三.
### 注意indexOf  Of 首字母是大写
### 关于admin中Header组件中的时间更新的问题
    时间每一秒钟变化一下,所以页面上有东西在动
    是谁在驱动着页面的刷新呢,一定是状态.
    所以页面中发生周期性变化的东西,最好放在状态里面
### react 和vue都是状态驱动着页面显示,只要状态发生了变化,react会自动帮你重新渲染页面,如果状态不变,react就不会刷新页面

### 尽量不要给生命周期钩子加上async
### 关于src下的assets(static)文件夹, 是存放静态资源的文件夹
    这里面放的东西是大家都在用的
