import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Title } from "@/components/index";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import { redirectUser } from "@/utils/navigationUtils";
import { registerUserProfile } from "@/services/profileService";
import { DocumentType } from "@/interfaces/Profile";

const Profile: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [typeDocument, setTypeDocument] = useState<DocumentType | "">("");
  const [documentNumber, setDocumentNumber] = useState<string>("");
  const navigate = useNavigate();

  const documents: { key: string; type: DocumentType }[] = [
    { key: "1", type: "DUI" },
    { key: "2", type: "Passport" },
  ];

  const handleTypeDocumentChange = (value: string) => {
    const selectedDocument = documents.find((doc) => doc.key === value);
    if (selectedDocument) {
      setTypeDocument(selectedDocument.type);
    }
  };

  const redirectToLogin = () => {
    redirectUser("/login");
  };

  const emptyFields = () => {
    setName("");
    setTypeDocument("");
    setDocumentNumber("");
  };

  const registerProfileUser = async () => {
    if (!name || !typeDocument || !documentNumber) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      await registerUserProfile({
        name,
        email: userEmail,
        documentType: typeDocument as DocumentType,
        documentNumber,
        userType: "GUEST"
      });
      toast.success("Profile registered successfully");
      emptyFields();
      navigate("/login");
    } catch (error) {
      toast.error("Error registering profile");
      console.error(error);
    }
  };

  return (
    <div className="container-tab flex justify-center items-center flex-col h-[100vh] bg-gradient-to-tr from-zinc-700 to-zinc-900">
      <div className="bg-white rounded-md p-10">
        <Title
          title="Profile"
          description="To continue, complete the necessary information"
        />
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-4 max-w-3xl">
            <Input
              className="col-span-2"
              type="text"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className="col-span-2"
              type="email"
              label="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <Select
              label="Type of document"
              value={typeDocument}
              onChange={(e) => handleTypeDocumentChange(e.target.value)}
            >
              {documents.map((document) => (
                <SelectItem key={document.key} value={document.key}>
                  {document.type.toUpperCase()}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              label="Document number"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
            />
          </div>
          <div className="mt-8 flex gap-2 justify-end">
            <Button
              className="bg-zinc-700 text-white"
              variant="shadow"
              onPress={redirectToLogin}
            >
              Cancel
            </Button>
            <Button
              className="bg-zinc-700 text-white"
              variant="shadow"
              onPress={registerProfileUser}
            >
              Save
            </Button>
          </div>
          <ToastContainer stacked />
        </div>
      </div>
    </div>
  );
};

export default Profile;
