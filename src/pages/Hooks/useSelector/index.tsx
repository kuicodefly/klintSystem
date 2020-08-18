import React from 'react';
import { useSelector } from 'umi';
import { Card } from 'antd';

const UseSelectorPage: React.FC<{}> = () => {
    const select: any = useSelector(state=>state);
    
    console.log(select);
    return (
        <Card bordered={false} style={{ width: 300 }}>
            useSelector可以拿到全部的state, 完全取代了mapstateToProps的connect写法
            {
                select.product.productList.map((item: any, index: number) => 
                    <p key={ index }>姓名:{ item.name}, 年龄: { item.age }</p>
                )
            }
            <p>用户: { select.user.currentUser.name}</p>
        </Card>
    )
}
export default UseSelectorPage;