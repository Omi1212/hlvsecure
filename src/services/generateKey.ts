import apiClient from "@/api/axios/axiosInstance";

export const generateKey = async (email) => {
  try {
    const response = await apiClient.post("/entrance/key/create", {
      email,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error generating the key:", error);
    throw error;
  }
};
