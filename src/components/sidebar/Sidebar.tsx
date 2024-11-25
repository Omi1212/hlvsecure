import React from "react";
import { NavLink } from "react-router-dom";
import links from "./index.js";
import "./sidebar.css";
import { Button } from "@nextui-org/react";
import { isMobile } from "./utils.js";
import { logout } from "@/auth/authService.js";
import { getFromLocalStorage } from "@/utils/storageUtils.js";
import { redirectUser } from "@/utils/navigationUtils.js";
import { decodeToken } from "@/utils/decodeToken.js";

interface SidebarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleMenu }) => {
  const email = decodeToken()?.email;

  const handleLogout = () => {
    if (email) {
      logout(email)
        .then(() => {
          redirectUser("/login");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.error("No email found");
    }
  };

  return (
    isOpen && (
      <aside className="bg-white fixed flex flex-col justify-between top-0 left-0 w-full md:max-w-[30%] lg:max-w-[20%] xl:max-w-[19%] 2xl:max-w-[18%] md:sticky h-screen shadow-lg transition-transform duration-300 ease-in-out z-30">
        <div>
          <div className="text-xl mb-10 p-8 font-semibold uppercase">
            <h1>HLVS</h1>
          </div>
          <div className="flex flex-col font-semibold">
            {links.map(
              (
                link: { icon: React.ElementType; to: string; name: string },
                index: number
              ) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={index}
                    to={`/${link.to}`}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-gradient-to-tr from-zinc-700 to-zinc-900 text-white"
                          : ""
                      } flex p-4 pl-6 w-[95%] rounded-r-full transition-all duration-100 ease-in gap-4 animation-bounce`
                    }
                    onClick={() => {
                      if (isMobile()) toggleMenu();
                    }}
                  >
                    <Icon size={24} />
                    {link.name}
                  </NavLink>
                );
              }
            )}
          </div>
        </div>
        <div className="flex justify-center px-10 pt-10 pb-20">
          <Button
            className="bg-transparent hover:bg-slate-100 uppercase"
            variant="flat"
            onPress={handleLogout}
          >
            Log out
          </Button>
        </div>
      </aside>
    )
  );
};

export default Sidebar;
