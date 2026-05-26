import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getMyBookings, updateBooking } from "../api/bookingApi";

function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [notification, setNotification] = useState("");
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await getMyBookings();
      setBookings(data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load bookings."
      );
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const markCompleted = async (id) => {
    try {
      setActionLoading(id);
      await updateBooking(id, { status: "Completed" });
      await loadBookings();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update booking."
      );
    } finally {
      setActionLoading("");
    }
  };

  const filteredBookings = useMemo(() => {
    return filter === "All"
      ? bookings
      : bookings.filter((booking) => booking?.status === filter);
  }, [bookings, filter]);

  const upcoming = useMemo(
    () =>
      bookings.filter(
        (booking) =>
          booking.status === "Pending" || booking.status === "Rescheduled"
      ),
    [bookings]
  );

  const completed = useMemo(
    () => bookings.filter((booking) => booking.status === "Completed"),
    [bookings]
  );

  const cancelled = useMemo(
    () => bookings.filter((booking) => booking.status === "Cancelled"),
    [bookings]
  );

  const nextAppointment = upcoming[0] || null;

  useEffect(() => {
    if (upcoming.length > 0) {
      setNotification(
        `You have ${upcoming.length} upcoming booking${
          upcoming.length > 1 ? "s" : ""
        }.`
      );
    } else {
      setNotification("No upcoming bookings right now.");
    }
  }, [upcoming]);

  const getStatusClasses = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Rescheduled":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <div className="min-h-screen px-4 pt-28 pb-12 bg-gradient-to-br from-[#0f2f6b] via-[#155e9a] to-[#0b8db0]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200 mb-3">
            Personal Overview
          </p>
          <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-sm">
            User Dashboard
          </h1>
          <p className="text-sky-100 max-w-2xl mx-auto text-lg">
            Track bookings, manage care schedules, and stay updated on upcoming services.
          </p>
        </div>

        <div className="bg-yellow-300 text-slate-900 px-5 py-3 rounded-2xl mb-8 text-center shadow-lg font-medium">
          {notification}
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-5 py-3 rounded-2xl mb-8 text-center shadow-lg font-medium">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 mb-8">
          <div className="bg-slate-900/30 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Next Appointment</h2>

            {nextAppointment ? (
              <div className="bg-slate-950/20 rounded-2xl p-5 border border-white/10">
                <p className="text-2xl font-bold text-white mb-2">
                  {nextAppointment.caregiverId?.name || "Caregiver not available"}
                </p>
                <p className="text-cyan-200 mb-3">
                  {nextAppointment.caregiverId?.service || "Service not available"}
                </p>
                <div className="space-y-2 text-slate-100">
                  <p>
                    <span className="font-semibold">Date:</span> {nextAppointment.date}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span> {nextAppointment.time}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className="text-yellow-200">{nextAppointment.status}</span>
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sky-100">No upcoming appointment scheduled.</p>
            )}
          </div>

          <div className="bg-slate-900/30 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid gap-3">
              <Link
                to="/services"
                className="bg-blue-600 text-white text-center py-3 rounded-2xl font-semibold hover:bg-blue-700 transition"
              >
                Book New Caregiver
              </Link>
              <Link
                to="/history"
                className="bg-white text-slate-800 text-center py-3 rounded-2xl font-semibold hover:bg-slate-100 transition"
              >
                View Booking History
              </Link>
              <Link
                to="/profile"
                className="bg-emerald-500 text-white text-center py-3 rounded-2xl font-semibold hover:bg-emerald-600 transition"
              >
                Update Patient Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-6 justify-center flex-wrap">
          {["All", "Pending", "Rescheduled", "Completed", "Cancelled"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                filter === item
                  ? "bg-blue-600 text-white shadow"
                  : "bg-slate-900/25 text-white hover:bg-slate-900/40"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-900/30 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg border border-white/10">
            <h2 className="text-white text-lg">Upcoming</h2>
            <p className="text-3xl font-bold text-sky-200">{upcoming.length}</p>
          </div>

          <div className="bg-slate-900/30 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg border border-white/10">
            <h2 className="text-white text-lg">Completed</h2>
            <p className="text-3xl font-bold text-emerald-300">{completed.length}</p>
          </div>

          <div className="bg-slate-900/30 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg border border-white/10">
            <h2 className="text-white text-lg">Cancelled</h2>
            <p className="text-3xl font-bold text-rose-300">{cancelled.length}</p>
          </div>

          <div className="bg-slate-900/30 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg border border-white/10">
            <h2 className="text-white text-lg">Total</h2>
            <p className="text-3xl font-bold text-cyan-200">{bookings.length}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-slate-900/30 backdrop-blur-lg p-5 rounded-3xl shadow-lg border border-white/10">
            <h2 className="text-white text-lg font-semibold mb-4 text-center">
              Care Calendar
            </h2>
            <div className="flex justify-center">
              <Calendar onChange={setDate} value={date} className="rounded-2xl border-0" />
            </div>
          </div>

          <div className="bg-slate-900/30 backdrop-blur-lg p-6 rounded-3xl shadow-lg border border-white/10">
            <h2 className="text-white text-lg font-semibold mb-4 text-center">
              Booking Statistics
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm text-sky-100 mb-2">
                  <span>Upcoming</span>
                  <span>{upcoming.length}</span>
                </div>
                <div className="h-3 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{
                      width: `${
                        bookings.length ? (upcoming.length / bookings.length) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm text-sky-100 mb-2">
                  <span>Completed</span>
                  <span>{completed.length}</span>
                </div>
                <div className="h-3 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${
                        bookings.length ? (completed.length / bookings.length) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm text-sky-100 mb-2">
                  <span>Cancelled</span>
                  <span>{cancelled.length}</span>
                </div>
                <div className="h-3 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-red-500"
                    style={{
                      width: `${
                        bookings.length ? (cancelled.length / bookings.length) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {bookings.length === 0 && (
                <p className="text-sky-100 text-center">No booking data available yet.</p>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-4">Your Bookings</h2>

        {loading ? (
          <div className="bg-slate-900/30 backdrop-blur-lg p-6 rounded-3xl shadow-lg border border-white/10">
            <p className="text-sky-100">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-slate-900/30 backdrop-blur-lg p-6 rounded-3xl shadow-lg border border-white/10">
            <p className="text-sky-100">No bookings found for this filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-slate-900/30 backdrop-blur-lg p-5 rounded-3xl shadow-md border border-white/10 hover:scale-[1.01] transition duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <p className="text-xl font-semibold text-white">
                      {booking.caregiverId?.name || "Caregiver not available"}
                    </p>
                    <p className="text-cyan-200">
                      {booking.caregiverId?.service || "Service not available"}
                    </p>
                    <p className="text-slate-100 mt-2">
                      {booking.date} at {booking.time}
                    </p>
                    {booking._id && (
                      <p className="text-sm text-sky-100 mt-1">
                        Booking ID: {booking._id}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-3">
                    <span
                      className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${getStatusClasses(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>

                    {(booking.status === "Pending" ||
                      booking.status === "Rescheduled") && (
                      <button
                        onClick={() => markCompleted(booking._id)}
                        disabled={actionLoading === booking._id}
                        className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-70"
                      >
                        {actionLoading === booking._id
                          ? "Updating..."
                          : "Mark as Completed"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;