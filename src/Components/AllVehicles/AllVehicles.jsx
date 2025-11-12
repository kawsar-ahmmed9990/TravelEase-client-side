import React from "react";
import { Link, useLoaderData } from "react-router";

const AllVehicles = () => {
  const allVehicles = useLoaderData();
  console.log(allVehicles);
  return (
    <div className="max-w-11/12 mx-auto">
      <div>
        <h1 className="text-2xl font-semibold my-5 text-center">
          Newest Additions
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allVehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={vehicle.coverImage}
              alt={vehicle.vehicleName}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{vehicle.vehicleName}</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {vehicle.category}
                </span>
                <span className="font-semibold">
                  ${vehicle.pricePerDay}/day
                </span>
              </div>
              <div className="text-gray-600 mb-2">{vehicle.location}</div>
              <div
                className={`inline-block px-2 py-1 text-sm rounded ${
                  vehicle.availability === "Available"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {vehicle.availability}
              </div>
            </div>
            <div className="p-4">
              <Link
                to={`/vehicledetails/${vehicle._id}`}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVehicles;
