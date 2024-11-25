import { decodeToken } from "@/utils/decodeToken";
import { getFromLocalStorage } from "@/utils/storageUtils";

const token = getFromLocalStorage("token");
let role: string | null = null;

if (token) {
  const decodedToken = decodeToken();
  role = decodedToken && decodedToken.rol ? decodedToken.rol.toLowerCase() : null;
  if (role) {
    role;
  }
}

export const userRole = role; 