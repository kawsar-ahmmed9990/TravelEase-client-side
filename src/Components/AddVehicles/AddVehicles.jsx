import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";
import { motion } from "framer-motion";

const AddVehicles = () => {
  const { user } = useContext(AuthContext);
  const [vehicleData, setVehicleData] = useState({
    vehicleName: "",
    ownerName: "",
    category: "",
    pricePerDay: "",
    location: "",
    availability: "",
    description: "",
    coverImage: "",
    userEmail: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "vehicleName",
      "ownerName",
      "category",
      "pricePerDay",
      "location",
      "availability",
      "description",
      "coverImage",
    ];
    for (let field of requiredFields) {
      if (!vehicleData[field]) {
        Swal.fire("Error", `Please fill the ${field} field`, "error");
        return;
      }
    }

    // Add createdAt field
    const vehicleToSave = {
      ...vehicleData,
      createdAt: new Date().toISOString(),
    };

    fetch("https://travelease-server-side-omega.vercel.app/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicleToSave),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Vehicle added successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          // Reset form
          setVehicleData({
            vehicleName: "",
            ownerName: "",
            category: "",
            pricePerDay: "",
            location: "",
            availability: "",
            description: "",
            coverImage: "",
            userEmail: user?.email || "",
          });
        }
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to add vehicle", "error");
        console.error(err);
      });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className=" rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center ">
          Add New Vehicle
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="vehicleName"
              value={vehicleData.vehicleName}
              onChange={handleChange}
              placeholder="Vehicle Name"
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              name="ownerName"
              value={vehicleData.ownerName}
              onChange={handleChange}
              placeholder="Owner Name"
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <input
            type="text"
            name="category"
            value={vehicleData.category}
            onChange={handleChange}
            placeholder="Category (SUV, Sedan, Electric, Van)"
            className="border px-3 py-2 rounded w-full"
          /> */}
            <select
              name="category"
              value={vehicleData.category}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="">Select Category</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Electric">Electric</option>
              <option value="Van">Van</option>
            </select>

            <input
              type="number"
              name="pricePerDay"
              value={vehicleData.pricePerDay}
              onChange={handleChange}
              placeholder="Price per Day"
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="location"
              value={vehicleData.location}
              onChange={handleChange}
              placeholder="Location"
              className="border px-3 py-2 rounded w-full"
            />
            {/* <input
            type="text"
            name="availability"
            value={vehicleData.availability}
            onChange={handleChange}
            placeholder="Availability (e.g., Available, Booked)"
            className="border px-3 py-2 rounded w-full"
          /> */}
            <select
              name="availability"
              value={vehicleData.availability}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="">Select Availability</option>
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>

          <input
            type="text"
            name="coverImage"
            value={vehicleData.coverImage}
            onChange={handleChange}
            placeholder="Cover Image URL"
            className="border px-3 py-2 rounded w-full"
          />

          <textarea
            name="description"
            value={vehicleData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border px-3 py-2 rounded w-full"
            rows="4"
          ></textarea>

          <input
            type="email"
            name="userEmail"
            value={vehicleData.userEmail}
            readOnly
            className="border px-3 py-2 rounded w-full bg-gray-100"
          />

          <button
            type="submit"
            className="btn bg-[#22c55e] font-medium px-4 py-2 rounded-full text-white transition w-full"
          >
            Add Vehicle
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddVehicles;
