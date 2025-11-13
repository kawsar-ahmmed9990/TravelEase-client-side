import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(allVehicles);
  useEffect(() => {
    fetch("https://travelease-server-side-omega.vercel.app/vehicles")
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
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
    <div className="max-w-11/12 mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-semibold py-5 text-center">
          Explore Vehicles
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className="bg-white shadow rounded-lg p-4 overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={vehicle.coverImage}
              alt={vehicle.vehicleName}
              className="h-48 w-full rounded-t-lg object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{vehicle.vehicleName}</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 flex items-center gap-2 rounded text-sm">
                  <TbCategoryFilled />
                  {vehicle.category}
                </span>
                <span className="font-semibold">
                  ${vehicle.pricePerDay}/day
                </span>
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
                className="w-full block text-center border border-black  py-2 rounded-full hover:btn btn-success hover:border-0  hover:text-white transition"
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
