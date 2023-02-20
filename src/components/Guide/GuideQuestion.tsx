import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IGuideOption, IGuideQuestion } from "./Interface";

interface Props {
  question: IGuideQuestion;
  setOptions(filterId: number, options: IGuideOption[]): void;
  selectQuestion(): void;
}

interface State {
  options: IGuideOption[];
  error: boolean;
}

const GuideQuestion: React.FC<Props> = (props) => {
  const { question, selectQuestion, setOptions: setParentOptions } = props;
  const { t } = useTranslation();
  const [state, setState] = useState<State>({
    options: question.options,
    error: false,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, options: question.options }));
  }, [question]);

  const isOptionChecked = (): boolean => {
    let checked: boolean = false;
    state.options.forEach((option: IGuideOption) => {
      if (option.checked === true) {
        checked = true;
      }
    });
    return checked;
  };

  const confirmOptions = () => {
    if (isOptionChecked()) {
      setState((prevState) => ({ ...prevState, error: false }));
      setParentOptions(question.filterId, state.options);
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

  const selectOption = (index: number) => {
    setState((prevState) => ({
      ...prevState,
      options: [
        ...prevState.options.filter(
          (option: IGuideOption, optionIndex: number) => optionIndex < index
        ),
        {
          ...prevState.options.filter(
            (option: IGuideOption, optionIndex: number) => optionIndex === index
          )[0],
          checked: !prevState.options.filter(
            (option: IGuideOption, optionIndex: number) => optionIndex === index
          )[0].checked,
        },
        ...prevState.options.filter(
          (option: IGuideOption, optionIndex: number) => optionIndex > index
        ),
      ],
    }));
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
      {state.error === true ? (
        <h2 className="guide-question-error">
          Bitte mindestens eine Option auswählen
        </h2>
      ) : null}
      <div className="guide-question-cards">
        {state.options.map((option: IGuideOption, index: number) => (
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
      <div className="guide-question-buttons">
        <Button
          variant="contained"
          sx={{ background: "grey", "&:hover": { background: "grey" } }}
          onClick={(e) => skipQuestion()}
        >
          Überspringen
        </Button>
        <Button variant="contained" onClick={(e) => confirmOptions()}>
          Weiter
        </Button>
      </div>
    </div>
  );
};

export default GuideQuestion;
