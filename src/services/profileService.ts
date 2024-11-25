import apiClient from "@/api/axios/axiosInstance";
import { IUserProfile } from "@/interfaces/Profile";

export const registerUserProfile = async (profile: IUserProfile): Promise<void> => {
    try {
      await apiClient.post("/users/register", profile);
    } catch (error) {
      console.error("Error registering profile:", error);
      throw error;
    }
  };