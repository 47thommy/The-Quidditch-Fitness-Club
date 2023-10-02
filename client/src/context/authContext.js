import { createContext, useReducer } from "react";

export const authContext = createContext();

export const authContextReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return {
        user: state,
      };
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authContextReducer, {
    user: null,
  });
  return (
    <authContext.provider value={{ ...state, dispatch }}>
      {children}
    </authContext.provider>
  );
};
