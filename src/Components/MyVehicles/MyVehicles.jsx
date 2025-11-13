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
          { method: "DELETE" }
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
  if (vehicles.length === 0)
    return (
      <p className="text-center pt-20 font-bold text-gray-500">
        You haven’t added any vehicles yet. Start sharing your ride now!
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Added Vehicles : <span className="font-bold">{vehicles.length}</span>
      </h2>

      {vehicles.length === 0 ? (
        <p className="text-center text-gray-600">No vehicles found.</p>
      ) : (
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start p-4 gap-4">
                {/* Image */}
                <img
                  src={vehicle.coverImage}
                  alt={vehicle.vehicleName}
                  className="w-full md:w-32 h-24 object-cover rounded"
                />

                <div className="flex-1 w-full">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {vehicle.vehicleName}
                  </h3>
                  <p className="text-gray-600">Category: {vehicle.category}</p>
                  <p className="font-semibold text-gray-700">
                    Price/Day: ${vehicle.pricePerDay}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-2 md:mt-0">
                  <Link
                    to={`/vehicledetails/${vehicle._id}`}
                    className="btn btn-dash btn-info hover:bg-blue-600 hover:text-white"
                  >
                    View Detail
                  </Link>
                  <Link
                    to={`/updatevehicle/${vehicle._id}`}
                    className="btn btn-dash btn-warning hover:bg-yellow-500 hover:text-white"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="btn btn-dash btn-error hover:bg-red-600 hover:text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
