import axiosInstance from "./axiosInstance";

export const getAllCaregivers = async () => {
  const response = await axiosInstance.get("/caregivers");
  return response.data;
};

export const getCaregiverById = async (id) => {
  const response = await axiosInstance.get(`/caregivers/${id}`);
  return response.data;
};
