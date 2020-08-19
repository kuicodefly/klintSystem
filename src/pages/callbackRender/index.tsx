import React, { useState, Component, useEffect } from 'react';

interface PropsType {
    children: any;
    userId: string;
}
// class 组件
// class User extends Component<PropsType> {
//     state = { user: null }
//     componentDidMount() {
//         this.setTime();
//         console.log('update *');
//     }
//     // 轮询
//     setTime() {
//         setTimeout(()=>{
//             if (this.state.user !== null) {
//                 this.setState({
//                     user: null
//                 });
//             } else {
//                 this.setState({
//                     user: 'member'
//                 });
//             }
//             this.setTime();
//         }, 5000)
//     }
//     render() {
//       return this.props.children(this.state.user);
//     }
// }

//  function 组件

const User: React.FC<PropsType> = props => {
    const [user, setUser] = useState<any>(null);
    // 轮询
    const setTime = () => {
        let timer =  setTimeout(()=>{
            if ( user !== null) {
                setUser(null);
            } else {
                setUser(1);
            }
            clearTimeout(timer);
        }, 5000)
    }
   
    useEffect(()=>{
       setTime();
    }, [user]);
    return props.children(user)
}

const MemberMode: JSX.Element =( <p>hello member</p>);
const TouristMode: JSX.Element =( <p>please login</p>);

const Parent: React.FC<{}> = () => {
    console.log('update');
    return (
        <div>
            <User userId="0001">
            {
                (user: any | never )=> user === null ? 
                TouristMode : 
                MemberMode
            }
            </User>
        </div>
    )
}
export default Parent;
