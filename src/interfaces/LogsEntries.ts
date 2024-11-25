export interface ILogEntry {
    id: string;
    email: string;
    house: string;
    hour: string;
    date: string;
    entryPlace: string;
  }
  
  export interface IColumn {
    uid: keyof ILogEntry;
    name: string;
    sortable?: boolean;
  }
  