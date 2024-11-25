import apiClient from "@/api/axios/axiosInstance";
import { IHouseDetailsResponse, IAddResidentRequest } from "@/interfaces/House";

export const getHouseDetails = async (
  email: string
): Promise<IHouseDetailsResponse> => {
  const response = await apiClient.get(`/residential/house/user-house/${email}`);
  return response.data.data; 
};

export const registerResident = async (data: IAddResidentRequest): Promise<void> => {
  await apiClient.post("/residential/house/register-residents", data);
};
