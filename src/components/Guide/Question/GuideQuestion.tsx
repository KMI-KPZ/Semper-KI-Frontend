import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EGuideQuestionType } from "../../../interface/enums";
import { IOption } from "../../../interface/Interface";
import { IGuideOption, IGuideQuestion } from "../Interface";
import GRangeSlider from "./Components/GRangeSlider";
import GSelection from "./Components/GSelection";

interface Props {
  question: IGuideQuestion;
  setOptions(filterId: number, options: IGuideOption[]): void;
  selectQuestion(): void;
}

interface State {
  error: boolean;
}

export interface IGuideQuestionItem {
  options: IGuideOption[];
  confirmOptions(options: IGuideOption[]): void;
  skipQuestion(): void;
}

const GuideQuestion: React.FC<Props> = (props) => {
  const { question, selectQuestion, setOptions: setParentOptions } = props;
  const { filterId, options, title, type } = question;
  const { t } = useTranslation();
  const [state, setState] = useState<State>({
    error: false,
  });
  const { error } = state;

  useEffect(() => {
    setState((prevState) => ({ ...prevState, options }));
  }, [question]);

  const isAnyOptionChecked = (options: IGuideOption[]): boolean => {
    let checked: boolean = false;
    options.forEach((option: IGuideOption) => {
      if (option.checked === true) {
        checked = true;
      }
    });
    return checked;
  };

  const confirmOptions = (options: IGuideOption[]) => {
    if (isAnyOptionChecked(options)) {
      setState((prevState) => ({ ...prevState, error: false }));
      setParentOptions(filterId, options);
      selectQuestion();
    } else {
      setState((prevState) => ({ ...prevState, error: true }));
      setTimeout(() => {
        setState((prevState) => ({ ...prevState, error: false }));
      }, 2000);
    }
  };

  const skipQuestion = () => {
    setState((prevState) => ({ ...prevState, error: false }));
    selectQuestion();
  };

  const getGuideQuestionCards = (): JSX.Element => {
    switch (question.type) {
      case EGuideQuestionType.selection:
        return (
          <GSelection
            options={options}
            confirmOptions={confirmOptions}
            skipQuestion={skipQuestion}
          />
        );
      case EGuideQuestionType.range:
        return (
          <GRangeSlider
            options={options}
            confirmOptions={confirmOptions}
            skipQuestion={skipQuestion}
          />
        );

      default:
        return <>Error missing Question Type</>;
    }
  };

  return (
    <div className="guide-question">
      <h1>{t(title)}</h1>
      {error === true ? (
        <h2 className="guide-question-error">
          Bitte mindestens eine Option auswählen
        </h2>
      ) : null}
      <div className="guide-question-content">{getGuideQuestionCards()}</div>
    </div>
  );
};

export default GuideQuestion;
