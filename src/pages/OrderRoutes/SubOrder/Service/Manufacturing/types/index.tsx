import { ServiceProps } from "../../Service";
import { IMaterial } from "../Material/Material";
import { IModel } from "../Model/types";
import { IPostProcessing } from "../PostProcessing/PostProcessing";

export interface ServiceManufacturingProps extends ServiceProps {
  title: string;
  model?: IModel;
  material?: IMaterial;
  postProcessings?: IPostProcessing[];
  manufacturerID?: string;
}

export interface UpdateServiceManufacturingProps {
  title?: string;
  model?: IModel;
  material?: IMaterial;
  postProcessings?: IPostProcessing[];
  manufacturerID?: string;
}

export interface ServiceManufacturingState {
  grid: boolean;
  searchText: string;
  filterOpen: boolean;
}

export interface ServiceManufacturingContextReturnProps {
  processState: ServiceManufacturingState;
  setGridState(grid: boolean): void;
  setFilterOpen(open: boolean): void;
  setSearchInput(name: string): void;
}
