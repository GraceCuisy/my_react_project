import React, { Component } from 'react'
import { Card,Button,Table,Modal,Form, Input,message} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import { connect } from "react-redux";
import { saveCategory,saveCategoryAsync } from "@/redux/actions/category";
import { PAGE_SIZE } from "@/config";
import { reqAddCategory,reqUpdateCategory } from "@/api";

const {Item}=Form;

@connect(
  state=>({category:state.category}), //映射状态
  {saveCategory,saveCategoryAsync} //映射操作状态的方法
)
class Category extends Component {

  state = { visible: false }; //弹框默认不显示

  // 弹窗要复用,(添加分类,修改分类) 添加=>形参是event 修改=>形参是categoryObj
  showModal = (categoryObj) => {
    // showModal一上来就重置isUpdate
    this._id=''; //留着真正发送更改分类的请求时用
    this.name=''; //做数据回显时用
    this.isUpdate=false;//判断是否为修改的标识
    const {_id,name}=categoryObj;
    if(_id && name){
      // 说明是修改
        this._id=_id; //留着真正发送更改分类的请求时用
        this.name=name; //做数据回显时用
        this.isUpdate=true;//判断是否为修改的标识
      }
    if(this.refs.categoryForm){
      this.refs.categoryForm.setFieldsValue({categoryName:this.name})
    }
    // 显示弹窗
    this.setState({visible: true});
  };

  handleOk = async () => { //确认的回调
    // 拿到用户输入的值
    const {categoryName}=this.refs.categoryForm.getFieldsValue();
    // console.log(category);
    // 做校验(坑: 如果不碰输入框,拿到的值是undefined)
    if(!categoryName || !categoryName.trim()){
      // 用户输入的值不合法 弹框提醒
      message.error('输入不能为空');
    }else{ 
      // 输入的值有效,发送添加/修改一个分类的请求,
      let result;
      if(this.isUpdate){
        result=await reqUpdateCategory(this._id,categoryName)
      }else{
        result=await reqAddCategory(categoryName);
      }
      const {status,msg}=result;
      if(status===0){
        message.success(this.isUpdate ? '修改分类成功':'新增分类成功',1)
        // 服务器已经成功添加/修改了一个分类了,但redux中还没变化,要重新请求分类列表
        this.props.saveCategoryAsync();
        // 关闭弹窗
        this.setState({visible: false,});
        // 重置表单
        this.refs.categoryForm.resetFields();
      }else{
        message.error(msg);
      }
    }
  };

  handleCancel = e => {
    const {categoryForm} = this.refs
    this.setState({visible: false,});
    // 重置表单
    categoryForm.resetFields();
  };

  componentDidMount(){
    this.props.saveCategoryAsync();
  }

  render() {
    // 表格的数据源
    const dataSource = this.props.category;
    // 表格的列配置(非常重要)
    const columns = [
      {
        title: '分类名',//列的名称
        dataIndex: 'name',//数据索引项,控制该列展示什么信息
        key: 'categoryName',//不是一个必要的属性，和该列展示什么信息，没有任何关系，写上效率高
      },
      { //高级列
        title: '操作',
        render:(categoryObj)=>{return <Button type="link" onClick={()=>{this.showModal(categoryObj)}}>修改分类</Button> }, //渲染函数
        key: 'handle',
        width:'20%',
        align:'center',
      },
    ];
    return (
      <div>
        {/* Card结构 */}
        <Card 
          extra={
            <Button type="primary" onClick={this.showModal}>
              <PlusCircleOutlined/>添加
            </Button>}
        >
          <Table
            dataSource={dataSource} 
            columns={columns}
            bordered
            rowKey='_id'
            pagination={{pageSize:PAGE_SIZE}}
          />
        </Card>
        {/* 弹框的结构 */}
        <Modal
          title={this.isUpdate ===true ? '修改分类':'新增分类'}
          visible={this.state.visible}
          onOk={this.handleOk} //点击确认的回调
          onCancel={this.handleCancel} //点击取消的回调
          okText="确定"
          cancelText="取消"
        >
          {/*initialValues表单默认值，只有初始化以及重置时生效 */}
          <Form ref="categoryForm" initialValues={{categoryName:this.name}}>
            <Item
              name="categoryName"
              rules={[
                {required:true,message:'分类名必须填写'}
              ]}
            >
              <Input placeholder="请输入分类名"/>
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default Category;
