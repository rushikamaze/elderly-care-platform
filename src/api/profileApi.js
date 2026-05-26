import axiosInstance from "./axiosInstance";

export const createProfile = async (profileData) => {
  const response = await axiosInstance.post("/profile", profileData);
  return response.data;
};

export const getMyProfile = async () => {
  const response = await axiosInstance.get("/profile/me");
  return response.data;
};

export const updateProfile = async (id, profileData) => {
  const response = await axiosInstance.put(`/profile/${id}`, profileData);
  return response.data;
};
