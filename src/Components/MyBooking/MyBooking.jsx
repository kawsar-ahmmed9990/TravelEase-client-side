import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import { motion } from "framer-motion";

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
      <div className="flex justify-center items-center h-64 bg-[#f1f5e8] dark:bg-gray-900">
        <div className="text-3xl font-bold text-black dark:text-white flex flex-col items-center">
          <p className="mt-2">
            L<span className="inline-block animate-spin">🔄</span>ading...
          </p>
        </div>
      </div>
    );
  }

  if (bookings.length === 0)
    return (
      <p className="text-center pt-20 font-bold text-gray-500 dark:text-gray-400">
        Your booking list is empty — start exploring vehicles!
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Total Booking : {bookings.length}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-xl shadow-md p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {booking.vehicleName}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Owner: {booking.ownerName}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Location: {booking.location}
              </p>
              <p className="font-semibold text-gray-700 dark:text-gray-200">
                Price per day: ${booking.pricePerDay}
              </p>
              <p>
                Status:{" "}
                <span className="text-red-500">{booking.availability}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Booked at: {new Date(booking.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MyBooking;
