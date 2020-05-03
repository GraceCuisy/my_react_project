/* Count组件的容器组件,用来和redux打交道 */

// 1.引入UI组件
import Person from "../components/Person";
// 2.引入核心的connect方法
import { connect } from "react-redux";
import {addPerson} from "../redux/actions/person";
// 3.向外暴露容器对象
export default connect(
  state=>({
    person:state.person,
    number:state.count,
  }), //一般不传方法时也最好留一个空对象
  {addPerson})(Person);