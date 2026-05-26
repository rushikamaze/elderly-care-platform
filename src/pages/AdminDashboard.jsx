import { useEffect, useMemo, useState } from "react";
import {
  approveCaregiver,
  getAdminBookings,
  getAdminCaregivers,
  getAdminUsers,
  rejectCaregiver,
  updateAdminBooking,
} from "../api/adminApi";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [usersData, caregiversData, bookingsData] = await Promise.all([
        getAdminUsers(),
        getAdminCaregivers(),
        getAdminBookings(),
      ]);

      setUsers(usersData);
      setCaregivers(caregiversData);
      setBookings(bookingsData);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load admin dashboard data."
      );
      setUsers([]);
      setCaregivers([]);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleApproveCaregiver = async (id) => {
    try {
      setActionLoading(id);
      await approveCaregiver(id);
      await loadDashboardData();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to approve caregiver."
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleRejectCaregiver = async (id) => {
    try {
      setActionLoading(id);
      await rejectCaregiver(id);
      await loadDashboardData();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to reject caregiver."
      );
    } finally {
      setActionLoading("");
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      setActionLoading(id);
      await updateAdminBooking(id, { status });
      await loadDashboardData();
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

  const approvedCount = useMemo(
    () =>
      caregivers.filter(
        (caregiver) => caregiver.approvalStatus === "Approved"
      ).length,
    [caregivers]
  );

  const pendingCaregiverCount = useMemo(
    () =>
      caregivers.filter(
        (caregiver) => caregiver.approvalStatus === "Pending"
      ).length,
    [caregivers]
  );

  const pendingBookings = useMemo(
    () =>
      bookings.filter(
        (booking) =>
          booking.status === "Pending" || booking.status === "Rescheduled"
      ).length,
    [bookings]
  );

  const completedBookings = useMemo(
    () => bookings.filter((booking) => booking.status === "Completed").length,
    [bookings]
  );

  const getApprovalClasses = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  const getBookingStatusClasses = (status) => {
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f2f6b] via-[#155e9a] to-[#0b8db0] px-4 pt-28 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200 mb-3">
            Platform Control
          </p>
          <h1 className="text-4xl font-bold text-white mb-3">
            Admin Dashboard
          </h1>
          <p className="text-sky-100 max-w-2xl mx-auto">
            Manage users, caregiver approvals, and booking operations from one place.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-5 py-3 rounded-2xl mb-8 text-center shadow-lg font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-10">
          <div className="bg-slate-900/30 backdrop-blur-xl p-5 rounded-3xl text-center shadow-lg border border-white/10">
            <h2 className="text-white text-lg">Users</h2>
            <p className="text-3xl font-bold text-sky-200">{users.length}</p>
          </div>

          <div className="bg-slate-900/30 backdrop-blur-xl p-5 rounded-3xl text-center shadow-lg border border-white/10">
            <h2 className="text-white text-lg">Caregivers</h2>
            <p className="text-3xl font-bold text-emerald-300">{caregivers.length}</p>
          </div>

          <div className="bg-slate-900/30 backdrop-blur-xl p-5 rounded-3xl text-center shadow-lg border border-white/10">
            <h2 className="text-white text-lg">Approved</h2>
            <p className="text-3xl font-bold text-green-300">{approvedCount}</p>
          </div>

          <div className="bg-slate-900/30 backdrop-blur-xl p-5 rounded-3xl text-center shadow-lg border border-white/10">
            <h2 className="text-white text-lg">Pending Reviews</h2>
            <p className="text-3xl font-bold text-amber-300">{pendingCaregiverCount}</p>
          </div>

          <div className="bg-slate-900/30 backdrop-blur-xl p-5 rounded-3xl text-center shadow-lg border border-white/10">
            <h2 className="text-white text-lg">Bookings</h2>
            <p className="text-3xl font-bold text-cyan-200">{bookings.length}</p>
          </div>
        </div>

        {loading ? (
          <div className="bg-slate-900/30 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/10 text-sky-100">
            Loading admin dashboard...
          </div>
        ) : (
          <>
            <div className="grid xl:grid-cols-2 gap-8 mb-8">
              <section className="bg-slate-900/30 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-5">Users</h2>

                {users.length === 0 ? (
                  <p className="text-sky-100">No registered users found.</p>
                ) : (
                  <div className="space-y-3">
                    {users.map((user) => (
                      <div
                        key={user._id || user.email}
                        className="bg-slate-950/20 border border-white/10 rounded-2xl p-4 flex justify-between items-center gap-4"
                      >
                        <div>
                          <p className="font-semibold text-white">{user.email}</p>
                          <p className="text-sm text-sky-100">
                            Role: {user.role || "user"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="bg-slate-900/30 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-5">Caregiver Approvals</h2>

                {caregivers.length === 0 ? (
                  <p className="text-sky-100">No caregivers available.</p>
                ) : (
                  <div className="space-y-3">
                    {caregivers.map((caregiver) => (
                      <div
                        key={caregiver._id}
                        className="bg-slate-950/20 border border-white/10 rounded-2xl p-4"
                      >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                          <div>
                            <p className="font-semibold text-white text-lg">
                              {caregiver.name}
                            </p>
                            <p className="text-sky-100">{caregiver.service}</p>
                            <p className="text-sm text-slate-200 mt-1">
                              {caregiver.location} • {caregiver.experience}
                            </p>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold h-fit ${getApprovalClasses(
                              caregiver.approvalStatus
                            )}`}
                          >
                            {caregiver.approvalStatus}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-4">
                          <button
                            onClick={() => handleApproveCaregiver(caregiver._id)}
                            disabled={actionLoading === caregiver._id}
                            className="bg-green-500 px-4 py-2 rounded-xl text-white font-medium hover:bg-green-600 transition disabled:opacity-70"
                          >
                            {actionLoading === caregiver._id ? "Updating..." : "Approve"}
                          </button>
                          <button
                            onClick={() => handleRejectCaregiver(caregiver._id)}
                            disabled={actionLoading === caregiver._id}
                            className="bg-red-500 px-4 py-2 rounded-xl text-white font-medium hover:bg-red-600 transition disabled:opacity-70"
                          >
                            {actionLoading === caregiver._id ? "Updating..." : "Reject"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            <section className="bg-slate-900/30 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/10">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Bookings Management</h2>
                  <p className="text-sky-100">
                    Pending: {pendingBookings} • Completed: {completedBookings}
                  </p>
                </div>
              </div>

              {bookings.length === 0 ? (
                <p className="text-sky-100">No bookings available yet.</p>
              ) : (
                <div className="grid lg:grid-cols-2 gap-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-slate-950/20 border border-white/10 rounded-2xl p-5"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <p className="text-lg font-semibold text-white">
                            {booking.caregiverId?.name || "Caregiver not available"}
                          </p>
                          <p className="text-sky-100">
                            {booking.caregiverId?.service || "Service not available"}
                          </p>
                          <p className="text-sm text-slate-200 mt-1">
                            {booking.date} at {booking.time}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getBookingStatusClasses(
                            booking.status
                          )}`}
                        >
                          {booking.status || "Pending"}
                        </span>
                      </div>

                      {booking.patientProfileId && (
                        <div className="bg-slate-900/30 rounded-2xl p-4 mb-4">
                          <p className="text-sm text-sky-100 mb-2">Patient</p>
                          <p className="text-white font-medium">
                            {booking.patientProfileId.name}
                          </p>
                          <p className="text-slate-200 text-sm">
                            Age: {booking.patientProfileId.age} • Phone: {booking.patientProfileId.phone}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => updateBookingStatus(booking._id, "Completed")}
                          disabled={actionLoading === booking._id}
                          className="bg-green-500 px-4 py-2 rounded-xl text-white font-medium hover:bg-green-600 transition disabled:opacity-70"
                        >
                          {actionLoading === booking._id ? "Updating..." : "Mark Completed"}
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking._id, "Cancelled")}
                          disabled={actionLoading === booking._id}
                          className="bg-red-500 px-4 py-2 rounded-xl text-white font-medium hover:bg-red-600 transition disabled:opacity-70"
                        >
                          {actionLoading === booking._id ? "Updating..." : "Cancel"}
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking._id, "Pending")}
                          disabled={actionLoading === booking._id}
                          className="bg-amber-500 px-4 py-2 rounded-xl text-white font-medium hover:bg-amber-600 transition disabled:opacity-70"
                        >
                          {actionLoading === booking._id ? "Updating..." : "Set Pending"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;