/* Count组件的容器组件,用来和redux打交道
  容器对象并不是使用类定义或函数定义的形式生成,需要使用connect方法去生成一个容器组件
  容器组件会通过props传递给它的UI子组件状态,和操作状态的方法;
*/

// 1.引入UI组件
import Count from "../components/count/Count";
// 2.引入核心的connect方法
import { connect } from "react-redux";
// 3.引入多个action,供mapDispatchToProps方法去操作redux状态时使用
import { increment,decrement } from "../redux/actions/count";

/* 
		connect方法：
			1.connect()的返回值依然是一个函数。
			2.connect()()的返回值是一个容器组件。
			3.connect这样使用：connect(mapStateToProps，mapDispatchToProps)(UI组件)。
			4.mapStateToProps和mapDispatchToProps都是函数
			5.特别注意：mapDispatchToProps可以直接是一个对象。
			6.connect函数底层有判断，若第二个参数是对象，会加工成一个函数
*/

/* 
	mapStateToProps方法专门用于给UI组件传递redux中的状态，以props形式传递。
		1.因为：props是key-value的形式，所以mapStateToProps方法必须返回一个Object对象
		2.mapStateToProps方法所返回的那个对象的key就作为传给UI组件props的key
		3.mapStateToProps方法所返回的那个对象的value就作为传给UI组件props的value
*/

/* 
	mapDispatchToProps方法专门用于给UI组件传递redux中的状态，以props形式传递。
		1.因为：props是key-value的形式，所以mapStateToProps方法必须返回一个Object对象
		2.mapStateToProps方法所返回的那个对象的key就作为传给UI组件props的key
		3.mapStateToProps方法所返回的那个对象的value就作为传给UI组件props的value
*/


	// react-redux底层在调用mapDispatchToProps方法时会传redux中的dispatch方法
	// 返回一个属性值是方法的对象,在UI子组件中通过调用这些方法再去间接修改redux的状态

	// export default connect(
	// 				state=>({count:state}),
	// 				dispatch=>({
	// 					increment:value => dispatch(increment(value)),
	// 					decrement:value => dispatch(decrement(value)),
	// 				}))(Count);

	// connect()(),第一个小括号里面写把从redux中获取的state和dispatch映射成UI组件的props的方法
	// mapDispatchToProps你写成了对象形式,react-redux底层会给你改写成函数的形式
	export default connect(
		state=>({count:state}),
		{increment,decrement,})(Count);


