import { jwtDecode } from "jwt-decode";
import { getFromLocalStorage } from "./storageUtils";
import { IUserData } from "@/interfaces/User";

export const decodeToken = (): IUserData | null => {
  try {
    const token = getFromLocalStorage("token");
    if (!token) {
      console.warn("No token found in localStorage");
      return null;
    }

    const decodedToken = jwtDecode<IUserData>(token);

    if (decodedToken.exp && decodedToken.exp < Math.floor(Date.now() / 1000)) {
      console.warn("Token has expired");
      return null;
    }

    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
