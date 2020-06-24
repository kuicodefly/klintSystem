import React, { useState } from 'react';
import { connect } from 'dva';
import { Input, Button } from 'antd';


interface PorductItem {
    name?: string;
    age?: string;
}

const ProductList  = (props: any) => {
    const [newProduct, addProduct] = useState<PorductItem>({});
    const handleAdd = () => {
        console.log(newProduct);
        if (newProduct.name && newProduct.age) {
            props.dispatch({
                type: 'product/updataList',
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

    return (
        <div>
            产品列表:
            <ul>
                {
                    props.productList.productList.map((element: any, index: number) => {
                        return <li key={index}>{ element.name }: {element.age}</li>
                    })
                }
            </ul>
           <Input value={newProduct.name} onChange={(e)=>{changeState(e.target.value, 0)}} />
           <Input value={newProduct.age} onChange={(e)=>{changeState(e.target.value, 1)}} />
            <Button onClick={handleAdd}>add product</Button>
        </div>
    )
}   
const mapStateToProps = (state: any) => {
    return {
        productList: state.product
    }
}
export default connect(mapStateToProps)(ProductList);