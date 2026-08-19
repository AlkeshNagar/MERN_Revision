// Using redux for state management

import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, incrementByAmount } from "./CounterSlice";

export const Counter = () => {
  // useSelector used to read the data from redux store
  const count = useSelector((state) => state.counter.value);
  //   useDispatch is used to handle action functions
  const dispatch = useDispatch();
  return (
    <>
      <h2>Counter application by Redux</h2>
      <h3>Counter: {count}</h3>
      <div className="reducerdiv">
        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(decrement())}>decrement</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>
          increment by amount 5
        </button>
      </div>
    </>
  );
};
