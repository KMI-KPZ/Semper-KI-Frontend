export interface ModelProps {
  id: string;
  fileName: string;
  tags: string[]; //
  date: string; //
  licenses: string[]; //
  certificates: string[]; //
  URI: string; //X
  createdBy: string;
}

export interface ModelDetailsProps {
  filename: string;
  measurements: {
    volume: number;
    surfaceArea: number;
    mbbDimensions: {
      _1: number;
      _2: number;
      _3: number;
    };
    mbbVolume: number;
  };
}

export enum ManufacturingModelType {
  "KISS",
  "USER",
}
