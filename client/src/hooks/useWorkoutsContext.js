import { useContext } from "react";
import { Workoutcontext } from "../context/workoutContext";

export const useWorkoutsContext = () => {
  const context = useContext(Workoutcontext);

  if (!context) {
    throw Error("use the context only inside the context provider");
  }
  return context;
};
