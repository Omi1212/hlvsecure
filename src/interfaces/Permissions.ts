export interface ICreatePermissionRequest {
  email_house: string;
  email_permission: string;
  days: string[];
  firstDate: string;
  secondDate: string;
  initialHour: string;
  finalHour: string;
  expirationType: string;
}

export interface IPermissionDetailsRequest {
  id: string;
  user: string;
  house: string;
  fecha_inicio: string;
  fecha_final: string;
  dias_semana: string[];
  hora_inicio: string;
  hora_fin: string;
  tipo_expiracion: string;
  activo: boolean;
}

export interface IManagePermissionsRequest {
  id: string;
  user: string;
  house: string;
  fecha_inicio: string;
  fecha_final: string;
  hora_inicio: string;
  hora_fin: string;
  aprovado: boolean;
  actions?: string;
}

export interface IPermissionDetailsResponse {
  message: string;
  data: IManagePermissionsRequest[];
}

