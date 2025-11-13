import React, { use } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import toast from "react-hot-toast";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOutUser, authProviderLoading } = use(AuthContext);
  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/auth/signin");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  if (authProviderLoading) {
    return;
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/allvehicles"}>All Vehicles</NavLink>
            </li>
            <li>
              <NavLink to={"/addvehicles"}>Add Vehicles</NavLink>
            </li>
            <li>
              <NavLink to={"/myvehicles"}>My Vehicles</NavLink>
            </li>
            <li>
              <NavLink to={"/mybooking"}>My Bookings</NavLink>
            </li>
          </ul>
        </div>
        <a className=" text-3xl font-medium">
          <span className=" font-bold text-[#22c55e]">Travel</span>Ease
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal font-semibold px-1">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/allvehicles"}>All Vehicles</NavLink>
          </li>
          <li>
            <NavLink to={"/addvehicles"}>Add Vehicles</NavLink>
          </li>
          <li>
            <NavLink to={"/myvehicles"}>My Vehicles</NavLink>
          </li>
          <li>
            <NavLink to={"/mybooking"}>My Bookings</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {user ? (
          <>
            <div className="relative w-12 h-12 group">
              <img
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                src={
                  user?.photoURL || "https://i.ibb.co/Kcdb9M8W/download-1.png"
                }
                alt="user"
              />
              <div className="absolute z-20 top-full  px-5 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 ">
                {user?.displayName || ""}
              </div>
            </div>

            <button
              onClick={handleLogOut}
              className="btn rounded-full  hover:btn-secondary md:text-lg"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink
              to={"/auth/signin"}
              className={({ isActive }) =>
                `btn mr-2 md:mr-0 md:text-lg ${
                  isActive
                    ? "btn-success text-white rounded-full"
                    : "rounded-full"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to={"/auth/signup"}
              className={({ isActive }) =>
                `btn md:text-lg ${
                  isActive
                    ? "btn-success text-white rounded-full "
                    : "rounded-full"
                }`
              }
            >
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
