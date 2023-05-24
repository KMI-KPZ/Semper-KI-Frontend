import { EGuideQuestionType } from "@/interface/enums";
import React from "react";
import GOptions, {
  IGuideOptionProps,
} from "../../Question/components/GOptions";

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
      {active ? "---" : <GOptions {...props} />}
    </div>
  );
};

export default GuideAnswer;
