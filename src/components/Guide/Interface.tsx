import { IFilterValue } from "../Process/Filter/Interface";

export interface IGuideQuestion {
  answer?: number;
  id: number;
  title: string;
  unit: string | null;
  filter: string;
  options: IGuideQuestionOption[];
}

export interface IGuideQuestionOption {
  id: number;
  text: string;
  value: IFilterValue;
}

export interface IGuideAnswer {
  filter: string;
  value: IFilterValue;
}
