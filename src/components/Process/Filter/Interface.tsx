export interface IFilterItem {
  id: number;
  title: string;
  open: boolean;
  options: IFilterItemOption[];
}

export interface IFilterItemOption {
  id: number;
  title: string;
  checked: boolean;
  selection?: string[];
  range?: IRangeFilter;
  range3D?: IRangeFilter;
}

export interface IRangeFilter {
  unit?: string | string[];
}
