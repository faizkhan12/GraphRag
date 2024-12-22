import React from "react";
import { useAuth } from "./../../store/auth";
import { useNavigate } from "react-router-dom";

const AuthLink: React.FC = () => {
  const navigate = useNavigate();
  const { user, signout } = useAuth();

  const signOutBtn = async () => {
    await signout();
    navigate("/");
  };

  return (
    <>
      {user ? (
        <button
          className="font-medium text-gray-400 hover:text-gray-500 hover:bg-transparent hover:underline"
          onClick={signOutBtn}
        >
          Sign Out
        </button>
      ) : (
        <>
          <a
            className="font-medium  text-gray-400 hover:text-gray-500 hover:bg-transparent hover:underline"
            href="/signin"
          >
            Login
          </a>
          <a
            className="font-medium  text-gray-400 hover:text-gray-500 hover:bg-transparent hover:underline"
            href="/signup"
          >
            Sign Up
          </a>
        </>
      )}
    </>
  );
};

export default AuthLink;
