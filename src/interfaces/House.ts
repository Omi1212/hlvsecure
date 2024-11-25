export interface IResident {
  id: string;
  nombre: string;
  correo_google: string;
  tipo_documento?: string | null;
  numero_documento?: string | null;
  tipo_usuario: string;
  id_casa: number;
  direccion?: string | null;
}

export interface IHouseDetailsResponse {
  house_number: string;
  direccion: string;
  cantidad_residentes: number;
  entrances_id?: string | null;
  users: IResident[];
  permissions?: any | null; 
}

export interface IAddResidentRequest {
  house_id: string;
  email: string;
}
