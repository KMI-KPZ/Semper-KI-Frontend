import { Button } from "@mui/material";
import React from "react";
import { IGuideOption, IGuideQuestion } from "./Interface";

interface Props {
  questions: IGuideQuestion[];
  selectQuestion(filterId: number): void;
  applyFilter(): void;
}

const GuideOverview: React.FC<Props> = ({
  questions,
  selectQuestion,
  applyFilter,
}) => {
  const handleOnClickCard = (filterId: number) => {
    selectQuestion(filterId);
  };

  const handleOnClickButton = () => {
    applyFilter();
  };
  return (
    <div className="guide-overview">
      <h1>Überblick</h1>
      {questions.map((question: IGuideQuestion, index: number) => (
        <div
          className="guide-overview-question"
          key={index}
          onClick={(e) => handleOnClickCard(question.filterId)}
        >
          <h2>{question.title}</h2>
          <div className="guide-overview-options">
            {question.options.map(
              (option: IGuideOption, optionIndex: number) => (
                <div className="guide-overview-option" key={optionIndex}>
                  <input
                    type="checkbox"
                    checked={option.checked}
                    onChange={(e) => {}}
                    onClick={(e) => {}}
                  />
                  {option.title}
                </div>
              )
            )}
          </div>
        </div>
      ))}
      <Button variant="contained" onClick={(e) => handleOnClickButton()}>
        Suchen
      </Button>
    </div>
  );
};

export default GuideOverview;
