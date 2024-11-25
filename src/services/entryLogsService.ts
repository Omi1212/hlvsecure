import apiClient from "@/api/axios/axiosInstance";
import { ILogEntry } from "@/interfaces/LogsEntries";

export const getLogsOfEntries = async (): Promise<ILogEntry[]> => {
  try {
    const response = await apiClient.get(`/residential/entrance/all/`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching logs of entries:", error);
    throw error;
  }
};
