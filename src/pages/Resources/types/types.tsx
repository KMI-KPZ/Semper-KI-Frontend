import { string } from "yup";

export type OntoMaterialFlat = {
  title: string;
  URI: string;
  propList: string[];
};
export type OntoPrinterFlat = {
  title: string;
  URI: string;
};
export type OntoPrinter = {
  title: string;
  URI: string;
  properties: OntoPrinterProperty[];
};
export type OntoPrinterProperty = {
  name: string;
  values: string[];
};
