import  React, { useContext }  from "react";


interface PropType {
    context: React.Context<any>;
}


const ChildB: React.FC<PropType> = props => {
    const state = useContext(props.context);
    return (
        <div>
            { state.age }
            hello
        </div>
    )

}
export default ChildB;