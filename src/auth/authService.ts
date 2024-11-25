import apiClient from "@/api/axios/axiosInstance";
import { IGoogleLoginResponse, IApiAuthResponse } from "@/interfaces/Auth";
import { redirectUser } from "@/utils/navigationUtils";
import {
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/storageUtils";

export const sendAuth = async (
  token: IGoogleLoginResponse["access_token"]
): Promise<void> => {
  try {
    const response = await apiClient.post<IApiAuthResponse>(
      `/auth/login/${token}`,
      { token }
    );

    const { data, message } = response.data || {};

    if (data?.token) {
      const { token: JWToken } = data;
      saveToLocalStorage("token", JWToken);
      switch (response.status) {
        case 200:
          redirectUser("/profile");
          break;
        case 202:
          redirectUser("/dashboard");
          break;
        default:
          throw new Error(`Unexpected status code: ${response.status}`);
      }
    } else if (message === "Redirecting to register user form") {
      redirectUser("/profile");
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    throw new Error("Error during authentication");
  }
};

export const logout = async (email: string): Promise<void> => {
  try {
    await apiClient.post(`/auth/logout/${email}`);
    removeFromLocalStorage("token");
    removeFromLocalStorage("email");
    redirectUser("/login");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
