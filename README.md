import { useRef, useReducer } from 'react';
import './App.css';
function reducer(state,action) {
  switch (action.type) {
    case "increment":
      return {count :state.count + 1}
    case "decrement":
      return {count :state.count - 1}  
    default:
      return state;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, { count: 1 },)
    function increment() {
      dispatch({type:"increment"})
    }
    function decrement() {
      dispatch({type:"decrement"})
    }
  return (
    <div className="App">
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <div>deyerim : {state.count}</div>
    </div>
  );
}
export default App;
