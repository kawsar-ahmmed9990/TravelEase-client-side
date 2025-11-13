import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import { FaCarSide, FaDollarSign, FaUser } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

const VehicleDetails = () => {
  const vehicleData = useLoaderData();
  const { user } = useContext(AuthContext);
  const [vehicle, setVehicle] = useState(vehicleData);
  const [loading, setLoading] = useState(false);

  if (!vehicle)
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        No vehicle found
      </div>
    );

  const handleBookNow = async () => {
    if (!user?.email) {
      alert("Please login to book this vehicle!");
      return;
    }

    setLoading(true);

    const bookingData = {
      vehicleId: vehicle._id,
      vehicleName: vehicle.vehicleName,
      ownerName: vehicle.ownerName,
      pricePerDay: vehicle.pricePerDay,
      location: vehicle.location,
      availability: "Booked",
      userEmail: user.email,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(
        "https://travelease-server-side-omega.vercel.app/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );
      const data = await res.json();

      if (data.insertedId) {
        await fetch(
          `https://travelease-server-side-omega.vercel.app/vehicles/${vehicle._id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ availability: "Booked" }),
          }
        );

        setVehicle((prev) => ({ ...prev, availability: "Booked" }));
        alert("Vehicle booked successfully!");
      } else {
        alert("Failed to book vehicle.");
      }
    } catch (err) {
      console.error(err);
      alert("Error booking vehicle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-blue-200">
        <div className="md:w-1/2 relative">
          <img
            src={vehicle.coverImage}
            alt={vehicle.vehicleName}
            className="w-full h-80 md:h-full object-cover"
          />
          <div
            className={`absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-semibold ${
              vehicle.availability === "Available"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-700"
            }`}
          >
            {vehicle.availability}
          </div>
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              {vehicle.vehicleName}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              A reliable and comfortable {vehicle.category.toLowerCase()} ready
              for your next journey.
            </p>

            <div className="space-y-3 text-gray-700">
              <p className="flex items-center gap-3">
                <FaUser className="text-blue-500" />
                <span>
                  <strong>Owner:</strong> {vehicle.ownerName}
                </span>
              </p>

              <p className="flex items-center gap-3">
                <FaCarSide className="text-blue-500" />
                <span>
                  <strong>Category:</strong> {vehicle.category}
                </span>
              </p>

              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>
                  <strong>Location:</strong> {vehicle.location}
                </span>
              </p>

              <p className="flex items-center gap-3">
                <FaDollarSign className="text-blue-500" />
                <span>
                  <strong>Price/Day:</strong>{" "}
                  <span className="text-lg font-semibold text-blue-600">
                    ${vehicle.pricePerDay}
                  </span>
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <button
              disabled={vehicle.availability === "Booked" || loading}
              onClick={handleBookNow}
              className={`w-full py-3 rounded-xl font-semibold transition duration-300 ${
                vehicle.availability === "Booked"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "btn bg-[#22c55e] text-white"
              }`}
            >
              {loading
                ? "Booking..."
                : vehicle.availability === "Booked"
                ? "Booked"
                : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
