import apiClient from "@/api/axios/axiosInstance";
import { IEntry } from "@/interfaces/EntryHistory";

export const getEntryHistory = async (): Promise<IEntry[]> => {
  try {
    const response = await apiClient.get<{ data: IEntry[] }>(
      "/residential/entrance/all"
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching entry history:", error);
    throw error;
  }
};
