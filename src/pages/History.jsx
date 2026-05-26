import { useEffect, useMemo, useState } from "react";
import {
  cancelBooking,
  getMyBookings,
  rescheduleBooking,
} from "../api/bookingApi";

function History() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      setActionLoading(bookingId);
      await cancelBooking(bookingId);
      await loadBookings();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to cancel booking."
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleReschedule = async (bookingId) => {
    const newDate = window.prompt("Enter new date (example: 2026-05-25)");
    const newTime = window.prompt("Enter new time (example: 11:00 AM)");

    if (!newDate || !newTime) {
      return;
    }

    try {
      setActionLoading(bookingId);
      await rescheduleBooking(bookingId, {
        date: newDate,
        time: newTime,
      });
      await loadBookings();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to reschedule booking."
      );
    } finally {
      setActionLoading("");
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const caregiverName = booking.caregiverId?.name?.toLowerCase() || "";
      const matchesSearch = caregiverName.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  const getStatusClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Rescheduled":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef8fb] via-[#d6eef4] to-[#bfe4ed] px-4 pt-28 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 mb-3">
            Booking Records
          </p>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Booking History
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            View previous bookings, track their current status, and manage changes
            when needed.
          </p>
        </div>

        <div className="bg-white/75 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-6 md:p-8 mb-10">
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <input
              type="text"
              placeholder="Search by caregiver name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="bg-white/80 rounded-3xl p-10 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Loading bookings...
            </h2>
            <p className="text-slate-600">Please wait while we fetch your bookings.</p>
          </div>
        ) : error ? (
          <div className="bg-white/80 rounded-3xl p-10 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-red-700 mb-3">
              Unable to load bookings
            </h2>
            <p className="text-slate-600">{error}</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white/80 rounded-3xl p-10 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              No bookings found
            </h2>
            <p className="text-slate-600">
              Try a different caregiver name or change the status filter.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredBookings.map((b) => (
              <div
                key={b._id}
                className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/70"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {b.caregiverId?.name || "Caregiver not available"}
                    </h2>
                    <p className="text-blue-700 font-medium">
                      {b.caregiverId?.service || "Service not available"}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
                      b.status
                    )}`}
                  >
                    {b.status || "Pending"}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-500 mb-1">Date</p>
                    <p className="font-semibold text-slate-800">{b.date}</p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-500 mb-1">Time</p>
                    <p className="font-semibold text-slate-800">{b.time}</p>
                  </div>
                </div>

                {b.patientProfileId && (
                  <div className="bg-blue-50 rounded-2xl p-4 mb-5">
                    <p className="text-sm text-slate-500 mb-2">Patient Details</p>
                    <div className="space-y-1 text-slate-700">
                      <p>
                        <span className="font-semibold">Name:</span>{" "}
                        {b.patientProfileId.name}
                      </p>
                      <p>
                        <span className="font-semibold">Age:</span>{" "}
                        {b.patientProfileId.age}
                      </p>
                      <p>
                        <span className="font-semibold">Phone:</span>{" "}
                        {b.patientProfileId.phone}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  {b.status !== "Cancelled" && b.status !== "Completed" && (
                    <button
                      onClick={() => handleCancel(b._id)}
                      disabled={actionLoading === b._id}
                      className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition disabled:opacity-70"
                    >
                      {actionLoading === b._id ? "Updating..." : "Cancel"}
                    </button>
                  )}

                  {b.status !== "Completed" && b.status !== "Cancelled" && (
                    <button
                      onClick={() => handleReschedule(b._id)}
                      disabled={actionLoading === b._id}
                      className="px-4 py-2 rounded-xl border border-blue-200 text-blue-700 font-medium hover:bg-blue-50 transition disabled:opacity-70"
                    >
                      {actionLoading === b._id ? "Updating..." : "Reschedule"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;