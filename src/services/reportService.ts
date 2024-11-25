import apiClient from "@/api/axios/axiosInstance";
import { IReport } from "@/interfaces/Report";

export const createReport = async (reportData: Partial<IReport>, token: string): Promise<void> => {
    try {
      const response = await apiClient.post("/report/create", reportData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating report:", error);
      throw error;
    }
  };
  

  export const getReports = async (token: string): Promise<IReport[]> => {
    try {
      const response = await apiClient.get("/report/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Respuesta del backend:", response.data); // Agrega esto para inspeccionar.
      return response.data.data; // Ajusta aquí según la estructura observada.
    } catch (error) {
      console.error("Error al obtener los reportes:", error);
      throw error;
    }
  };
  

export const getReportById = async (id: string, token: string): Promise<IReport> => {
  try {
    const response = await apiClient.get(`/report/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting report by id:", error);
    throw error;
  }
};
