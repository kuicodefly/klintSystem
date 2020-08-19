import  React, { createContext, useReducer }  from "react";
import ChildA from "./components/ChildA";
import ChildB from "./components/ChildB";


interface StateType {
    name: string;
    age: number;
}

const initialState: StateType = {
    name: 'gzk',
    age: 18
};
const Context = createContext<StateType>(initialState);

function reducer(state: StateType, action: any) {
  switch (action.type) {
    case 'increment':
      return {
          ...state,
          age: state.age + 1
      };
    case 'decrement':
      return {
        ...state,
        age: state.age - 1
      };
    default:
      throw new Error();
  }
}

const Counter: React.FC<{}> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.age}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <Context.Provider value={state}>
        <ChildA context={ Context } dispatch={ dispatch } />
        <ChildB context={ Context } />
      </Context.Provider>
    </>
  );
}
export default Counter;