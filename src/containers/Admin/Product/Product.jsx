import React, { Component } from 'react'
import { Card,Button,Select,Input,Table,message} from 'antd';
import {PlusCircleOutlined,SearchOutlined} from '@ant-design/icons';
import { reqProductList,reqSearch } from "@/api";
import { PAGE_SIZE } from "@/config";

const { Option } = Select;

export default class Product extends Component {

  state={
    productList:[],
    total:0,
    searchType:'productName', //搜索方式,默认是按名称搜索
    keyword:'', //搜索关键字
  }

  getProductList=async (pageNumber=1)=>{ //指定当前页码的形参默认值是1
    let result;
    if(this.isSearch){
      // 点击搜索按钮,根据状态中的searchType,keyword去发送请求
      const {searchType,keyword}=this.state;
      result=await reqSearch(searchType,keyword,pageNumber,PAGE_SIZE);
    }else{
      result =await reqProductList(pageNumber,PAGE_SIZE);
    }
    console.log(result);
    const {status,data,msg}=result;
    const {list,total}=data;
    if(status===0){
      // 业务逻辑成功,真正得到数据
      this.setState({productList:list,total})
    }else{
      message.error(msg);
    }
  }

  componentDidMount(){
    // 在组件一挂载的时候就去请求商品列表数据(分页)
    this.getProductList(1);
  }

  render() {
    // 表格的数据源
    const dataSource = this.state.productList;
    // 表格列配置
    const columns = [
      {
        title: '商品名称', //列标题
        dataIndex: 'name', //数据索引项,显示数据源中的哪个信息
        key: 'name',//不是必须的
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        align:'center',
        dataIndex: 'price',
        render:(price)=> '￥'+price,
        key: 'price',
      },
      {
        title: '状态',
        align:'center',
        dataIndex:'status',
        render:(status)=>
            (
              <div>
                <Button type={status===1? 'danger':'primary'}>{status===1? '下架':'上架'}</Button><br/>
                <span>{status===1? '在售':'售罄'}</span>
              </div>
            ),
        key: 'status',
      },
      {
        title: '操作',
        // dataIndex: '',
        align:'center',
        render:()=>
          (
            <div>
              <Button type="link">详情</Button><br/>
              <Button type="link">修改</Button>
            </div>
          ),
        key: 'handle',
      },
    ];

    return (
      <Card 
        title={
          <div>
            <Select defaultValue="productName" onChange={value=>
              this.setState({searchType:value})
              }
            >
              <Option value="productName">按名称搜索</Option>
              <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input 
              style={{width:'20%',margin:'0 10px'}} 
              placeholder="请输入搜索关键字"
              onChange={(event)=>
                this.setState({keyword:event.target.value})
              }
            />
            <Button 
              type="primary" 
              onClick={()=>{
                this.isSearch=true;
                this.getProductList()
              }}
            ><SearchOutlined/>搜索</Button>
          </div>
        } 
        extra={<Button type="primary"><PlusCircleOutlined/>添加</Button>}
      >
        <Table 
          bordered
          rowKey='_id'
          dataSource={dataSource} 
          columns={columns}
          pagination={{
            total:this.state.total,
            pageSize:PAGE_SIZE,
            onChange:(pageNumber)=>{ //onChange不能动态的指定,只能写一个,
                                      // 所以要把两个请求函数融合成一个
              this.getProductList(pageNumber)
            }
          }}
        />
      </Card>
    )
  }
}
