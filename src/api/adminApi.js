import axiosInstance from "./axiosInstance";

export const getAdminUsers = async () => {
  const response = await axiosInstance.get("/admin/users");
  return response.data;
};

export const getAdminCaregivers = async () => {
  const response = await axiosInstance.get("/admin/caregivers");
  return response.data;
};

export const getAdminBookings = async () => {
  const response = await axiosInstance.get("/admin/bookings");
  return response.data;
};

export const approveCaregiver = async (id) => {
  const response = await axiosInstance.patch(`/admin/caregivers/${id}/approve`);
  return response.data;
};

export const rejectCaregiver = async (id) => {
  const response = await axiosInstance.patch(`/admin/caregivers/${id}/reject`);
  return response.data;
};

export const updateAdminBooking = async (id, bookingData) => {
  const response = await axiosInstance.patch(`/admin/bookings/${id}`, bookingData);
  return response.data;
};