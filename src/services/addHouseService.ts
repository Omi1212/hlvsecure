import apiClient from "@/api/axios/axiosInstance";
import { IAddHouseRequest } from "@/interfaces/AddHouse";

export const addHouse = async (houseData: IAddHouseRequest): Promise<void> => {
  try {
    const response = await apiClient.post(
      "/residential/house/register",
      houseData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding house:", error);
    throw error;
  }
};
