import { userRole } from "@/components/Sidebar/userRole";
import { HiOutlineBookOpen } from "react-icons/hi2";
import {
  PiLockSimpleOpen,
  PiPersonSimpleWalk,
  PiCarLight,
} from "react-icons/pi";
import { BsPersonGear } from "react-icons/bs";
import { VscKey, VscShield, VscHistory, VscDashboard } from "react-icons/vsc";
import { LiaUserSecretSolid } from "react-icons/lia";
import { IoCreateOutline, IoLockOpenOutline } from "react-icons/io5";
import { MdManageSearch } from "react-icons/md";
import { BsHouseAdd } from "react-icons/bs";
import { AiOutlineQrcode } from "react-icons/ai";

const getLinks = (role: string) => {
  switch (role) {
    // Usuario administrador de la residencial
    case "admin":
      return [
        {
          name: "Entry History",
          to: "dashboard/entryhistory",
          icon: VscHistory,
        },
        {
          name: "Manage Overtime",
          to: "dashboard/manageovertime",
          icon: VscDashboard,
        },
        { name: "Add House", to: "dashboard/addhouse", icon: BsHouseAdd },
        // { name: "Manage Houses", to: "dashboard/managehouses", icon: VscKey },
        {
          name: "Manage Guards",
          to: "dashboard/manageguards",
          icon: VscShield,
        },
        {
          name: "Report List",
          to: "dashboard/reports",
          icon: VscHistory,
        },
      ];
    // Usuario encargado de cada casa
    case "supervisor":
      return [
        {
          name: "Logs of Entries",
          to: "dashboard/logofentries",
          icon: VscHistory,
        },
        {
          name: "Create Permission",
          to: "dashboard/createpermission",
          icon: IoCreateOutline,
        },
        {
          name: "Manage Permissions",
          to: "dashboard/managepermissions",
          icon: MdManageSearch,
        },
        {
          name: "Manage Members",
          to: "dashboard/managemembers",
          icon: BsPersonGear,
        },
        {
          name: "Generate Keys",
          to: "dashboard/generatekeys",
          icon: AiOutlineQrcode,
        },
        {
          name: "Create Report",
          to: "dashboard/createreport",
          icon: IoCreateOutline,
        },
      ];
    // Usuario guardia de seguridad
    case "guard":
      return [
        {
          name: "Pedestrian Access",
          to: "dashboard/pedestrianaccess",
          icon: PiPersonSimpleWalk,
        },
        {
          name: "Vehicular Access",
          to: "dashboard/vehicularaccess",
          icon: PiCarLight,
        },
        {
          name: "Anonymous Access",
          to: "dashboard/anonymousaccess",
          icon: LiaUserSecretSolid,
        },
        {
          name: "Report List",
          to: "dashboard/reports",
          icon: VscHistory,
        },
      ];
    // Usuario invitado
    case "guest":
      return [
        {
          name: "Logs of Entries",
          to: "dashboard/logofentries",
          icon: HiOutlineBookOpen,
        },
        {
          name: "Permissions Details",
          to: "dashboard/permissiondetails",
          icon: PiLockSimpleOpen,
        },
        {
          name: "Generate Keys",
          to: "dashboard/generatekeys",
          icon: AiOutlineQrcode,
        },
        {
          name: "Create Report",
          to: "dashboard/createreport",
          icon: IoCreateOutline,
        },
        {
          name: "Report List",
          to: "dashboard/reports",
          icon: VscHistory,
        },
      ];

    // Usuario común
    case "user":
      return [
        {
          name: "Logs of Entries",
          to: "dashboard/logofentries",
          icon: HiOutlineBookOpen,
        },
        {
          name: "Request Permissions",
          to: "dashboard/requestpermissions",
          icon: IoLockOpenOutline,
        },
        {
          name: "Generate Keys",
          to: "dashboard/generatekeys",
          icon: AiOutlineQrcode,
        },
        {
          name: "Create Report",
          to: "dashboard/createreport",
          icon: IoCreateOutline,
        },
      ];
    default:
      return [];
  }
};

const links = getLinks(userRole ?? "guest");

export default links;
