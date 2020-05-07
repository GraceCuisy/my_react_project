import React, { Component } from 'react'
import { Card,Button,Table,Modal,Form, Input,} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
// import { reqCategoryList } from "@/api";
import { connect } from "react-redux";
import { saveCategory,saveCategoryAsync } from "@/redux/actions/category";

const {Item}=Form;

@connect(
  state=>({category:state.category}), //映射状态
  {saveCategory,saveCategoryAsync} //映射操作状态的方法
)
class Category extends Component {

  state = { visible: false }; //弹框默认不显示

  showModal = () => {this.setState({visible: true,});};

  handleOk = e => {
    this.setState({visible: false,});
  };

  handleCancel = e => {
    this.setState({visible: false,});
  };


  // state={
  //   categoryList:[],
  // }

  // 同步action版
  /* getCategoryList=async ()=>{
    const result=await reqCategoryList();
    console.log(result);
    const {status,data}=result;
    if(status===0){
      //this.setState({categoryList:data});
      this.props.saveCategory(data);
    }
  } */



  componentDidMount(){
    // this.getCategoryList();
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
        render:()=>{return <Button type="link">修改分类</Button> }, //渲染函数
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
            pagination={{pageSize:3}}
          />
        </Card>
        {/* 弹框的结构 */}
        <Modal
          title="新增分类"
          visible={this.state.visible}
          onOk={this.handleOk} //点击确认的回调
          onCancel={this.handleCancel} //点击取消的回调
          okText="确定"
          cancelText="取消"
        >
          <Form>
            <Item
              name="category"
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
