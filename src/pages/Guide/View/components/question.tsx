import { Heading } from "@component-library/Typography";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  EGuideQuestionState,
  GuideOptionProps,
  GuideQuestionProps,
} from "../../Guide";
import GuideOptions from "./options";

interface Props {
  question: GuideQuestionProps;
  setOptions(filterId: number, options: GuideOptionProps[]): void;
  selectQuestion(activeQuestionIndex?: number): void;
  activeQuestionIndex: number;
}

interface State {
  error: boolean;
}

const GuideQuestion: React.FC<Props> = (props) => {
  const {
    question,
    selectQuestion,
    setOptions: setParentOptions,
    activeQuestionIndex,
  } = props;
  const { filterId, options, title, type } = question;
  const { t } = useTranslation();
  const [state, setState] = useState<State>({
    error: false,
  });
  const { error } = state;

  useEffect(() => {
    setState((prevState) => ({ ...prevState, options }));
  }, [question]);

  const isAnyOptionChecked = (options: GuideOptionProps[]): boolean => {
    let checked: boolean = false;
    options.forEach((option: GuideOptionProps) => {
      if (option.checked === true) {
        checked = true;
      }
    });
    return checked;
  };

  const confirmOptions = (filterId: number) => {
    if (isAnyOptionChecked(options)) {
      setState((prevState) => ({ ...prevState, error: false }));
      setParentOptions(filterId, options);
      selectQuestion();
    } else {
      setState((prevState) => ({ ...prevState, error: true }));
      setParentOptions(
        filterId,
        options.map((option) => ({ ...option, checked: false }))
      );
      setTimeout(() => {
        setState((prevState) => ({ ...prevState, error: false }));
      }, 2000);
    }
  };

  const skipQuestion = () => {
    setState((prevState) => ({ ...prevState, error: false }));
    switch (type) {
      case 0:
        setParentOptions(filterId, options);
        break;
      case 1:
        setParentOptions(
          filterId,
          options.map((option) => ({ ...option, checked: true }))
        );
        break;
      case 2:
        setParentOptions(
          filterId,
          options.map((option) => ({ ...option, checked: true }))
        );
        break;

      default:
        break;
    }
    selectQuestion();
  };

  const goBackQuestion = () => {
    selectQuestion(activeQuestionIndex - 1);
  };

  return (
    <div className="guide-question">
      <Heading variant="h1">{t(title)}</Heading>
      {error === true ? (
        <Heading variant="h2">
          {t("Guide.Question.GuideQuestion.error.missing")}
        </Heading>
      ) : null}
      <div className="guide-question-content">
        <GuideOptions
          type={question.type}
          options={options}
          confirmOptions={confirmOptions}
          skipQuestion={skipQuestion}
          questionState={EGuideQuestionState.question}
          filterId={filterId}
          setOptions={setParentOptions}
          goBackQuestion={activeQuestionIndex > 0 ? goBackQuestion : undefined}
        />
      </div>
    </div>
  );
};

export default GuideQuestion;
