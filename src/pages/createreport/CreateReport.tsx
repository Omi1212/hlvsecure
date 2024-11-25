import React from "react";
import Title from "../../components/Title/Title";
import FormCreateReport from "../../components/formcreatereport/FormCreateReport";

const CreateReport = () => {
    return (
        <div className="container-tab">
            <Title
                title="Create Report"
                description="Reports are used to improve the security of the house"
        />
        <div>
            <FormCreateReport />
        </div>
        </div>
    );
};

export default CreateReport;