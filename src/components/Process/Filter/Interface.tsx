export interface IFilterItem {
  id: number;
  isChecked: boolean;
  isOpen: boolean;
  question: IFilterQuestion;
  answer: IFilterAnswer | null;
}

export interface IFilterQuestion {
  isSelectable: boolean;
  title: string;
  category: string;
  type: string;
  values: string[] | null;
  units: string[] | string | null;
}

export interface IFilterAnswer {
  unit: string | null;
  value: string | number | { min?: number; max?: number };
}
