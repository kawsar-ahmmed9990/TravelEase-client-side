import React, { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { useLocation, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { FaEnvelope } from "react-icons/fa";

const ForgetPass = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");

  useEffect(() => {
    if (!location.state?.email) {
      toast("No email found. Please enter your email manually.");
    }
  }, [location.state]);

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset link sent to your email!");
        window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
        setTimeout(() => navigate("/auth/signin"), 2500);
      })
      .catch((er) => toast.error(er.code));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <Toaster />
      <div className="card bg-base-100 w-full max-w-md shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Reset Your Password
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleReset}>
          <div className="form-control mb-4">
            <label className="label font-semibold">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered pl-10 w-full"
              />
            </div>
          </div>

          <button className="btn btn-neutral w-full mt-3">
            Send Reset Link
          </button>

          <button
            type="button"
            className="btn btn-outline w-full mt-3"
            onClick={() => navigate("/auth/signin")}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;
