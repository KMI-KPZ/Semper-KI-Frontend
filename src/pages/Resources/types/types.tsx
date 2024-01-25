import { type } from "os";
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

export type OntoPrinterType = "new" | "existing" | "variant";

export type OntoPrinter = (
  | NewOntoPrinter
  | ExistingOntoPrinter
  | VariantOntoPrinter
) & { type: OntoPrinterType };

export interface NewOntoPrinter {
  title: string;
  properties: OntoPrinterProperty[];
  type: "new";
}
export interface ExistingOntoPrinter {
  title: string;
  URI: string;
  properties: OntoPrinterProperty[];
  type: "existing";
}
export interface VariantOntoPrinter {
  lastURI: string;
  title: string;
  properties: OntoPrinterProperty[];
  type: "variant";
}

export type OntoPrinterProperty = {
  name: string;
  values: string[];
};
