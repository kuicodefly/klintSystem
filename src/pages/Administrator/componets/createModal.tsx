import { Form, Input, Radio, Button } from 'antd';
import React,{ useState } from 'react';

import { createNewAccount } from '@/services/accout';
import './createModal.less';
import { AccounListType } from '../Admin';
interface FormType {
    info: AccounListType;
    handle: Function;
    close: Function;
}



const AccountForm: React.FC<FormType> = (props) => {
    let { info, handle, close } = props;
  
    const [submitLoading, lockLoding] = useState<boolean>(false);

    const onChangeInfo = (e: string, type: string): void => {
        if (type === 'email') {
            handle({
                ...info,
                email: e
            });
        } else if (type === 'nickName') {
            handle({
                ...info,
                nickName: e
            });
        } else if (type === 'access') {
            handle({
                ...info,
                access: e
            })
        } else {
            handle({
                ...info,
                password: e
            })
        }
    }
    const onFinish = async() => {
        lockLoding(true);
        let result = await createNewAccount({
            method: 'get',
            data: info
        });
        if (result.code === 1) {
            lockLoding(false);
            handle({});
            close();
        } else {
            lockLoding(false);
        }
    }
    const colWidth = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
        offset:2
    }
    return (
        <Form
        name="basic"
        onFinish={onFinish}
        >
            <Form.Item
            {...colWidth}
            label="邮箱"
            name="email"
            className="item-wrap"
            rules={[
                {
                    type: 'email',
                    message: '邮箱格式不正确',
                },
            ]}
            >
                <Input 
                placeholder="输入邮箱绑定账号" 
                value={info.email} 
                className="min-input"
                onChange={(e)=>{onChangeInfo(e.target.value, 'email')}}
                />
            </Form.Item>
            <Form.Item
            {...colWidth}
            className="item-wrap"
            label="昵称"
            name="nickName"
            rules={[
                {
                    type: 'string',
                    message: '昵称格式不正确',
                },
            ]}
            >
                <Input 
                placeholder="输入昵称" 
                className="min-input" 
                value={info.nickname} 
                onChange={(e)=>{onChangeInfo(e.target.value, 'nickName')}} 
                />
            </Form.Item>
            <Form.Item
            className="item-wrap"
            label="权限"
            name="access"
            rules={[{
                required: true,
                message: '请选择权限',
            }]}
            {...colWidth}
            >
                  <Radio.Group 
                  onChange={(e)=>{onChangeInfo(e.target.value, 'access')}} 
                  value={info.access} 
                  className="radio-group"
                  >
                    <Radio value='user'>user</Radio>
                    <Radio value='admin'>admin</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
            className="item-wrap"
            label="初始密码"
            name="password"
            {...colWidth}
            rules={[
                {
                    required: true,
                    message: '请输入密码'
                }
            ]}
            >
                <Input.Password 
                value={info.account} 
                className="min-input" 
                placeholder="输入初始密码"
                onChange={(e)=>{onChangeInfo(e.target.value, 'password')}}
                />
            </Form.Item>
            <Form.Item>
                <Button key="submit" loading={submitLoading} type="primary" htmlType="submit">提交</Button>
            </Form.Item>
        </Form>
    )
}
export default AccountForm;
