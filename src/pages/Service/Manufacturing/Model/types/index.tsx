export interface ModelProps {
  id: string;
  title: string;
  tags: string[]; //
  date: string; //
  license: string; //
  certificate: string[]; //
  URI: string; //X
  createdBy: string;
}

export enum ManufacturingModelType {
  "KISS",
  "USER",
}
