export interface IApiAuthResponse {
  data: {
    token?: string; 
  } | null;
  message?: string;
}

export interface IGoogleLoginResponse {
  access_token: string;
}
