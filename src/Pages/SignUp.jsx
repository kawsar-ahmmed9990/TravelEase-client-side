import React, { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const { createUser, googleSignIn } = use(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!/^.{6,}$/.test(password)) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter!");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter!");
      return;
    }

    createUser(email, password)
      .then((res) => {
        updateProfile(res.user, { displayName: name, photoURL: photo })
          .then(() => {
            toast.success("Account created successfully!");
            navigate("/");
            e.target.reset();
          })
          .catch((e) => toast.error(e.code));
      })
      .catch((e) => toast.error(e.code));
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((e) => toast.error(e.code));
  };
  return (
    <>
      <div className="hero min-h-screen p-4 rounded-xl">
        <Toaster />
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-xl font-bold mx-auto">Sign Up</h1>
            <form action="" onSubmit={handleSignUp}>
              <fieldset className="fieldset">
                {/* name */}
                <label className="label font-bold">Name</label>
                <input
                  type="text"
                  className="input"
                  name="name"
                  placeholder="Name"
                />
                {/* photo url */}
                <label className="label font-bold">Photo URL</label>
                <input
                  type="text"
                  className="input"
                  name="photo"
                  placeholder="Photo URL"
                />
                {/* Email */}
                <label className="label font-bold">Email</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Email"
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

                <button className="btn bg-[#22c55e] rounded-full text-white mt-4">
                  Sign Up
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
              Already have an account?{" "}
              <Link
                to={"/auth/signin"}
                className="text-blue-500 underline hover:text-blue-800"
              >
                Sign In
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
