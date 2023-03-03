export interface IService {
  title: string;
  chapters: IServiceChapter[];
}

export interface IServiceChapter {
  title: string;
  icon: string;
  questions: IServiceQuestion[];
}

export interface IServiceQuestion {
  title: string;
  type: EServiceQuestionType;
  options?: string[];
  range?: [number, number];
  answer?: number | string;
}

export enum EServiceQuestionType {
  "text",
  "textarea",
  "selection",
  "number",
}
