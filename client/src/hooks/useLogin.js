import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();
  const login = async ({ email, password }) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(
      "https://the-quidditch-fitness-club.onrender.com/api/user/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);

      setError(json.message);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setError(null);
    }
  };

  return { login, error, isLoading };
};
