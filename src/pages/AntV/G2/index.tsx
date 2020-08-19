import React, { useState, useEffect } from 'react';

import { Chart, Interval } from 'bizcharts';
import { Button } from 'antd';

const WebGlChart: React.FC<{}> = () => {
    const [ dataSource, setDataSource ] = useState([
        { genre: '1', sold: 5000 },
        { genre: '2', sold: 9000 },
        { genre: '3', sold: 1500 },
        { genre: '4', sold: 2300 },
        { genre: '5', sold: 2500 },
    ]);
    const addChart = (): void => {
        let tempArr = dataSource;
        tempArr[0].sold = dataSource[0].sold + 1000;
        console.log(tempArr);
        setDataSource([...tempArr]);
    }
    return (
       <div>
           <Button onClick={addChart}>add Chart</Button>
            <Chart 
            height={320} 
            autoFit 
            data={dataSource} 
            width={500}
            >
                <Interval position="genre*sold" /> 
            </Chart>
       </div>
    )

}


// import React, { Component } from 'react'

// export default class WebGlChart extends React.Component {

//     state = {
//         dataSource: [
//             { genre: 'Sports', sold: 275 },
//             { genre: 'Strategy', sold: 115 },
//             { genre: 'Action', sold: 120 },
//             { genre: 'Shooter', sold: 350 },
//             { genre: 'Other', sold: 150 }
//         ]
//     }
//     render() {
//         return (
//             <Chart height={320} autoFit data={this.state.dataSource} width={500}>
//                 <Interval position="genre*sold" /> 
//             </Chart>
//         )
//     }
// }

export default WebGlChart;
