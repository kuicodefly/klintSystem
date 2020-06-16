 import React, { useState } from 'react';
 import { Input, Button } from 'antd';

// import { sendMail } from '@/services/login';

 interface PropData {
    toggleIndex: Function;
}
 const Forget = (props: PropData) => {
    // const sendMsg = async () => {
    //     let reasult = await sendMail({
    //        data: {
    //         emialUrl: 'kuicode0066@163.com',
    //         randomCode: '3333'
    //        },
    //        method: 'get'
    //     });
    //     console.log(reasult);
    // }

     return (
        <div className="forget-item item-type">
            <span className="forget-link link-btn" onClick={()=>{props.toggleIndex(0)}}>返回登录</span>
                <Input suffix=".com" className="email-input" placeholder="输入账号所绑定的邮箱" />
                <div className="code-item">
                    <Input placeholder="输入验证码" />
                    <Button type="primary" size="large">获取验证码</Button>
                </div>
                <Input type="password" placeholder="请输入新密码" />
                <Input type="password" placeholder="再次确认密码" />
                <Button type="primary" className="submit-btn" size="large">确认</Button>
        </div>
     )
 }
 export default Forget;