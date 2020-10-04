import { Action } from "redux";

export const DEBUG = "REDUX/DEBUG";

export const showDebug = (message: string) => ({
  type: DEBUG,
  message
});

const initialState = {
  message: "Welcome"
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DEBUG: {
      return { ...state, message: action.message };
    }
    default: {
      return state;
    }
  }
};
