import React, { use, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const { signInUser, googleSignIn } = use(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef(null);

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    signInUser(email, password)
      .then(() => {
        toast.success("Login successfull!");
        navigate(`${location.state ? location.state : "/"}`);
        e.target.reset();
      })
      .catch((e) => {
        if (e.code === "auth/invalid-credential") {
          toast.error("Invalid email or password. Please try again.");
        } else if (e.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your internet connection.");
        } else {
          toast.error(e.message || "An unexpected error occurred.");
        }
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        console.log(res);

        toast.success("Login successfull!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((e) => toast.error(e.code));
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email first!");
      return;
    }
    navigate("/auth/signin/forgetpassword", { state: { email } });
  };
  return (
    <>
      <div className="hero min-h-screen rounded-xl p-4">
        <Toaster />
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-xl font-bold mx-auto">Sign In</h1>
            <form action="" onSubmit={handleSignIn}>
              <fieldset className="fieldset">
                <label className="label font-bold">Email</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Email"
                  ref={emailRef}
                />
                <div className="relative">
                  <label className="label font-bold mb-2">Password</label>
                  <input
                    type={show ? "text" : "password"}
                    className="input"
                    name="password"
                    placeholder="Password"
                  />
                  <span
                    onClick={() => {
                      setShow(!show);
                    }}
                    className="absolute right-7 top-10 z-1"
                  >
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <button
                  onClick={handleForgetPassword}
                  className="link link-hover text-start"
                  type="button"
                >
                  Forgot password?
                </button>
                <button className="btn btn-success text-white rounded-full mt-4">
                  Sign In
                </button>
              </fieldset>
            </form>
            {/* Divider */}
            <div className="flex items-center justify-center gap-2 my-2">
              <div className="h-px w-16 bg-gray-400"></div>
              <span className="text-sm text-gray-700">or</span>
              <div className="h-px w-16 bg-gray-400"></div>
            </div>
            {/* Google Signin */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex items-center justify-center gap-3 bg-gray-200 text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            <h1 className="font-semibold mx-auto">
              Don’t have an account?{" "}
              <Link
                to={"/auth/signup"}
                className="text-blue-500 underline hover:text-blue-800"
              >
                Sign Up
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
