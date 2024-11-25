import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsButton from "../../components/notificationbutton/NotificationButton"

const Navbar = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <nav className="flex w-full items-center justify-between p-4 2xl:pr-10 shadow-md sticky top-0 z-20 bg-white">
      {/* Botón del menú */}
      <div>
        <button onClick={toggleMenu}>
          <MenuRoundedIcon fontSize="large" className="text-gray-600" />
        </button>
      </div>

      {/* Botón de notificaciones */}
      <div className="ml-auto relative">
        <NotificationsButton />
      </div>
    </nav>
  );
};

export default Navbar;
