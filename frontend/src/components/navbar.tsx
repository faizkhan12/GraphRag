import React from "react";
import AuthLink from "./auth/auth-link";
import { useAuth } from "../store/auth";
import { Outlet } from "react-router-dom";

const NavBar: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <header className="drop-shadow flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4 bg-black ">
        <nav
          className=" w-full mx-auto px-16 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <a
            className="flex-none text-xl font-semibold dark:text-white"
            href="/"
          >
            GraphRAG
          </a>
          <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
            {user && (
              <>
                <a
                  className="font-medium  text-gray-400  hover:underline hover:bg-transparent hover:text-gray-500"
                  href="/documents"
                >
                  Documents
                </a>
              </>
            )}
            <AuthLink />
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default NavBar;
