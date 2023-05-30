import React from "react";
import { EGuideQuestionType } from "../..";
import GuideOptions, { IGuideOptionProps } from "./options";

interface Props extends IGuideOptionProps {
  title: string;
  type: EGuideQuestionType;
  active: boolean;
}

const GuideAnswer: React.FC<Props> = (props) => {
  const { title, active } = props;

  return (
    <div className="guide-answer-card">
      <h3>{title}</h3>
      {active ? "---" : <GuideOptions {...props} />}
    </div>
  );
};

export default GuideAnswer;
