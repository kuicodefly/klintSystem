import React, { useEffect, useState, useCallback } from 'react';
import { Card, Button } from 'antd';

interface PropType {
    callback: Function;
}
const CallbaclChild = (props: PropType): JSX.Element => {
    
    useEffect(() => {
        props.callback();
    }, [props.callback]);

    return (
        <div>
            useCallback
        </div>
    )
}

const UseCallbackPage: React.FC<{}> = () => {

    const [ deCallbackCount, setDeCallbackCount ] = useState<number>(0);

    const [ callbackCount, setcallbackCount ] = useState<number>(1);


    const callback = useCallback(
        (): void => console.log('函数执行了'),
        [callbackCount]
    )

    return (
        <>
            <Card 
            title="useCallback"
            bordered={false}
            style={{ width: 300 }}
            >
                <p>deCallbackCount: { deCallbackCount }</p>
                <p>callbackCount: { callbackCount }</p>
                <p>useCallback和useMemo的功能类似, useCallback常用于父传给子一个函数</p>
                
                <CallbaclChild  callback={callback}/>
                <Button onClick={() => {
                    setDeCallbackCount(deCallbackCount + 1)
                }}>重新执行函数</Button>

                <Button
                onClick={
                    () => setcallbackCount(callbackCount + 1)  
                }
                >
                    更新函数
                </Button>
            </Card>
        </>
    )
}

export default UseCallbackPage;