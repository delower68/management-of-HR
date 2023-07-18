import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState({});
  console.log(user);

  useEffect(() => {
    const value = localStorage.getItem("user");
    if (value) {
      try {
        const parsedUser = JSON.parse(value);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user value:", error);
      }
    }
  }, []);

  return {
    user
  };
};
