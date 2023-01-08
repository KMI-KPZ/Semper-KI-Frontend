import { IFilterAnswer } from "../Process/Filter/Interface";

export interface IGuideQuestion {
  filterId: number;
  id: number;
  title: string;
  options: IGuideOption[];
}

export interface IGuideOption {
  title: string;
  answer: IFilterAnswer;
}
