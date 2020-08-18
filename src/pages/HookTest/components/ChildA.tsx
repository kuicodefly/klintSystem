import  React, { useContext }  from "react";

interface PropType {
    context: React.Context<any>;
    dispatch: React.Dispatch<any>;
}

const ChildA: React.FC<PropType> = props => {
    const { context, dispatch } = props;
    const state = useContext(context);
    console.log(state);
    return (
        <div>
            hello
            { state.age }
            <button onClick={ ()=>{ dispatch({type: 'decrement'}) } }> 增加 </button>
        </div>
    )

}
export default ChildA;