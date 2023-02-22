import { EGuideQuestionType } from "../../interface/enums";
import { IFilterAnswer } from "../Process/Filter/Interface";

export interface IGuide {
  title: string;
  questions: IGuideQuestion[];
}

export interface IGuideQuestion {
  type: EGuideQuestionType;
  filterId: number;
  title: string;
  options: IGuideOption[];
}

export interface IGuideOption {
  checked: boolean;
  title?: string;
  icon?: string;
  answer: IFilterAnswer;
}
