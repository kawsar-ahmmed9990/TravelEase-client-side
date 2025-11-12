import React from "react";
import Banner from "../Components/Banner/Banner";
import TopCategories from "./TopCategories";
import AboutTravelEase from "./AboutTravelEase";
import VehicleCard from "../Components/VehicleCard/VehicleCard";

const Home = () => {
  const latestVehiclesPromise = fetch(
    "http://localhost:3000/latest-vehicles"
  ).then((res) => res.json());
  return (
    <div>
      <Banner></Banner>
      <TopCategories></TopCategories>
      <AboutTravelEase></AboutTravelEase>
      <section className="max-w-11/12 mx-auto ">
        <h1 className="text-2xl font-semibold my-5 text-center">
          Newest Additions
        </h1>
        <VehicleCard
          latestVehiclesPromise={latestVehiclesPromise}
        ></VehicleCard>
      </section>
    </div>
  );
};

export default Home;
