import React, { useRef, useState, useEffect } from 'react';
import { Button, Card } from 'antd';



const UseRefPage: React.FC<{}> = () => {
    const [count, setCount] = useState<number>(0)
    const preCountRef = useRef<number>(count)
    const elRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        preCountRef.current = count
    })

    const changeRefValue = () => {
        // elRef.current.value = "我已经改变了";\
        if(elRef && elRef.current) {
            elRef.current.value = 'hahah';
        }
    }

  return (
    <div>
        <Card title="useRef" bordered={false} style={{ width: 300 }}>
            <p>useRef可以获取dom节点</p>
            <p>useRef不会触发更新</p>
            <p>ref记录上一次的count: { preCountRef.current }</p>
            <p>state的count: { count }</p>
            <input type="text" ref={ elRef } />
            <Button onClick={() => setCount(count + 1)}>加</Button>
            <Button onClick={changeRefValue}>通过Dom修改input的值</Button>
        </Card>
    </div>
  )
}
export default UseRefPage;