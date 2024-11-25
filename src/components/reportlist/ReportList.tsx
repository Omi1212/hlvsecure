import React, { useEffect, useState } from "react";
import { getReports } from "@/services/reportService";
import {
  Button,
  Card,
  CardBody,
  CardFooter
} from "@nextui-org/react";
import { redirectUser } from "@/utils/navigationUtils";

export interface Report {
  id: string; 
  nombre: string;
  description: string;
  type: string;
  date: string; 
}

const ReportList = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    redirectUser("/dashboard");
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token") || ""; 
        const fetchedReports = await getReports(token);

        const sortedReports = fetchedReports.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setReports(sortedReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div>Cargando reportes...</div>;
  }

  if (reports.length === 0) {
    return <div>No hay reportes disponibles.</div>;
  }

  return (
    <div className="mt-5 px-4"> 
      <div className="flex flex-col max-w-3xl gap-6 mx-auto"> 
        <Button onClick={handleBack} className="w-20">Regresar</Button>
        <h2 className="text-2xl font-bold mb-4">Lista de Reportes</h2>

        
        <div className="overflow-y-auto max-h-[600px]"> 
          <div className="flex flex-col gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="border border-gray-300 shadow-md">
                <CardBody>
                  <h3 className="text-lg font-bold mb-2">{report.nombre}</h3>
                  <div className="text-sm text-gray-600 mb-4">
                    Tipo: {report.type}
                  </div>
                  <div>{report.description}</div>
                </CardBody>
                <CardFooter className="flex justify-between text-sm text-gray-500">
                  <div>
                    Fecha: {new Date(report.date).toLocaleString()}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportList;
