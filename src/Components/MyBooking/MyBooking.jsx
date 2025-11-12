import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/bookings?userEmail=${user.email}`)
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

  if (loading)
    return <p className="text-center mt-6">Loading your bookings...</p>;
  if (bookings.length === 0)
    return <p className="text-center mt-6 text-gray-500">No bookings found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>
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
