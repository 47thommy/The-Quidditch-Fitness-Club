import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [formData, setFormData] = useState({
    title: "",
    reps: "",
    sets: "",
    load: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      console.log(error);
    }
    if (response.ok) {
      dispatch({ type: "CREATE_WORKOUTS", payload: json });
      setFormData({
        title: "",
        reps: "",
        sets: "",
        load: "",
      });
      setError(null);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="create">
      <label>Exersise Title</label>
      <input
        type="text"
        onChange={handleChange}
        name="title"
        value={formData.title}
      />
      <label>Sets</label>
      <input
        type="number"
        value={formData.sets}
        name="sets"
        onChange={handleChange}
      />
      <label>Reps</label>
      <input
        type="number"
        value={formData.reps}
        name="reps"
        onChange={handleChange}
      />
      <label>Load(Kg)</label>
      <input
        type="number"
        value={formData.load}
        name="load"
        onChange={handleChange}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
