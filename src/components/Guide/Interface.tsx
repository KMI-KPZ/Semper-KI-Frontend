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
  value: string | IGuideQuestionOptionValue | null;
}

export interface IGuideQuestionOptionValue {
  min?: number;
  max?: number;
}

export interface IGuideAnswer {
  filter: string;
  value: string | IGuideQuestionOptionValue | null;
  unit: string | null;
}
