import React from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <header className="">
        <Navbar></Navbar>
      </header>
      <main className="bg-gray-100">
        <div className="min-h-screen ">
          <Outlet></Outlet>
        </div>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default RootLayout;
