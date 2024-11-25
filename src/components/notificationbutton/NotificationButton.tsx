import React, { useState } from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  time: string;
  date: string;
}

const notificationsData: Notification[] = [
  {
    id: 1,
    title: "Nueva función disponible",
    message:
      "¡Echa un vistazo a nuestra última actualización con nuevas funciones emocionantes!",
    type: "info",
    time: "hace 2 min",
    date: "23 de noviembre de 2023",
  },
  {
    id: 2,
    title: "Tarea completada",
    message: "¡Buen trabajo! Has completado con éxito tu tarea asignada.",
    type: "success",
    time: "hace 10 min",
    date: "23 de noviembre de 2023",
  },
  {
    id: 3,
    title: "Suscripción a punto de expirar",
    message:
      "Tu suscripción expirará en 3 días. Renueva ahora para evitar interrupciones.",
    type: "warning",
    time: "hace 1 hora",
    date: "23 de noviembre de 2023",
    
  },
  {
    id: 4,
    title: "Nueva función disponible",
    message:
      "¡Echa un vistazo a nuestra última actualización con nuevas funciones emocionantes!",
    type: "info",
    time: "hace 2 min",
    date: "23 de noviembre de 2023",
  },
];

const NotificationsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "info":
        return <InfoIcon className="text-gray-600" />;
      case "success":
        return <CheckCircleIcon className="text-gray-600" />;
      case "warning":
        return <WarningAmberIcon className="text-gray-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Botón de campana */}
      <button
        className="relative text-gray-600 hover:text-blue-400 transition"
        onClick={togglePanel}
      >
        <NotificationsActiveIcon fontSize="large" />
        <span className="absolute top-0 right-0 bg-red-600 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
          3
        </span>
      </button>

      {/* Panel lateral de notificaciones con animación */}
      <div
        className={`fixed top-0 right-0 h-screen w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Notificaciones</h2>
          <button onClick={togglePanel}>
            <CloseIcon className="text-gray-600" />
          </button>
        </div>

        {/* Lista de Notificaciones */}
        <div className="p-4 space-y-4">
          {notificationsData.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start bg-gray-50 rounded-lg p-4 shadow-sm border"
            >
              {/* Icono */}
              <div className="mr-4">{getIcon(notification.type)}</div>

              {/* Contenido */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <div className="mt-1 text-xs text-gray-400">
                  <p>{notification.time}</p>
                  <p>{notification.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
