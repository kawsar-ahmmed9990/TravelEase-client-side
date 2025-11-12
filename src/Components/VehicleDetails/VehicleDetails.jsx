import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

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
      const res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();

      if (data.insertedId) {
        await fetch(`http://localhost:3000/vehicles/${vehicle._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ availability: "Booked" }),
        });

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
            <p className="text-gray-600 mb-1">Owner: {vehicle.ownerName}</p>
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
          </div>

          <div className="mt-6">
            <button
              disabled={vehicle.availability === "Booked" || loading}
              onClick={handleBookNow}
              className={`w-full py-3 rounded-xl font-semibold transition duration-300 ${
                vehicle.availability === "Booked"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
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
