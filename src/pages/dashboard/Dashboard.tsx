import React, { useState, useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { isMobile } from "../../components/Sidebar/utils";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(!isMobile());

  const toggleMenu = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(!isMobile());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex w-full h-screen">
      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />
      <div className="flex flex-col w-full h-full">
        <Navbar toggleMenu={toggleMenu} />
        <div className="overflow-auto flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
