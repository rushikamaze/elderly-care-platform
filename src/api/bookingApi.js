import axiosInstance from "./axiosInstance";

export const createBooking = async (bookingData) => {
  const response = await axiosInstance.post("/bookings", bookingData);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await axiosInstance.get("/bookings/my-bookings");
  return response.data;
};

export const updateBooking = async (id, bookingData) => {
  const response = await axiosInstance.patch(`/bookings/${id}`, bookingData);
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await axiosInstance.patch(`/bookings/${id}/cancel`);
  return response.data;
};

export const rescheduleBooking = async (id, bookingData) => {
  const response = await axiosInstance.patch(
    `/bookings/${id}/reschedule`,
    bookingData
  );
  return response.data;
};
