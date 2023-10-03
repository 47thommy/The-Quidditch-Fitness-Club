import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [formData, setFormData] = useState({
    title: "",
    reps: "",
    sets: "",
    load: "",
  });
  const { user } = useAuthContext();
  const [emptyField, setEmptyField] = useState([]);

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
    if (!user) {
      setError("You need to be logged in");
      return;
    }
    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setEmptyField(json.emptyFields);
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
      setEmptyField([]);
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
        className={emptyField.includes("title") ? "error" : ""}
      />
      <label>Sets</label>
      <input
        type="number"
        value={formData.sets}
        name="sets"
        onChange={handleChange}
        className={emptyField.includes("sets") ? "error" : ""}
      />
      <label>Reps</label>
      <input
        type="number"
        value={formData.reps}
        name="reps"
        onChange={handleChange}
        className={emptyField.includes("reps") ? "error" : ""}
      />
      <label>Load(Kg)</label>
      <input
        type="number"
        value={formData.load}
        name="load"
        onChange={handleChange}
        className={emptyField.includes("load") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
