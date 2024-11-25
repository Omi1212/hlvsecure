import React from "react";
import Title from "../../components/Title/Title";
import { Input } from "@nextui-org/react";
import FormRequestPermissions from "../../components/FormRequestPermissions/FormRequestPermissions";

const RequestPermissions = () => {
  return (
    <div className="container-tab">
      <Title
        title="Request Permission"
        description="Request the necessary permits to give access to your home"
      />
      <FormRequestPermissions />
    </div>
  );
};

export default RequestPermissions;
