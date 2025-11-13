import React from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-500">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
