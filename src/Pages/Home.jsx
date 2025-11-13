import React from "react";
import Banner from "../Components/Banner/Banner";
import TopCategories from "./TopCategories";
import AboutTravelEase from "./AboutTravelEase";
import VehicleCard from "../Components/VehicleCard/VehicleCard";
import { motion } from "framer-motion";

const Home = () => {
  const latestVehiclesPromise = fetch(
    "https://travelease-server-side-omega.vercel.app/latest-vehicles"
  ).then((res) => res.json());
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-100  rounded-xl shadow-lg"
      >
        <Banner></Banner>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-100  rounded-xl "
      >
        <TopCategories></TopCategories>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-100  rounded-xl shadow-lg"
      >
        <section className="max-w-11/12 mx-auto pb-10">
          <h1 className="text-3xl font-bold my-5 text-center">
            Newest Additions
          </h1>
          <VehicleCard
            latestVehiclesPromise={latestVehiclesPromise}
          ></VehicleCard>
        </section>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-100  rounded-xl shadow-lg"
      >
        <AboutTravelEase></AboutTravelEase>
      </motion.div>
    </div>
  );
};

export default Home;
