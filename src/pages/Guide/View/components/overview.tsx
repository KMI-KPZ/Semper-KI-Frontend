import { Heading } from "@component-library/Typography";
import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { EGuideQuestionState, IGuideOption, IGuideQuestion } from "../../Guide";
import GuideOptions from "./options";

interface Props {
  questions: IGuideQuestion[];
  selectQuestion(filterId: number): void;
  applyFilter(): void;
  setOptions(filterId: number, options: IGuideOption[]): void;
}

const GuideOverview: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { questions, applyFilter, setOptions } = props;

  const handleOnClickButton = () => {
    applyFilter();
  };

  return (
    <div className="flex max-h-[80vh] flex-col gap-5 overflow-y-auto bg-white p-5">
      <Heading variant="h1">{t("Guide.Overview.GuideOverview.header")}</Heading>
      {questions.map((question: IGuideQuestion, index: number) => (
        <div
          className="guide-overview-question"
          key={index}
          // onClick={(e) => handleOnClickCard(question.filterId)}
        >
          <Heading variant="h2">{question.title}</Heading>
          <GuideOptions
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
        {t("Guide.Overview.GuideOverview.button.search")}
      </Button>
    </div>
  );
};

export default GuideOverview;
