import React from 'react';
import { useDispatch, useSelector, useStore } from 'umi';
import { Card, Button, message } from 'antd';

const UseDIspatchPage: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state);
    const store = useStore();
    // console.log(counter);

    const addProductAction = (): void => {
        dispatch({
            type: 'product/updataList',
            payload: {
                productList: {name: 'd', age: '16'}
            }
        });
        message.info('产品列表已经更新');
    }
    return (
        <>
            <Card title="useDispatch" bordered={false} style={ {width: 300} }>
                <p>useDispatch完全代替了connect, 我们再也不用从props里获取dispatch</p>
                <Button onClick={addProductAction}>dispatch</Button>
            </Card>
        </>
    )
}
export default  UseDIspatchPage