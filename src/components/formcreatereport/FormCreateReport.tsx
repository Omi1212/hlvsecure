import React, { useState } from "react"; 
import { Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createReport } from "@/services/reportService";
import { jwtDecode } from "jwt-decode";

const reportTypes = [
  { key: "SUSPICIOUS_ACTIVITY", label: "Actividad sospechosa" },
  { key: "PROPERTY_DAMAGE", label: "Daño en la propiedad" },
  { key: "EXCESSIVE_NOISE", label: "Exceso de ruido" },
];

const FormCreateReport = () => {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("SUSPICIOUS_ACTIVITY"); // Inicializamos con una cadena

  const token = localStorage.getItem("token"); // Obtener el token del localStorage
  let email = "";
  if (token) {
    const decodedToken: any = jwtDecode(token);
    email = decodedToken.email;
  }

  const handleSubmit = async () => {
    if (!description || !type) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    const data = {
      description,
      type, // Aquí será una cadena simple
      email,
    };

    try {
      await createReport(data); // Llama al servicio con datos y token
      toast.success("Reporte creado exitosamente.");
      setDescription(""); // Limpia los campos del formulario
      setType("SUSPICIOUS_ACTIVITY");
    } catch (error: any) {
      console.error("Error al crear el reporte:", error);
      const errorMessage =
        error.response?.data?.message || "Hubo un error al crear el reporte.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col max-w-3xl gap-4">
        <h1 className="text-2xl font-bold mb-4">Crear Reporte</h1>
        <Textarea
          label="Descripción del Reporte"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ingresa una breve descripción del problema..."
          rows={4}
          required
        />
        <Select
          label="Tipo de Reporte"
          selectedKeys={new Set([type])} // Ajustamos para que acepte un conjunto
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys).join(""); // Convertimos el Set a una cadena
            setType(selectedKey);
          }}
          required
        >
          {reportTypes.map((report) => (
            <SelectItem key={report.key}>{report.label}</SelectItem>
          ))}
        </Select>
        <div className="mt-8 py-4 flex justify-center lg:justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-zinc-700 text-white"
            variant="shadow"
          >
            Crear Reporte
          </Button>
        </div>
      </div>
      <ToastContainer stacked />
    </div>
  );
};

export default FormCreateReport;
