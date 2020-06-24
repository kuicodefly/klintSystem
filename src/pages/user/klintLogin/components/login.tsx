import { getPageQuery } from '@/utils/utils';

import { Input, Button, message } from 'antd';
import { history, useModel } from 'umi';
import { connect } from 'dva';
import { loginAction } from '@/services/login';
import React, { useState } from 'react';

import { setAuthority } from '@/utils/authority';

interface PropData {
    toggleIndex: Function;
}
const Login = (props: PropData) => {
    const [account, setAccount]  = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { refresh } = useModel('@@initialState');
    const toggleIndex =  props.toggleIndex;

    const replaceGoto = () => {
        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        // let { redirect } = params as { redirect: string };
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);
        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     window.location.href = '/';
        //     return;
        //   }
        // }
        // history.replace(redirect || '/');
        localStorage.setItem('account', account);
        console.log('aaa');
        history.push('/welcome');
    };

    const handleLogin = async () => {
        if ( account && password) {
            let result = await loginAction({
                data: {
                    account,
                    password
                },
                method: 'get'
            });
            if (result.code !== 1) {
                message.error('账号或密码错误!');
                setAccount('');
                setPassword('');
                return;
            }
            let access = result.data[0].access;
            replaceGoto();
            setAuthority(access);
            setTimeout(()=>{
                refresh();
            }, 0)
        } else {
            message.warning('请补全信息');
        }
    }

    const inputAccount = (e: string) => {
        setAccount(e);
    }

    const inputPassword = (e: string) => {
        setPassword(e);
    }
    return (
        <div className="login-item item-type">
            <Input 
            type="text" 
            className="info-input" 
            placeholder="请输入账号"
            value={account}
            onChange={(e) => {inputAccount(e.target.value)}}
            />
            <Input 
            type="password" 
            className="info-input"
            placeholder="请输入密码" 
            value={password}
            onChange={(e)=>{inputPassword(e.target.value)}}
            />
            <div className="forget-link">
                <span className="link-btn" onClick={()=>{toggleIndex(1)}}>忘记密码</span>
            </div>
            <Button type="primary" onClick={handleLogin}>登录</Button>
        </div>
    )
}
 Login; 
export default connect(({ user }: ConnectState) => ({
    currentUser: user.currentUser,
  }))(Login);