import React from 'react'
import { Link } from 'umi';
import { Button } from 'antd';

export default function Level1(props) {
    console.log(props);
    return (
        <div>
            <h1>父组件Level1</h1>
            <Button type="link"><Link to="./firstRouter">第一路由</Link></Button>
            <Button type="link"><Link to="./second">第二路由</Link></Button>
           <div style={{ background: '#ffffff' }}> 

           {
                props.children
            }
           </div>
        </div>
    )
}
