export interface ModelProps {
  id: string;
  title: string;
  tags: string[]; //
  date: string; //
  licenses: string[]; //
  certificates: string[]; //
  URI: string; //X
  createdBy: string;
}

export enum ManufacturingModelType {
  "KISS",
  "USER",
}
