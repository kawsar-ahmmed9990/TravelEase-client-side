import React from "react";
import Banner from "../Components/Banner/Banner";
import TopCategories from "./TopCategories";
import AboutTravelEase from "./AboutTravelEase";
import VehicleCard from "../Components/VehicleCard/VehicleCard";

const Home = () => {
  const latestVehiclesPromise = fetch(
    "https://travelease-server-side-omega.vercel.app/latest-vehicles"
  ).then((res) => res.json());
  return (
    <div>
      <Banner></Banner>
      <TopCategories></TopCategories>

      <section className="max-w-11/12 mx-auto pb-10">
        <h1 className="text-3xl font-bold my-5 text-center">
          Newest Additions
        </h1>
        <VehicleCard
          latestVehiclesPromise={latestVehiclesPromise}
        ></VehicleCard>
      </section>
      <AboutTravelEase></AboutTravelEase>
    </div>
  );
};

export default Home;
