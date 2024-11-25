import React, { useState } from "react";
import Title from "@/components/Title/Title";
import {
  Button,
  Input,
  RadioGroup,
  Radio,
  Textarea,
} from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";

const AnonymousAccess = () => {
  const [visitantName, setVisitantName] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [typeOfEntrance, setTypeOfEntrance] = useState("");

  function emptyFields() {
    setVisitantName("");
    setReasonForVisit("");
    setTypeOfEntrance("");
  }

  const handleSendAccess = async () => {
    if (!visitantName || !reasonForVisit || !typeOfEntrance) {
      toast.error("Please fill all the fields");
      return;
    }

    // Simula el envío mostrando un toast
    toast.success("Entry opened successfully");
    emptyFields();
  };

  return (
    <div className="container-tab">
      <Title
        title="Anonymous Access"
        description="Pay attention to who walks through that door"
      />
      <form className="mt-8">
        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          <Input
            className="col-span-2"
            type="text"
            label="Visitant name"
            onClear={() => console.log("input cleared")}
            value={visitantName}
            onValueChange={setVisitantName}
          />
          <Textarea
            className="col-span-2"
            type="text"
            label="Reason for visit"
            onClear={() => console.log("input cleared")}
            value={reasonForVisit}
            onValueChange={setReasonForVisit}
          />
        </div>
        <div className="mt-5">
          <RadioGroup
            label="Select the type of entrance"
            orientation="horizontal"
            value={typeOfEntrance}
            onValueChange={setTypeOfEntrance}
          >
            <Radio className="mr-4" value="PEDESTRIAN">
              <span className="text-sm">Pedestrian</span>
            </Radio>
            <Radio value="VEHICULAR">
              <span className="text-sm">Vehicular</span>
            </Radio>
          </RadioGroup>
        </div>
        <div className="mt-8">
          <Button
            onPress={handleSendAccess}
            className="bg-zinc-700 text-white"
            variant="shadow"
          >
            Open entry
          </Button>
        </div>
      </form>
      <ToastContainer stacked />
    </div>
  );
};

export default AnonymousAccess;