import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, getUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check user authentication status on mount
    if (user === null) {
      getUser();
    } else if (user === false) {
      navigate("/signin");
    }
  }, [user, getUser, history]);

  return <>{user && children}</>;
};

export default AuthGuard;
