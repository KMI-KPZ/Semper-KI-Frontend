import { Button } from "@mui/material";
import React from "react";
import { EGuideQuestionState } from "../../../interface/enums";
import GOptions from "../Components/GOptions";
import { IGuideOption, IGuideQuestion } from "../Interface";

interface Props {
  questions: IGuideQuestion[];
  selectQuestion(filterId: number): void;
  applyFilter(): void;
  setOptions(filterId: number, options: IGuideOption[]): void;
}

const GuideOverview: React.FC<Props> = (props) => {
  const { questions, applyFilter, setOptions } = props;
  // const handleOnClickCard = (filterId: number) => {
  //   selectQuestion(filterId);
  // };

  const handleOnClickButton = () => {
    applyFilter();
  };

  return (
    <div className="flex flex-col gap-5 max-h-[80vh] bg-white overflow-y-auto p-5">
      <h1>Überblick</h1>
      {questions.map((question: IGuideQuestion, index: number) => (
        <div
          className="guide-overview-question"
          key={index}
          // onClick={(e) => handleOnClickCard(question.filterId)}
        >
          <h2>{question.title}</h2>
          <GOptions
            key={index}
            type={question.type}
            options={question.options}
            filterId={question.filterId}
            setOptions={setOptions}
            questionState={EGuideQuestionState.overview}
          />
        </div>
      ))}
      <Button variant="contained" onClick={(e) => handleOnClickButton()}>
        Suchen
      </Button>
    </div>
  );
};

export default GuideOverview;
