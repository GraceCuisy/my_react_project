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
