import { useReducer } from "react";

interface ApiError {
  message: string;
  contentType?: string;
}

interface ErrorStore {
  errors: ApiError[];
}

// Initial state for the reducer
const INITIAL_STATE: ErrorStore = {
  errors: [],
};

// Reducer function to manage error states
const errorReducer = (
  state: ErrorStore,
  action: { type: string; payload?: ApiError }
) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { errors: [...state.errors, action.payload!] };
    case "REMOVE_ERROR":
      return { errors: state.errors.filter((e) => e !== action.payload) };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
};

// Hook to use the error store in a component
const useErrorStore = () => {
  const [state, dispatch] = useReducer(errorReducer, INITIAL_STATE);

  const addError = (error: ApiError) => {
    dispatch({ type: "ADD_ERROR", payload: error });
  };

  const removeError = (error: ApiError) => {
    dispatch({ type: "REMOVE_ERROR", payload: error });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return { state, addError, removeError, reset };
};

export { useErrorStore };
