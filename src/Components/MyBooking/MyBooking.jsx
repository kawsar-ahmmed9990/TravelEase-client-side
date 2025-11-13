import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://travelease-server-side-omega.vercel.app/bookings?userEmail=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

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
  if (bookings.length === 0)
    return (
      <p className="text-center pt-20 font-bold text-gray-500">
        Your booking list is empty — start exploring vehicles!
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Total Booking : {bookings.length}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border rounded-xl shadow-md p-4 bg-white"
          >
            <h3 className="text-xl font-semibold mb-2">
              {booking.vehicleName}
            </h3>
            <p>Owner: {booking.ownerName}</p>
            <p>Location: {booking.location}</p>
            <p>Price per day: ${booking.pricePerDay}</p>
            <p>
              Status:{" "}
              <span className="text-red-500">{booking.availability}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Booked at: {new Date(booking.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
