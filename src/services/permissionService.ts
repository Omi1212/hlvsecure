import apiClient from "@/api/axios/axiosInstance";
import {
  ICreatePermissionRequest,
  IManagePermissionsRequest,
  IPermissionDetailsResponse,
} from "@/interfaces/Permissions";

export const createPermission = async (
  data: ICreatePermissionRequest
): Promise<void> => {
  try {
    await apiClient.post("/residential/permission/create", data);
  } catch (error) {
    console.error("Error creating permission:", error);
    throw error;
  }
};

export const getPermissionsDetails = async (
  email: string
): Promise<IPermissionDetailsResponse> => {
  const response = await apiClient.get(
    `/residential/permission/permission-details/${email}`
  );
  return response.data;
};

// Obtener permisos
export const getPermissionsHouse = async (
  houseNumber: string
): Promise<IManagePermissionsRequest[]> => {
  const response = await apiClient.get<IPermissionDetailsResponse>(
    `/residential/permission/manage-permission/${houseNumber}`
  );
  return response.data.data;
};

// Aprobar permiso
export const approvePermission = async (id_permission: string): Promise<void> => {
  await apiClient.post(`/residential/permission/approve/${id_permission}`);
};

// Eliminar permiso
export const deletePermission = async (id_permission: string): Promise<void> => {
  await apiClient.delete(`/residential/permission/delete/${id_permission}`);
};
