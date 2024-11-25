import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  LogIn,
  Home,
  Dashboard,
  LogsEntries,
  PermissionsDetails,
  GenerateKeys,
  Profile,
  EntryHistory,
  ManageOvertime,
  ManageGuards,
  PedestrianAccess,
  VehicularAccess,
  AnonymousAccess,
  CreatePermission,
  RequestPermissions,
  ManagePermissions,
  ManageMembers,
  AddHouse,
  CreateReport,
} from "@/pages";
import ReportList from "@/components/reportlist/ReportList";
import { ErrorPage, PageTitle, ProtectedRoute } from "@/components";
import { userRole } from "@/components/Sidebar/userRole";

const getDefaultRoute = (role: string) => {
  switch (role) {
    case "admin":
      return "/dashboard/entryhistory";
    case "supervisor":
      return "/dashboard/logofentries";
    case "guard":
      return "/dashboard/pedestrianaccess";
    case "user":
    case "guest":
      return "/dashboard/logofentries";
    default:
      return "/login";
  }
};

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <PageTitle title="HLVS | Home" />
            <Home />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <PageTitle title="HLVS | Login" />
            <LogIn />
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <PageTitle title="HLVS | Profile" />
            <Profile />
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["admin", "supervisor", "guard", "user", "guest"]}
          />
        }
      >
        <Route path="" element={<Navigate to={getDefaultRoute(userRole || "guest")} />} />
        <Route element={<Dashboard />}>
          <Route
            path="logofentries"
            element={
              <>
                <PageTitle title="HLVS | Logs of Entries" />
                <LogsEntries />
              </>
            }
          />
          <Route
            path="permissiondetails"
            element={
              <>
                <PageTitle title="HLVS | Permissions Details" />
                <PermissionsDetails />
              </>
            }
          />
          <Route
            path="generatekeys"
            element={
              <>
                <PageTitle title="HLVS | Generate Keys" /> <GenerateKeys />
              </>
            }
          />

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route
              path="entryhistory"
              element={
                <>
                  <PageTitle title="HLVS | Entry History" />
                  <EntryHistory />
                </>
              }
            />
            <Route
              path="manageovertime"
              element={
                <>
                  <PageTitle title="HLVS | Manage Overtime" />
                  <ManageOvertime />
                </>
              }
            />
            <Route
              path="addhouse"
              element={
                <>
                  <PageTitle title="HLVS | Add House" />
                  <AddHouse />
                </>
              }
            />
            {/* <Route
              path="managehouses"
              element={
                <>
                  <PageTitle title="HLVS | Manage Houses" />
                  <ManageHouses />
                </>
              }
            /> */}
            <Route
              path="manageguards"
              element={
                <>
                  <PageTitle title="HLVS | Manage Guards" />
                  <ManageGuards />
                </>
              }
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["supervisor"]} />}>
            <Route
              path="createpermission"
              element={
                <>
                  <PageTitle title="HLVS | Create Permission" />
                  <CreatePermission />
                </>
              }
            />
            <Route
              path="managepermissions"
              element={
                <>
                  <PageTitle title="HLVS | Manage Permissions" />
                  <ManagePermissions />
                </>
              }
            />
            <Route
              path="managemembers"
              element={
                <>
                  <PageTitle title="HLVS | Manage Members" />
                  <ManageMembers />
                </>
              }
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["guard"]} />}>
            <Route
              path="pedestrianaccess"
              element={
                <>
                  <PageTitle title="HLVS | Pedestrian Access" />
                  <PedestrianAccess />
                </>
              }
            />
            <Route
              path="vehicularaccess"
              element={
                <>
                  <PageTitle title="HLVS | Vehicular Access" />
                  <VehicularAccess />
                </>
              }
            />
            <Route
              path="anonymousaccess"
              element={
                <>
                  <PageTitle title="HLVS | Anonymous Access" />
                  <AnonymousAccess />
                </>
              }
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["user", "guest"]} />}>
            <Route
              path="requestpermissions"
              element={
                <>
                  <PageTitle title="HLVS | Request Permissions" />
                  <RequestPermissions />
                </>
              }
            />
          </Route>
          <Route  path="createreport" element={<CreateReport />} />
        </Route>
        <Route path="reports" element={<ReportList reportId="someReportId" />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
