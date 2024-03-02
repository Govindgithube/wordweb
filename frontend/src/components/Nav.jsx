import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { UserContext } from "../context/UserContextProvider";
import Profileicon from "./Profileicon";
import { Toaster } from "react-hot-toast";

import Logo from "../assets/icon/logo-1.svg";
import WriteIcon from "../assets/icon/write.svg";

const Nav = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <nav className="navbar">
        <Toaster />
        <Link
          to="/"
          className="flex-none flex items-center justify-center w-auto gap-4"
        >
          <img src={Logo} className="w-12" alt="logo" />
          <p className="text-xl font-bold font-montserrat hidden sm:block">
            Word Web
          </p>
        </Link>

        <div className="flex items-center gap-1 md:gap-6 ml-auto">
          <Link
            to="/editor"
            className="flex gap-2 link items-center justify-center"
          >
            <img src={WriteIcon} className="h-4 opacity-90" alt="w" />
            <p className="font-noto text-sm sm:text-base">Write</p>
          </Link>

          {user ? (
            <Profileicon />
          ) : (
            <>
              <Link to="/signin" className="btn-dark py-2">
                <p>Sign In</p>
              </Link>

              <Link to="/signup" className="btn-light py-2 hidden md:block">
                <p>Sign Up</p>
              </Link>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Nav;
