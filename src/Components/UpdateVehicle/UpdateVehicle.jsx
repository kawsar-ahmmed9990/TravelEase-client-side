import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";

const UpdateVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [vehicleData, setVehicleData] = useState({
    vehicleName: "",
    owner: "",
    category: "",
    pricePerDay: "",
    location: "",
    availability: "",
    description: "",
    coverImage: "",
    userEmail: user?.email || "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/vehicles/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVehicleData({
          vehicleName: data.vehicleName || "",
          owner: data.owner || data.ownerName || "",
          category: data.category || data.categories || "",
          pricePerDay: data.pricePerDay || "",
          location: data.location || "",
          availability: data.availability || "",
          description: data.description || "",
          coverImage: data.coverImage || "",
          userEmail: data.userEmail || user?.email || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to load vehicle data", "error");
        setLoading(false);
      });
  }, [id, user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/vehicles/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicleData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Vehicle updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/myvehicles");
        } else {
          Swal.fire("Info", "No changes were made", "info");
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update vehicle", "error");
      });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Update Vehicle
      </h2>
      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="vehicleName"
            value={vehicleData.vehicleName || ""}
            onChange={handleChange}
            placeholder="Vehicle Name"
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="text"
            name="owner"
            value={vehicleData.owner || ""}
            onChange={handleChange}
            placeholder="Owner Name"
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="category"
            value={vehicleData.category || ""}
            onChange={handleChange}
            placeholder="Category (SUV, Sedan, Electric, Van)"
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="number"
            name="pricePerDay"
            value={vehicleData.pricePerDay || ""}
            onChange={handleChange}
            placeholder="Price per Day"
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="location"
            value={vehicleData.location || ""}
            onChange={handleChange}
            placeholder="Location"
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="text"
            name="availability"
            value={vehicleData.availability || ""}
            onChange={handleChange}
            placeholder="Availability"
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <input
          type="text"
          name="coverImage"
          value={vehicleData.coverImage || ""}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="border px-3 py-2 rounded w-full"
        />

        <textarea
          name="description"
          value={vehicleData.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="border px-3 py-2 rounded w-full"
          rows="4"
        ></textarea>

        <input
          type="email"
          name="userEmail"
          value={vehicleData.userEmail || ""}
          readOnly
          className="border px-3 py-2 rounded w-full bg-gray-100"
        />

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition w-full"
        >
          Update Vehicle
        </button>
      </form>
    </div>
  );
};

export default UpdateVehicle;
