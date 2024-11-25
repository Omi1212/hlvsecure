export interface IPedestrianKeyResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface IVerifyKeyRequest {
  key: string;
  terminal: string;
}

export interface IVerifyKeyResponse {
  success: boolean;
  message: string;
}

export interface IAnonymousAccessRequest {
  name: string;
  reason: string;
  type: string; 
  date: string;
  time: string;
}

export interface IAnonymousAccessResponse {
  success: boolean; 
  message: string; 
}

