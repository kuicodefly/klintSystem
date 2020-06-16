import React, { useState, ReactElement } from 'react';

import Forget from './components/forget';
import Login from './components/login';

import './style.less';

interface StringArray {
    [index: number]: string;
}
 interface ElementArray {
    [index: number]: ReactElement;
}
const KlintLogin: React.FC<{}> = () => {
    // 切换操作面板的索引
    const [handleIndex, toggleIndex] = useState<number>(0);
    // 操作面板的标题
    const handleType:StringArray = ['账号登录', '找回密码'];
    // 操作面板模块集合
    const contentOptions:ElementArray = [
        <Login toggleIndex={toggleIndex} />, 
        <Forget toggleIndex={toggleIndex} />
    ];
    return (
        <div className="login-warpper">
            <div className="login-content">
                <div className="login-input" >
                    <h2>{handleType[handleIndex]}</h2>
                    {
                        contentOptions[handleIndex]
                    }
                </div>
            </div>
        </div>
    )
};

export default KlintLogin;