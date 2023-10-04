import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "https://the-quidditch-fitness-club.onrender.com/api/workouts/" +
        workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (Kg):</strong>
        {workout.load}
      </p>
      <p>
        <strong>Sets :</strong>
        {workout.sets}
      </p>
      <p>
        <strong>Reps :</strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>

      <span className="material-symbols-outlined" onClick={handleDelete}>
        Delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
