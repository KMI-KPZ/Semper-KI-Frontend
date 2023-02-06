import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { IGuideOption, IGuideQuestion } from "./Interface";

interface Props {
  question: IGuideQuestion;
  toggelOption(filterId: number, optionIndex: number): void;
  selectQuestion(): void;
}

const GuideQuestion = ({ question, toggelOption, selectQuestion }: Props) => {
  const { t } = useTranslation();

  const selectOption = (index: number) => {
    toggelOption(question.filterId, index);
  };

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    selectOption(index);
  };

  const handleOnChangeCkeckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    selectOption(index);
  };

  return (
    <div className="guide-question">
      <h1>{t(question.title)}</h1>
      <div className="guide-question-cards">
        {question.options.map((option: IGuideOption, index: number) => (
          <div
            className="guide-question-card"
            key={index}
            onClick={(e) => handleOnClickCard(e, index)}
          >
            <input
              type="checkbox"
              checked={option.checked}
              onChange={(e) => handleOnChangeCkeckbox(e, index)}
              onClick={(e) => e.stopPropagation()}
            />
            {option.title}
          </div>
        ))}
      </div>
      <Button variant="contained" onClick={(e) => selectQuestion()}>
        Anwenden
      </Button>
    </div>
  );
};

export default GuideQuestion;
