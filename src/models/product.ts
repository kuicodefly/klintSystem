// import { Reducer, Effect } from 'umi';


import { Reducer, Effect } from "umi";

import { queryUserAsync } from '@/services/accout';

export interface StateType {
    productList: Array<any>;
    accountList: Array<any>;
}

export interface ProductModelType {
    namespace: string;
    state: StateType;
    reducers: {
        initAccountList: Reducer;
    };
    effects: {
        fetchAccount: Effect;
    }
}

const Product: ProductModelType = {
    namespace: 'product',
    state: {
        productList: [
            {name: 'a', age: '12'},
            {name: 'b', age: '13'},
        ],
        accountList: []
    },
    effects: {
        *fetchAccount({ payload }, { call, put }) {
            console.log('effects');
            let response = yield call(queryUserAsync, {
                account: localStorage.getItem('account')
            });
            // let obj = response.msg
            yield put({
                type: 'initAccountList',
                payload: {
                    productList: {
                        name: response.msg,
                        age: response.code
                    }
                }
            })
            console.log(response);
        }
    },
    reducers: {
        // 初始化数组赋值操作
        initAccountList (state, { payload } ) {
            console.log(payload);
            let productItem = deepClone(state);
            productItem.productList.push(payload.productList);
            return {
                ...state,
                productList: productItem.productList
            };
        }
    }
}
function deepClone(arr: StateType) {
    let _obj = JSON.stringify(arr);
        return JSON.parse(_obj);
}
export default Product;