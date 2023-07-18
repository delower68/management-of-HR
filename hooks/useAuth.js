import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const value = localStorage.getItem("user");
    if (value) {
      try {
        const parsedUser = JSON.parse(value);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user value:", error);
        // Handle the error as per your application's requirements
      }
    }
  }, []);

  return {
    user
  };
};
