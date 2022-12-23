export interface IFilterItem {
  id: number;
  title: string;
  open: boolean;
  options: IFilterItemOption[];
}

export interface IFilterItemOption {
  id: number;
  title: string;
  selection?: string[];
  range?: IRangeFilter;
  range3D?: IRangeFilter;
}

export interface IRangeFilter {
  unit?: string | string[];
}

export interface IFilterAnswer {
  categoryId: number;
  filterId: number;
  title: string;
  value: IFilterValue;
}

export interface IFilterValue {
  checked: boolean;
  selection?: string[];
  range?: {
    min?: number;
    max?: number;
    unit?: string;
  };
  range3D?: {
    min_x?: number;
    max_x?: number;
    min_y?: number;
    max_y?: number;
    min_z?: number;
    max_z?: number;
    unit?: string;
  };
}
