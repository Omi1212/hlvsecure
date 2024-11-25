export type DocumentType = "DUI" | "Passport";

export interface IUserProfile {
  name: string;
  email: string;
  documentType: DocumentType;
  documentNumber: string;
  userType: string;
}
