import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";
import { Link } from "react-router";

const VehicleCard = ({ latestVehiclesPromise }) => {
  const [loading, setLoading] = useState(true);
  const [latestVehicles, setLatestVehicles] = useState([]);

  useEffect(() => {
    setLoading(true);
    latestVehiclesPromise.then((data) => {
      setLatestVehicles(data);
      setLoading(false);
    });
  }, [latestVehiclesPromise]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-[#f1f5e8]">
        <div className="text-3xl font-bold text-black flex flex-col items-center">
          <p className="mt-2">
            L<span className="inline-block animate-spin">🔄</span>ading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {latestVehicles.map((vehicle) => (
        <div
          key={vehicle._id}
          className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition p-4"
        >
          <img
            src={vehicle.coverImage}
            alt={vehicle.vehicleName}
            className="h-48 w-full object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{vehicle.vehicleName}</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 flex items-center gap-2 rounded text-sm">
                <TbCategoryFilled />
                {vehicle.category}
              </span>
              <span className="font-semibold">${vehicle.pricePerDay}/day</span>
            </div>
            <div className="text-gray-800 mb-2 flex  items-center gap-2">
              <FaLocationDot />
              {vehicle.location}
            </div>
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
          <div className="p-4 w-full">
            <Link
              to={`/vehicledetails/${vehicle._id}`}
              className="w-full block text-center border border-black  py-2 rounded-full hover:btn btn-success hover:text-white hover:border-0 transition"
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
