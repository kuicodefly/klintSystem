import React, { useState, useEffect } from 'react';

import { Input, Table, Button, Select, message, Modal, Popconfirm, notification, Tag } from 'antd';
import { history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined  } from '@ant-design/icons';
import { fetchAccountList, qeurySomeAccount, deleteAccount } from '@/services/accout';
import AccountForm from './componets/createModal';

import './Admin.less';

export interface AccounListType {
  account?: string;
  nickname?: string;
  email?: string;
  access?: string;
  password?: string;
  createTime?: string;
}
interface KeywordType {
  emial?: string;
  account?: string;
  access?: string;
}

const accountAdmin: React.FC<{}> = () => {
  const [accountList, updateAccountList] = useState<Array<AccounListType>>([]);
  const [kewywordInfo, setKeyword] = useState<KeywordType>({});
  const [visible, toggleVisible] = useState<boolean>(false); 
  const [newAccount, setNewAccount] = useState<AccounListType>({});

  useEffect(()=>{
    getAccountdData();
  }, [])
 
  const getAccountdData =  async(): Promise<void> => {
    const result = await fetchAccountList({
      method: 'get',
      data: {
        account: localStorage.getItem('account')
      }
    });
    if (result.code === 1) {
      updateAccountList(result.data);
    }
  }
  const inpuKeyword = (e: string, type: string) => {
    if (type === 'account') {
      setKeyword({
        ...kewywordInfo,
        account: e
      });
    }else if (type === 'emial') {
      setKeyword({
        ...kewywordInfo,
        emial: e + '.com'
      });
    } else if (type === 'access') {
      setKeyword({
        ...kewywordInfo,
        access: e
      });
    }
  }
  const searchAccounInfo = async() => {
    let result = await qeurySomeAccount({
        method: 'get',
        data: kewywordInfo
    });
    if (result.code === 1) {
      updateAccountList(result.data);
    } else {
      message.warning('查询失败请重试');
    }
  }
  const confirmDelete = async (account?: string) => {
    let result = await deleteAccount({
      method: 'get',
      data: {
        account
      }
    });
    if (result.code === 1) {
      notification['success']({
        message: '提示',
        description: `账号:${account}删除成功!`
      });
      getAccountdData();
    } else {
      notification['error']({
        message: '提示',
        description: `账号:${account}删除失败!`
      });
    }
  }
  const updateList = () => {
    toggleVisible(false);
    getAccountdData();
  }
  const visibleDetail = (account?: string) =>{
    history.push(`/Administrator/accountDetail?account=${account}`);
  }
  const visiblePop = (record: AccounListType) => 
    record.access === 'admin' ? 
    <Button type="link" disabled>删除</Button> :
    <Popconfirm
    placement="top"
    title='提示'
    onConfirm={()=>{confirmDelete(record.account)}}
    okText="Yes"
    cancelText="No"
    >
      <Button type="link">删除</Button>
    </Popconfirm>;


  const columns: Array<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: number) => <span>{text}</span>,
      align: 'left'
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
      render: (text: string) => <span>{text}</span>,
      align: 'left'
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
      render: (text: string) => <span>{text}</span>,
      align: 'left'
    },
    {
      title: '邮箱',
      dataIndex: 'mail',
      key: 'mail',
      render: (text: string) => <span>{text || '-'}</span>,
      align: 'left'
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: string) => <span>{text}</span>,
      align: 'left',
      sorter(a: AccounListType, b:AccounListType) {
        let dateA = new Date(a.createTime || ''),
            dateB = new Date(b.createTime || '');
        return dateA.getTime() - dateB.getTime();
      }
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      render: (text: string) => <span>{text || '-'}</span>,
      align: 'center'
    },
    {
      title: '权限',
      dataIndex: 'access',
      key: 'access',
      render: (text: string) => 
      text === 'admin' ? <Tag color="blue">{text}</Tag> : <Tag color="green">{text}</Tag>
    },
    {
      title: '操作',
      dataIndex: 'handle',
      key: 'handle',
      render: (text: string, record: AccounListType) => 
      <div className="handle-box">
        { visiblePop(record)} |
        <Button type="link" onClick={()=>{visibleDetail(record.account)}}>详情</Button>
      </div>
      ,
      align: 'center'
    }
  ]
  const { Option } = Select;

  return (
    <PageHeaderWrapper>
      <div className="account-container">
        <Modal
         title="创建账号"
         visible={visible}
         onCancel={()=>{toggleVisible(false)}}
         footer={null}
        >
         <AccountForm info={newAccount} handle={setNewAccount} close={updateList} />
        </Modal>
        <div>
          <div className="input-box">
            <Input.Group className="input-group">
              <div>
                <span>账号查询:</span>
                <Input 
                className="min-input" 
                placeholder="输入账号" 
                onChange={(e)=>{inpuKeyword(e.target.value, 'account')}} 
                value={kewywordInfo.account} 
                /> 
              </div>
              <div>
                <span>邮箱查询:</span>
                <Input 
                className="min-input" 
                placeholder="输入邮箱" 
                onChange={(e)=>{inpuKeyword(e.target.value, 'email')}}
                value={kewywordInfo.emial}
                suffix=".com"
                /> 
              </div>
              <div>
                <span>权限查询:</span>
                <Select 
                size="large" 
                placeholder="选择账号类型" 
                value={kewywordInfo.access} 
                onChange={(e)=>{inpuKeyword(e, 'access')}}
                >
                  <Option value="admin">admin</Option>
                  <Option value="user">user</Option>
                </Select>
              </div>
            </Input.Group>
            <div className="btn-group">
              <Button type="primary" onClick={searchAccounInfo}>查询</Button>
              <Button type="default" onClick={()=>{setKeyword({})}}>重置</Button>
            </div>
          </div>
        </div>
        <Button icon={<PlusOutlined />} onClick={()=>{toggleVisible(true)}}>创建账号</Button>
        <Table dataSource={accountList} columns={columns} rowKey="account" />
        
      </div>
    </PageHeaderWrapper>
  )
}
export default accountAdmin