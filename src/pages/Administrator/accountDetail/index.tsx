import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Typography, Divider, Form, Tabs, Input, message, Alert } from 'antd';
import { Link } from 'umi';

import { queryAccountDetail } from '@/services/accout';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { MessageFilled, MailFilled } from '@ant-design/icons';

import { AccounListType } from '../Admin';
import { sendEmail } from '@/services/accout';
import './index.less';
import { Store } from 'antd/es/form/interface';
const AccountDetail: React.FC<any> = (props) => {


    const account = props.history.location.query.account;
    
    const [accountInfo, setInfo] = useState<AccounListType>({});
    const [submitLoading, toggleLoading] = useState<boolean>(false);
    const [form] = Form.useForm();

    const getDetailInfo =  async (): Promise<any> => {
        let result = await queryAccountDetail({
            method: 'get',
            data: {
                account
            }
        });
        if (result.code === 1) {
            setInfo(result.data[0]);
            form.setFieldsValue({
                emailAddress: result.data[0].email
            });
        }
    }

    const submitAction = async (values: Store) => {
        const { emailAddress, emailContent, emailTitle } = values;
        toggleLoading(true);
        let result = await sendEmail({
            method: 'get',
            data: {
                emailUrl: emailAddress,
                emailContent: emailContent.replace(/[\r\n]/g,""),
                emailSubject: emailTitle
            }
        });
        toggleLoading(false);
        if (result === 0) {
            message.error('发送失败!');
        } else {
            message.success('发送成功');
            form.setFieldsValue({
                emailContent: '',
                emailTitle: ''
            })
        }
    }

    useEffect(()=>{
        getDetailInfo();
    }, []);


    const breadRoutes = {
        routes: [
            {
                path: '/welcome',
                breadcrumbName: '首页',
            },
            {
                path: '/admin/sub-page',
                breadcrumbName: '账号管理',
            },
            {
                path: '/Administrator/accountDetail',
                breadcrumbName: '账号详情',
            },
        ],
        itemRender: (route: any, params: void, routes: any, paths: Array<string>) => {
            const secondRoute = routes.indexOf(route) === routes.length - 1;
            return  secondRoute ? (
                <span>{route.breadcrumbName}{secondRoute}</span>
            ) : (
                <Link to={route.path} style={{color: 'rgba(0,0,0,0.65)'}}>{route.breadcrumbName}</Link>
              )
          }
    }
    const layout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 16 },
    };
    const  { Paragraph } = Typography;
    const { TabPane } = Tabs;
    return (
        <PageHeaderWrapper title="账号详情" breadcrumb={breadRoutes}>
            <div className="detail-box">
                <Descriptions title="账号详情">
                    <Descriptions.Item label="账号">
                        <Paragraph copyable>
                            {accountInfo.account}
                        </Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item label="昵称">{accountInfo.nickname || '-'}</Descriptions.Item>
                    <Descriptions.Item label="密码">
                        <Paragraph copyable>
                            {accountInfo.password}
                        </Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item label="管理员权限">{accountInfo.access}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{accountInfo.email}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{accountInfo.createTime}</Descriptions.Item>
                </Descriptions>
                <Divider orientation="left">联系用户</Divider>
                <Tabs>
                    <TabPane
                    tab={
                        <span>
                            <MailFilled />
                            邮件通知
                        </span>
                    }
                    key="2"
                    >
                        <Form
                        {...layout}
                        name="message"
                        className="email-form"
                        onFinish={submitAction}
                        form={form}
                        >
                            <Form.Item
                            label="收件人"
                            name="emailAddress"
                            rules={[
                                { required: true, message: '请输入收件人地址' },
                                { type: 'email', message: '邮箱格式不正确' }
                            ]}
                            >
                                <Input
                                placeholder="请输入收件人地址"
                                disabled={accountInfo.email ? true : false}
                                />
                            </Form.Item>
                            <Form.Item
                            label="邮件标题"
                            name="emailTitle"
                            rules={[{ required: true, message: '请输入邮件标题' }]}
                            >
                                <Input  maxLength={15} placeholder="请输入邮件标题"/>
                            </Form.Item>
                            <Form.Item
                            label="邮件正文"
                            name="emailContent"
                            rules={[{ required: true, message: '请输入邮件内容' }]}
                            >
                                <Input.TextArea  placeholder="请输入邮件内容"/>
                            </Form.Item>
                            <Form.Item 
                            wrapperCol={{ offset: 3, span: 16 }}
                            className="btn-item"
                            >
                                <Button type="primary" htmlType="submit" loading={submitLoading}>
                                    发送
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane
                    tab={
                        <span>
                            <MessageFilled />
                            短信通知
                        </span>
                    }
                    key="1"
                    >
                        <Alert
                            type="warning" 
                            showIcon
                            message="功能暂未开发,敬请期待!"
                            description="发送短信需要对接相关服务商(收费功能),该功能暂未开发!"
                        />
                    </TabPane>
                </Tabs>
                
            </div>
        </PageHeaderWrapper>
        
    )
}
export default AccountDetail;