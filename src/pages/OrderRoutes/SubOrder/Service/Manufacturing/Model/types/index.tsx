export interface IModel {
  id: string;
  title: string;
  tags: string[];
  date: string;
  license: string;
  certificate: string[];
  URI: string;
  createdBy: string;
}

export enum EModelType {
  "kiss",
  "user",
}
