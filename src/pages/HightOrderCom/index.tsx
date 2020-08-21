import React, { useState } from 'react'

import Comp1 from './comp1';
import { Button, Modal } from 'antd';

const A = () => {
    return (
        <div>哈哈哈哈哈哈</div>
    )
}

export default function HightOrder() {

    const [visible, setVisible] = useState(false);
    
    return (
        <div>
            hhh
            <Modal
            visible={visible}
            title="llll"          
            >
                <div>
                    llllll
                </div>
            </Modal>
            
            {/* <Comp1 
            visible={visible}
            >
                <A />
            </Comp1> */}
            <Button onClick={() => { setVisible(!visible) }}> open modal</Button>
        </div>
    )
}
