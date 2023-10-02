import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();
  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    console.log(email, password);

    console.log(JSON.stringify({ email, password }));
    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      body: JSON.stringify(email, password),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);

      setError(json.message);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "SIGNUP", payload: json });
      setError(null);
    }
  };

  return { signup, error, isLoading };
};
