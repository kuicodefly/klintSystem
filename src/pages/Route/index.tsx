import React, { useState, useEffect, createContext, useReducer } from 'react';
import { Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { BreadcrumbProps } from 'antd/es/breadcrumb';

interface PropType {
    children: JSX.Element;
    histroy: History;
    type: PropType;
}
interface RouterProps {
    path: string;
    breadcrumbName: string;
}

interface BreadcrumbProps {
    routes: Array<RouterProps>
}
interface ReducerType {
    type: string;
    payload?: BreadcrumbProps;
}
const Route: React.FC<PropType> = props => {
    const initRouteSate: RouterProps = [
        {
            path: '',
            breadcrumbName: '首页',
         
        },
        {
             path: '/',
             breadcrumbName: '路由'
        },
        {
            path: '/first',
            breadcrumbName: '第一路由'
        }
    ];
    const routerContext = createContext(initRouteSate);

    // console.log(props.children);
    // const headRoute = const
    const { histroy, children, type } = props;
    // console.log(children);
    // console.log(type);
    const [breadcrumb, setBreadcrumb] = useState<BreadcrumbProps>({
        routes: [
           {
               path: '',
               breadcrumbName: '首页',
            
           },
           {
                path: '/',
                breadcrumbName: '路由'
           },
           {
               path: '/first',
               breadcrumbName: '第一路由'
           }
        ]
    });
   
    const reducer = (state: RouterProps, action: ReducerType) => {
        switch (action.type) {
            case 'UPDATE_ROUTER':
                return {
                    ...action.payload
                }
            default:
                return state;
        }
    }
    
    const [ routeState, dispatch ] = useReducer(reducer , initRouteSate);
 
    return (
        <PageHeaderWrapper breadcrumb={ breadcrumb } title={breadcrumb.routes[2].breadcrumbName}>
            <div>
                <h1>routes</h1>
                <Link to="/route/first">
                    to first
                </Link>
                <Link to="/route/second">
                    to second
                </Link>
                <Link to="/route/last">
                    to last
                </Link>
                <routerContext.Provider  value={routeState}>
                    {
                        React.cloneElement(props.children, {
                            context: routerContext,
                            dispatch
                        })
                    }
                    {/* { props.children } */}
                </routerContext.Provider>
                
            </div>
        </PageHeaderWrapper>
    )
}

export default Route;