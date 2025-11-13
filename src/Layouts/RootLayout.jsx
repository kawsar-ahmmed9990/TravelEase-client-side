import React from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default RootLayout;
