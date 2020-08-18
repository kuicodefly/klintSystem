import React, { useState, useMemo, memo } from 'react';
import { Button, Card } from 'antd';

interface PropType {
    count: number
}

const MemoElement = (props: PropType): JSX.Element => {
    console.log('memo组件更新了');
    return (
        <div>
            我是memo后的组件, 我只根据关联的state进行更新 { props.count }
        </div>
    )
}
const MemoChild = memo(MemoElement);

const UseMemoPage: React.FC<{}> = () => {
    const [ memoCount, setMemoCount ] = useState<number>(0);
    const [ reCount, setReCount ] = useState<number>(1);

   
    const BootCount = (): JSX.Element => {
        console.log('原始子组件更新了');
        return (
            <div>
                我是原始的组件,每次父组件的state更新, 我也会更新{ memoCount }
            </div>
        )
    }

    return (
        <div>
            <Card 
            title="useMemo"
            bordered={false} 
            style={{ width: 300 }}
            >
                <BootCount />
                <MemoChild 
                count={ useMemo( 
                    () => reCount
                    , [reCount] 
                ) } 
                />
                <Button onClick={() => { setMemoCount(memoCount + 1) }}>更新原始组件</Button>
                <Button onClick={() => { setReCount(reCount + 1) }}>更新memo组件</Button>
            </Card>
           
        </div>
    )
}
export default UseMemoPage;