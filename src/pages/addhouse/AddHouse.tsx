import React, { useState } from "react";
import Title from "../../components/Title/Title";
import { Input, Button } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import { addHouse } from "@/services/addHouseService";
import { IAddHouseRequest } from "@/interfaces/AddHouse";

const AddHouse: React.FC = () => {
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [residents, setResidents] = useState<string>("");
  const [residentInCharge, setResidentInCharge] = useState<string>("");

  function emptyFields(): void {
    setHouseNumber("");
    setAddress("");
    setResidents("");
    setResidentInCharge("");
  }

  const postAddHouse = async (): Promise<void> => {
    if (
      houseNumber === "" ||
      address === "" ||
      residents === "" ||
      residentInCharge === ""
    ) {
      toast("Please fill all the fields", { type: "error" });
      return;
    }

    const residentsInt = parseInt(residents, 10);

    const houseData: IAddHouseRequest = {
      id: houseNumber,
      direccion: address,
      cantidad_residentes: residentsInt,
      users: residentInCharge,
    };

    try {
      await addHouse(houseData);
      toast("House added successfully", { type: "success" });
      emptyFields();
    } catch (error) {
      toast("Error adding house", { type: "error" });
      console.error("Error adding house:", error);
    }
  };

  return (
    <div className="container-tab">
      <Title
        title="Add House"
        description="Add a new family to the residential"
      />
      <div className="flex flex-col gap-4 max-w-3xl">
        <Input
          label="House number (ID)"
          type="text"
          value={houseNumber}
          onValueChange={setHouseNumber}
        />
        <Input
          label="Address"
          type="text"
          value={address}
          onValueChange={setAddress}
        />
        <Input
          label="Number of residents"
          type="text"
          value={residents}
          onValueChange={setResidents}
        />
        <Input
          label="Resident in charge (email)"
          type="text"
          value={residentInCharge}
          onValueChange={setResidentInCharge}
        />
        <p className="text-small text-gray-400">
          Remember not to share personal information about yourself or anyone
          else
        </p>
        <div className="mt-5">
          <Button
            onPress={postAddHouse}
            className="bg-zinc-700 text-white"
            variant="shadow"
            type="button"
          >
            Add house
          </Button>
        </div>
      </div>
      <ToastContainer stacked />
    </div>
  );
};

export default AddHouse;
