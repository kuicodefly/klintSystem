// import { Reducer, Effect } from 'umi';

export interface StateType {
    productList: Array<any>;
}

export interface ProductModelType {
    namespace: string;
    state: StateType;
    reducers: {
        updataList: any
    }
}

const Product: ProductModelType = {
    namespace: 'product',
    state: {
        productList: [
            {name: 'a', age: '12'},
            {name: 'b', age: '13'},
        ]
    },
    reducers: {
        updataList (state: StateType, { payload }: any ) {
            const productItem = deepClone(state);
            productItem.productList.push(payload.productList);
            return {
                ...state,
                productList: productItem.productList
            };
        }
    }
}

function deepClone(arr: StateType) {
    const obj = JSON.stringify(arr);
        return JSON.parse(obj);
}

export default Product;