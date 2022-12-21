export interface IGuideQuestion {
  title: string;
  unit: string;
  options: IGuideQuestionOption[];
}

export interface IGuideQuestionOption {
  text: string;
  value: string | IGuideQuestionOptionValue | null;
}

export interface IGuideQuestionOptionValue {
  min?: number;
  max?: number;
}
