import { Heading } from "@component-library/Typography";
import React from "react";
import { GuideQuestionType } from "../../Guide";
import GuideOptions, { IGuideOptionProps } from "./options";

interface Props extends IGuideOptionProps {
  title: string;
  type: GuideQuestionType;
  active: boolean;
}

const GuideAnswer: React.FC<Props> = (props) => {
  const { title, active } = props;

  return (
    <div className="guide-answer-card">
      <Heading variant="h3">{title}</Heading>
      {active ? "---" : <GuideOptions {...props} />}
    </div>
  );
};

export default GuideAnswer;
