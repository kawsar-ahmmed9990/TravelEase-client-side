import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";
import { Link } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          "https://travelease-server-side-omega.vercel.app/sort"
        );
        setVehicles(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

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

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="max-w-11/12 mx-auto pb-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-xl"
        >
          <div>
            <h1 className="text-2xl font-semibold py-5 text-center text-gray-800 dark:text-gray-100">
              Explore Vehicles
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 overflow-hidden dark:shadow-gray-700 transform transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={vehicle.coverImage}
                  alt={vehicle.vehicleName}
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                    {vehicle.vehicleName}
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 flex items-center gap-2 rounded text-sm">
                      <TbCategoryFilled />
                      {vehicle.category}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      ${vehicle.pricePerDay}/day
                    </span>
                  </div>
                  <div className="text-gray-800 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FaLocationDot />
                    {vehicle.location}
                  </div>
                  <div
                    className={`inline-block px-2 py-1 text-sm rounded ${
                      vehicle.availability === "Available"
                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                        : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                    }`}
                  >
                    {vehicle.availability}
                  </div>
                </div>
                <div className="p-4 w-full">
                  <Link
                    to={`/vehicledetails/${vehicle._id}`}
                    className="w-full block text-center py-2 rounded-full hover:btn bg-[#22c55e] hover:border-0 text-white transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AllVehicles;
