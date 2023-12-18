import { ServiceType } from "../../hooks/useService";
import { MaterialProps } from "../Material/Material";
import { ModelProps } from "../Model/types";
import { PostProcessingProps } from "../PostProcessing/PostProcessing";

export type ManufacturingServiceProps = {
  model?: ModelProps;
  material?: MaterialProps;
  postProcessings?: PostProcessingProps[];
  manufacturerID?: string;
};

export type UpdateServiceManufacturingProps = {
  title?: string;
  model?: ModelProps;
  material?: MaterialProps;
  postProcessings?: PostProcessingProps[];
  manufacturerID?: string;
};

export interface ServiceManufacturingState {
  grid: boolean;
  searchText: string;
  filterOpen: boolean;
}

export interface ServiceManufacturingContextReturnProps {
  processState: ServiceManufacturingState;
  setGrid(grid: boolean): void;
  setFilter(open: boolean): void;
  setSearchInput(name: string): void;
  service: ManufacturingServiceProps;
}

export const instanceOfManufacturingServiceProps = (
  object: any
): object is ManufacturingServiceProps => {
  return (
    "model" in object ||
    "material" in object ||
    "postProcessings" in object ||
    "manufacturerID" in object
  );
};
