import { IMaterial } from "../Material";
import { IModel } from "../Model/types";
import { IPostProcessing } from "../PostProcessing";

export interface IProcessItem {
  title?: string;
  model?: IModel;
  material?: IMaterial;
  postProcessings?: IPostProcessing[];
  manufacturerID?: string;
}

export interface IProgress {
  title: string;
  link: string;
  type: EProgressType;
}

export enum EProgressType {
  "title",
  "search",
}

export interface IProcessState {
  items: IProcessItem[];
  activeItemIndex: number;
  grid: boolean;
  searchText: string;
  progress: IProgress;
  filterOpen: boolean;
  hasChanged: boolean;
}

export interface IProcessContext {
  processState: IProcessState;
  createEmpytProcessItem(): void;
  deleteProcessItem(processId: number): void;
  selectProcessItem(index: number): void;
  setProgress(path: string): void;
  setGridState(grid: boolean): void;
  setFilterOpen(open: boolean): void;
  searchModels(name: string): void;
  setProcessItemTitle(title: string, index: number): void;
}
