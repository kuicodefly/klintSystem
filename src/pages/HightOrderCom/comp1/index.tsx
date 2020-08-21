import React, { useState, useEffect } from 'react';

import './index.less'
import { Modal } from 'antd'

interface PropsType {
    visible: boolean;
    children: JSX.Element;
}

export default function Comp1 (props: PropsType) {
    console.log('object', props);
    const { visible } = props;
    console.log(visible);
    const [action, setAction] = useState(false);
    useEffect( () => { setAction(visible)  }, [visible] );
    const hiddenStyle = {
        display: 'none'
    }
    const showStyle = {
        display: 'block'
    }
    return (
        <div className="container" style={ action ? {...showStyle} : {...hiddenStyle} }>
            <div style={{border: '1px solid black', textAlign: 'right', paddingRight: 5}} onClick={ () => { setAction(!action) }}>X</div>
            {props.children}
        </div>
    )
}