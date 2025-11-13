import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

const MyVehicles = () => {
  const { user } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://travelease-server-side-omega.vercel.app/vehicles?userEmail=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setVehicles(data);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This vehicle will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://travelease-server-side-omega.vercel.app/vehicles/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Vehicle has been deleted.", "success");
              setVehicles(vehicles.filter((v) => v._id !== id));
            }
          });
      }
    });
  };

  if (loading)
    return <p className="text-center mt-10">Loading your vehicles...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        My Added Vehicles
      </h2>

      {vehicles.length === 0 ? (
        <p className="text-center text-gray-600">No vehicles found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Price/Day
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr
                  key={vehicle._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition`}
                >
                  {/* Image */}
                  <td className="px-6 py-4">
                    <img
                      src={vehicle.coverImage}
                      alt={vehicle.vehicleName}
                      className="w-20 h-16 object-cover rounded"
                    />
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {vehicle.vehicleName}
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-gray-600">
                    {vehicle.category}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    ${vehicle.pricePerDay}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2 h-full">
                      <Link
                        to={`/vehicledetails/${vehicle._id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      >
                        View
                      </Link>
                      <Link
                        to={`/updatevehicle/${vehicle._id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(vehicle._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
