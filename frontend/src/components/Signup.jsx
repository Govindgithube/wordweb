import email from "../assets/icon/email.svg";
import password from "../assets/icon/password.svg";
import google from "../assets/icon/google.svg";
import showEye from "../assets/icon/show-eye.svg";
import hideEye from "../assets/icon/hide-eye.svg";
import fullName from "../assets/icon/full-name.svg";

import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContextProvider";

import { Toaster, toast } from "react-hot-toast";
import axiosInstance from "../axiosInstance.js";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [fullname, setFullName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState("password");

  const setPasswordVisibility = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else setShowPassword("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axiosInstance.post(
        "/api/v1/auth/signup",
        {
          fullname: fullname,
          email: emailInput,
          password: passwordInput,
        },
        config
      );

      if (data.success == true) {
        localStorage.setItem("access_token", JSON.stringify(data.token));
        toast.success("User registerd successfully", {
          duration: 3000,
        });
        setUser(data.token);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
      if (err.response.data.success == false) {
        toast.error(`${err.response.data.message}`);
      }
    }
  };

  return (
    <section className="flex items-center justify-center">
      <Toaster />
      <form className="text-center">
        <h1 className="font-montserrat font-extrabold text-[50px] my-24">
          Join Us Today
        </h1>
        <div className="input_field">
          <img src={fullName} className="h-6 w-6" />
          <input
            type="text"
            className="w-full text-lg outline-none bg-transparent placeholder:text-gray-400"
            placeholder="Full name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="input_field my-10">
          <img src={email} alt="email_icon" className="h-6 w-6" />
          <input
            type="email"
            placeholder="Email"
            className="w-full text-lg outline-none bg-transparent placeholder:text-gray-400"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>
        <div className="input_field my-10">
          <img src={password} alt="password_icon" className="h-6 w-6" />
          <input
            type={showPassword}
            placeholder="Password"
            className="w-full text-lg outline-none bg-transparent placeholder:text-gray-400"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <img
            src={showPassword === "password" ? showEye : hideEye}
            className="h-8 w-8 cursor-pointer"
            alt="show-hide"
            onClick={setPasswordVisibility}
          />
        </div>

        <div>
          <button
            className="btn-dark cursor-pointer font-noto font-semibold text-xl"
            type="submit"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>

        <div className="my-10 relative w-full flex items-center gap-2 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>

        <div className="btn-dark flex items-center justify-center gap-4 cursor-pointer">
          <img src={google} alt="google_icon" className="h-6 w-6" />
          <p className="font-semibold text-lg">Continue With Google</p>
        </div>

        <p className="my-6 font-semibold font-noto">
          Already have an account ?{" "}
          <Link className="underline underline-offset-2" to="/signin">
            Sign in here
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Signup;
