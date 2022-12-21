export interface IFilterItemType {
  id: number;
  title: string;
  open: boolean;
  options: IFilterItemOptionType[];
}

export interface IFilterItemOptionType {
  id: number;
  title: string;
  checked: boolean;
  selection?: string[];
  range?: IRangeFilterType;
  range3D?: IRangeFilterType;
}

export interface IRangeFilterType {
  unit?: string | string[];
}
