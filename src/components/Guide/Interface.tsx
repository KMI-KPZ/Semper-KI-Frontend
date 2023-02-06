import { IFilterAnswer } from "../Process/Filter/Interface";

export interface IGuideQuestion {
  filterId: number;
  title: string;
  options: IGuideOption[];
}

export interface IGuideOption {
  checked: boolean;
  title: string;
  answer: IFilterAnswer;
}
