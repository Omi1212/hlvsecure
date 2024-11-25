export interface IGuard {
  id: string;
  nombre: string;
  correo_google: string;
}

export interface IRegisterGuardRequest {
  email: string;
}
