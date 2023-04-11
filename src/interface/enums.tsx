export enum EUserType {
  "indefinite",
  "client",
  "contractor",
  "admin",
}

export enum EProgressType {
  "title",
  "search",
}

export enum EProcessStatusType {
  "ok",
  "error",
  "missing",
}

export enum EOrderState {
  "requested",
  "rejected",
  "confirmed",
  "consult",
  "production",
  "delivery",
}

export enum EGuideQuestionType {
  "selection",
  "multiSelection",
  "range",
}
export enum EGuideQuestionState {
  "question",
  "answer",
  "overview",
}

export enum EPostProcessingOptionType {
  "selection",
  "number",
  "text",
}

export enum EModelType {
  "kiss",
  "user",
}

export enum EHeaderItemPreferred {
  "header",
  "menu",
}
export enum EHeaderItemLoggedIn {
  "true",
  "false",
  "both",
}
