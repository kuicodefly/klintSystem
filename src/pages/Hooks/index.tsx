import React, { createContext, useState } from 'react';
import { Tabs, Button } from 'antd';

import UseContextPage from './useContext';
import UseMemoPage from './useMemo';
import UseCallbackPage from './useCallback';
import UseDispatchPage from './useDispatch';
import UseSelectorPage from './useSelector';
import UseRefPage from './useRef';

const Context = createContext<number>(0);

const HooksWarp: React.FC<{}> = () => {

    const [count, setCount] = useState<number>(0);

    const { TabPane } = Tabs; 

    const increaseCount = (): void => {
        const preCount = count + 1;
        setCount(preCount);
    }

    return (
        <div>
            <h1>Hooks</h1>
            <div>
                count: { count }
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="useState" key="1">
                    useState
                </TabPane>
                <TabPane tab="useEffect" key="2">
                    useEffect
                </TabPane>
                <TabPane tab="useMemo" key="3">
                    <UseMemoPage />
                </TabPane>
                <TabPane tab="useContext" key="4">
                    <Context.Provider value={count}>
                        <UseContextPage context={Context} />
                    </Context.Provider>
                    <Button onClick={increaseCount}>increase count</Button>
                </TabPane>
                <TabPane tab="useCallback" key="5">
                    <UseCallbackPage />
                </TabPane>
                <TabPane tab="useDispatch" key="6">
                    <UseDispatchPage />
                </TabPane>
                <TabPane tab="useSelector" key="7">
                   <UseSelectorPage />
                </TabPane>
                <TabPane tab="useRef" key="8">
                   <UseRefPage />
                </TabPane>
            </Tabs>
        </div>
    )
}
export default HooksWarp;