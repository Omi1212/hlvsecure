import React from "react";
import Title from "../../components/Title/Title";
import ReportList from "@/components/reportlist/ReportList";

const ReportView = () => {
    return (
        <div className="container-tab">
            <Title
                title="Incidentes Registrados"
                description="Incidentes registrados recientemente"
        />
        <div>
            <ReportList />
        </div>
        </div>
    );
};

export default ReportView;