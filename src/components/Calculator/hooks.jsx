import { useReducer, useMemo } from "react";
import {
  format,
  findLast,
  findLastOperator,
  isOperator,
  calculate,
} from "./logic";

const initialState = ["0"];

function reducer(state, action) {
  if (action.type === "RESET") {
    return initialState;
  }

  // check last token
  const last = findLast(state);

  if (action.type === "PUSH") {
    // when last token is operator
    if (isOperator(last)) {
      return [...state, action.value];
    }

    //prevent fraction double pressed
    if (action.value === "." && last.includes(".")) {
      return state;
    }
    //when fraction was pressed
    if (action.value === ".") {
      return [...state.slice(0, -1), last + action.value];
    }
    //push
    return [...state.slice(0 - 1), last + action.value];
  }

  if (action.type === "REMOVE") {
    const last = findLast(state);

    //when last token is operator
    if (isOperator(last)) {
      return state.slice(0, -1);
    }
    //pop

    return [...state.slice(0, -1), last.slice(0, -1)];
  }

  if (action.type === "OPERATOR") {
    const last = findLast(state);

    //when last token is operator
    if (isOperator(last)) {
      return [...state.slice(0, -1), action.value];
    }
    //when last operator double pressed
    if (findLastOperator(state) === action.value) {
      return [...calculate(state), action.value];
    }
    //push operator
    return [...state, action.value];
  }

  if (action.type === "ENTER") {
    return calculate(state);
  }
  return state;
}

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(
    () => ({
      reset: () => () => dispatch({ type: "RESET" }),
      push: (value) => () => dispatch({ type: "PUSH", value }),
      remove: () => () => dispatch({ type: "REMOVE" }),
      operate: (value) => () => dispatch({ type: "OPERATOR", value }),
      enter: () => () => dispatch({ type: "ENTER" }),
    }),
    [dispatch]
  );

  //compute
  const operator = findLastOperator(state);
  const last = findLast(state);
  const output = format(isOperator(last) ? state[state.length - 2] : last);

  return { operator, output, actions };
}
