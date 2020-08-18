import React, { useContext } from 'react';
import { Card } from 'antd';

interface PropsType {
    context: React.Context<number>;
}

const UseContextPage: React.FC<PropsType> = (props) => {
    const { context } = props;
    const count = useContext(context);
    return (
        <div>
            
            <Card 
            title="useContext" 
            bordered={false} 
            style={{ width: 300 }}
            >
                useContext: { count }
                <p>useContext的作用于redux类似, 可以进行状态共享</p>
                <p>子组件的count同父组件的count同时更新</p>
                <p>现用父组件使用crateContext闯将一个context, 再用子组件使用useContext接收这个context</p>
            </Card>
        </div>
    )
}
export default  UseContextPage;
