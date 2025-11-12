import React from "react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-cover bg-center [background-image:url('https://i.ibb.co.com/Kcjkhh0t/photo-1533473359331-0135ef1b58bf.jpg')]">
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative text-center text-white px-5">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Discover Your Perfect Ride
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Rent, explore, and travel with ease — all in one place.
        </p>
        <Link
          to={"/allvehicles"}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
        >
          All Vehicles
        </Link>
      </div>
    </section>
  );
};

export default Banner;
