import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";
import { Link } from "react-router";

const VehicleCard = ({ latestVehiclesPromise }) => {
  const [loading, setLoading] = useState(true);
  const [latestVehicles, setLatestVehicles] = useState([]);

  useEffect(() => {
    setLoading(true);
    latestVehiclesPromise
      .then((data) => {
        setLatestVehicles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [latestVehiclesPromise]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-[#f1f5e8] dark:bg-gray-900">
        <div className="text-3xl font-bold text-black dark:text-white flex flex-col items-center">
          <p className="mt-2">
            L<span className="inline-block animate-spin">🔄</span>ading...
          </p>
        </div>
      </div>
    );
  }

  if (!latestVehicles.length) {
    return (
      <p className="text-center text-gray-500 font-semibold mt-10">
        No vehicles available at the moment.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {latestVehicles.map((vehicle) => (
        <div
          key={vehicle._id}
          className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden transform transition-transform duration-700 ease-in-out hover:scale-105 hover:shadow-2xl p-4 flex flex-col"
        >
          <img
            src={vehicle.coverImage}
            alt={vehicle.vehicleName}
            className="h-48 w-full object-cover rounded-t-lg mb-4"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              {vehicle.vehicleName}
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 flex items-center gap-2 rounded text-sm">
                <TbCategoryFilled /> {vehicle.category}
              </span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                ${vehicle.pricePerDay}/day
              </span>
            </div>
            <div className="text-gray-800 dark:text-gray-300 mb-2 flex items-center gap-2">
              <FaLocationDot /> {vehicle.location}
            </div>
            <div
              className={`inline-block px-2 py-1 text-sm rounded font-medium ${
                vehicle.availability === "Available"
                  ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                  : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"
              }`}
            >
              {vehicle.availability}
            </div>
          </div>
          <div className="mt-4">
            <Link
              to={`/vehicledetails/${vehicle._id}`}
              className="w-full block text-center py-2 rounded-full bg-[#22c55e] text-white hover:bg-green-700 transition duration-300 font-medium"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleCard;
