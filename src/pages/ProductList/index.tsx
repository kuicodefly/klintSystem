import React, { useState } from 'react';
import { connect } from 'dva';
import { Input, Button, List, Card } from 'antd';


interface PorductItem {
    name?: string;
    age?: string;
}

const ProductList  = (props: any) => {
    const [newProduct, addProduct] = useState<PorductItem>({});
    const handleAdd = () => {
        if (newProduct.name && newProduct.age) {
            props.dispatch({
                type: 'product/initAccountList',
                payload: {
                    productList: newProduct
                }
            })
        }
    }
    const changeState = (e: string, type: number) => {
      
        if (type === 1) {
            addProduct({
                ...newProduct,
               age: e
            });
            return;
        }
         addProduct({
            ...newProduct,
            name: e
        });
    }

    const proxyAccoun = () => {
        props.dispatch({
            type: 'product/fetchAccount',
            payload: {}
        });
    }
    return (
        <div>
            <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={props.state.productList}
            renderItem={(item: any) => (
                <List.Item>
                  <Card title={item.name}>
                      {item.age}
                  </Card>
                </List.Item>
            )}
            />
            <Input 
            value={newProduct.name} 
            onChange={(e)=>{changeState(e.target.value, 0)}} 
            />
            <Input 
            value={newProduct.age} 
            onChange={(e)=>{changeState(e.target.value, 1)}} 
            />
            <Button onClick={handleAdd}>add product</Button>
            <Button onClick={proxyAccoun}>use effects</Button>
        </div>
    )
}   
const mapStateToProps = (state: any) => {
    return {
        state: state.product,
    }
}
export default connect(mapStateToProps)(ProductList);