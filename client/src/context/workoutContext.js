import { createContext, useReducer } from "react";

export const Workoutcontext = createContext();

const workoutContextReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUTS":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutContextReducer, {
    workouts: null,
  });
  return (
    <Workoutcontext.Provider value={{ ...state, dispatch }}>
      {children}
    </Workoutcontext.Provider>
  );
};
