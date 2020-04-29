### 我的redux练习
### 在react-redux中 Provider组件被称为顶级组件
    使用<Provider>组件标签时,要给它里面传入store对象,
    从而让所有组件中能用state和dispatch, 如果不传,在Count容器组件中
    mapStateToProps通过形参就接不到state了
