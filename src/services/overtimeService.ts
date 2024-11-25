import apiClient from "@/api/axios/axiosInstance";
import { IManageOvertimeRequest } from "@/interfaces/Overtime";

export const updateOvertime = async (
  overtimeData: IManageOvertimeRequest
): Promise<void> => {
  try {
    const response = await apiClient.put("/grace-time/update", overtimeData);
    return response.data;
  } catch (error) {
    console.error("Error updating overtime:", error);
    throw error;
  }
};
