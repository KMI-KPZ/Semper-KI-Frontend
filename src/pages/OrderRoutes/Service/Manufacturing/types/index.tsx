import { ServiceProps } from "../../Service";
import { ServiceType } from "../../hooks/useService";
import { MaterialProps } from "../Material/Material";
import { ModelProps } from "../Model/types";
import { PostProcessingProps } from "../PostProcessing/PostProcessing";

export type ServiceManufacturingProps = {
  type: ServiceType.MANUFACTURING;
  model?: ModelProps;
  material?: MaterialProps;
  postProcessings?: PostProcessingProps[];
  manufacturerID?: string;
} & ServiceProps;

export interface UpdateServiceManufacturingProps {
  title?: string;
  model?: ModelProps;
  material?: MaterialProps;
  postProcessings?: PostProcessingProps[];
  manufacturerID?: string;
}

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
}
