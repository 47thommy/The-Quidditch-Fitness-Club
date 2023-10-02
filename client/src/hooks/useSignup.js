import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export default useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (email, password) => {
    const { dispatch } = useAuthContext();
    setError(null);
    isLoading(true);
    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.message);
      setIsLoading(false);
    }
    if (response.ok) {
      localStorage.setItem("user", json.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setError(null);
    }
  };

  return { signup, error, isLoading };
};
