import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userRole } from "@/components/Sidebar/userRole";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  return allowedRoles.includes(userRole ?? "") ? (
    <Outlet />
  ) : (
    <Navigate to="/errorpage" />
  );
};

export default ProtectedRoute;
