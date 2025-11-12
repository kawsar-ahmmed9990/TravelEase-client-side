import React from "react";
import { useLoaderData } from "react-router";

const VehicleDetails = () => {
  const vehicle = useLoaderData();

  if (!vehicle)
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        No vehicle found
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={vehicle.coverImage}
            alt={vehicle.vehicleName}
            className="w-full h-80 object-cover md:h-full"
          />
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {vehicle.vehicleName}
            </h2>
            <p className="text-gray-600 mb-1">Owner: {vehicle.owner}</p>
            <p className="text-gray-600 mb-1">Category: {vehicle.category}</p>
            <p className="text-gray-600 mb-1">Location: {vehicle.location}</p>
            <p className="text-gray-600 mb-1">
              Price per day:{" "}
              <span className="font-semibold">${vehicle.pricePerDay}</span>
            </p>

            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 mb-4 ${
                vehicle.availability === "Available"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {vehicle.availability}
            </span>

            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Description:
            </h3>
            <p className="text-gray-700 mb-4">{vehicle.description}</p>

            <p className="text-gray-500 text-sm">
              Created At: {new Date(vehicle.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mt-6">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
