import apiClient from "@/api/axios/axiosInstance";
import {
  IAnonymousAccessRequest,
  IAnonymousAccessResponse,
  IPedestrianKeyResponse,
  IVerifyKeyRequest,
  IVerifyKeyResponse,
} from "@/interfaces/Guard";
import { IGuard, IRegisterGuardRequest } from "@/interfaces/ManageGuard";

export const getAllGuards = async (): Promise<IGuard[]> => {
  try {
    const response = await apiClient.get<{ data: IGuard[] }>(
      "/users/all-guards"
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching guards:", error);
    throw error;
  }
};

export const registerGuard = async (
  guardData: IRegisterGuardRequest
): Promise<void> => {
  try {
    await apiClient.post("/users/register-guard", guardData);
  } catch (error) {
    console.error("Error registering guard:", error);
    throw error;
  }
};

//Endpoint Verificar clave de acceso peatonal
export const verifyKey = async (
  key: string
): Promise<IPedestrianKeyResponse> => {
  const response = await apiClient.post<IPedestrianKeyResponse>(
    `/entrance/key/verify-key`,
    {
      key,
      terminal: "PEDESTRIAN",
    }
  );
  return response.data;
};

export const verifyVehicularKey = async (
  requestData: IVerifyKeyRequest
): Promise<IVerifyKeyResponse> => {
  try {
    const response = await apiClient.post<IVerifyKeyResponse>(
      "/entrance/key/verify-key",
      requestData
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying vehicular key:", error);
    throw new Error("Failed to verify vehicular key");
  }
};

// Guard manual
export const sendAnonymousAccess = async (
  requestData: IAnonymousAccessRequest
): Promise<IAnonymousAccessResponse> => {
  try {
    const response = await apiClient.post<IAnonymousAccessResponse>(
      "/residential/entrance/anonymous-access",
      requestData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending anonymous access request:", error);
    throw new Error("Failed to send anonymous access request");
  }
};
