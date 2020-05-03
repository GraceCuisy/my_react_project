# 我的redux练习

## redux
### Action Creators理解
    是Action的创造器,Action Creators(简写actions)这个文件夹是专门用来存放Action的,
    里面存放着一个一个函数.
    每一个action对象通过一个函数生成,外面调用对应的函数生成对应的action对象
    文件分别暴露多个函数
### 



## react-redux
### 在react-redux中 Provider组件被称为顶级组件
    使用<Provider>组件标签时,要给它里面传入store对象,
    从而让所有组件中能用state和dispatch, 如果不传,在Count容器组件中
    mapStateToProps通过形参就接不到state了
### Reducers
    Reducers里面不要写业务逻辑,reducer里面可以写加,减,乘除等实实在在的动作.
    添加一个人,删除用户信息,保存用户信息
    也就是说Reducers里面可以去写直接操作状态的动作,但是不要带有逻辑判断,reducer里面就是给它,它就去做
    Reducers里面不能写如果是奇数再加,等500秒再加,如果用户不是admin再删除,如果用户非法登录了再怎么样,reducers里面是不能写任何业务逻辑的
### 函数的返回值不能等
    const incrementAsync=(value,time)=>{
        setTimeout(()=>{
            return 1
        },time)
    }
    外层函数的返回值是undefined,1作为里面函数的返回值了
    函数的返回值不能等,函数执行完,返回值就确定
    **根本不可以让函数等一等再有返回值**
### 异步action,
    1.异步action理解:
      创建'等一等'再加的action,特殊的action: 是函数,该函数会交给store,
    store底层加了判断,如果是函数就立刻调用,且传入store.dispatch
    2.异步action的执行流程:
      export const incrementAsync =(value,time)=>{
        return (dispatch)=>{
            setTimeout(()=>{
                dispatch(increment(value))
            },time)
        }
      }
      在UI组件中的props中能拿到它的父容器组件传给它的increment方法, UI组件中调用这个方法,就触发了写在方法的函数体中的dispatch(incrementAsync(value))的执行,dispatch调用=>incrementAsync调用,
      incrementAsync的返回的函数会交给store,store会立刻执行这个函数=> store设立了一个定时器,store此时还没真正拿到action对象,此时还没有触发reducer去干活,500毫秒之后会dispatch(increment()),store才拿到了真正的一个action对象,此时才触发reducer去干活.
      (理解:服务员写了一个500毫秒之后再做水煮鱼的菜单交给老板,老板拿到的还不是真正去做菜的任务,他只是脑子里记下了这个任务,定时器时间到,老板才会让reducer去干活)
    3.总结:
      所谓的异步action就是一个函数,函数里面开启了一个异步任务而已,我们称为函数式action
      我们往往会在这个函数里开启一个异步任务(定时器,Promise,ajax请求等等)
      异步action中往往都会用到同步action
      (在定时任务或异步任务成功时,再去dispatch(同步action))
    4.异步action的使用:
      (1).需要使用一个custom-middleware(中间件): redux-thunk 使用yarn安装
      (2).在store.js中引入redux-thunk用于支持异步action
        import thunk from 'redux-thunk'
      (3).export default createStore(countReducer,applyMiddleware(thunk))
### 理解延迟这个动作放在UI组件和放在action
    延迟这个动作放在UI组件:
        3分钟之后开灯,你自己掐表计算,到了3分钟,按下开关.
    延迟这个动作放在action:
        3分钟之后开灯:按下开关的同时,告诉开关,3分钟后再起作用
### redux中保存多组件数据
      redux里面保存多组件数据用的是对象形式
      对象的key名字的设计权利是交给咱们的,咱们可以起任何名字,
      value值来源于一个一个的reducer,通过一个一个的reducer得到初始化的值,并且通过reducer加工,对应的状态值会不断的发生变化,再保存到store保存的状态数据中
      {
        number:0,
        persons:[{name:'lisi',age:13}]
      }
### 多个reducer的汇总:
      在reducers文件夹中会有一个index.js文件=>用于汇总一个一个组件的reducer,
      最终生成一个总的reducer
      redux中的combineReducers方法
      combineReducers是函数,调用时要传入一个对象,这个对象就是redux中的总状态--state (名字自起,值是对应reducer)
      combineReducers的返回值是一个总reducer
      在store中引入总reducer
### 容器与UI组件的合并
    在公司里,为了方便,也不会严格区分UI组件和容器组件,会直接在容器组件中引入UI组件
    如果在写项目之初,确定不了文件是否与redux打交道,先把文件放在container容器中,后期确定文件确实不与redux打交道,再把文件拿出来放到components文件夹中
### 思考:一个普通的组件,要和redux打交道,流程是什么?
### redux开发者工具的使用(Redux DevTools)
    redux开发工具不是直接就能用,你需要写一段代码它才能识别
    1.还需要借助redux-devtools-extension 这个第三方库 用于支持redux开发者工具的使用
    2.在store.js中引入redux-devtools-extension中的composeWithDevTools方法
    3.composeWithDevTools()返回值要作为createStore的第二个参数
      如果这个位置有别的东西,作为参数传进去
      createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)));
### 内聚性 耦合性
    内聚性:自己家的那点事结合越紧密越好,代码越简洁越好
    耦合性:不要牵一发而动全身  不要干掉一个组件,另一个组件也废掉了