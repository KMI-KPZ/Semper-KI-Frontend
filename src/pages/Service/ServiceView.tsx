import React, { useEffect, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import useService from "../../hooks/useService";
import { IServiceChapter, IServiceQuestion } from "./Interface";
import ServiceQuestion from "./ServiceQuestion";
import ServiceWizard from "./ServiceWizard";

interface Props {
  title: string;
}

interface State {
  activeChapter: number;
  chapters: IServiceChapter[];
  questions: IServiceQuestion[];
}

const ServiceView: React.FC<Props> = (props) => {
  const { title } = props;
  const { serviceChapters, loadService } = useService();
  const [state, setState] = useState<State>({
    activeChapter: 0,
    chapters: [],
    questions: [],
  });
  const { activeChapter, chapters, questions } = state;
  const { t } = useTranslation();

  const setQuestionAnswer = (value: string | number, _index: number) => {
    // console.log("ServiceView | setQuestionAnswer ", value, _index);
    setState((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions.filter((question, index) => index < _index),
        {
          ...prevState.questions.filter(
            (question, index) => index === _index
          )[0],
          answer: value,
        },
        ...prevState.questions.filter((question, index) => index > _index),
      ],
    }));
  };

  const setActiveChapter = (index: number) => {
    console.log("ServiceView | setActiveChapter ", state);

    setState((prevState) => ({
      ...prevState,
      activeChapter: index,
      questions: prevState.chapters[index].questions,
      chapters: [
        ...prevState.chapters.filter(
          (chapter, _index) => _index < prevState.activeChapter
        ),
        {
          ...prevState.chapters.filter(
            (chapter, _index) => _index === prevState.activeChapter
          )[0],
          questions: prevState.questions,
        },
        ...prevState.chapters.filter(
          (chapter, _index) => _index > prevState.activeChapter
        ),
      ],
    }));
  };

  useEffect(() => {
    loadService(title);
  }, [title]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      chapters: serviceChapters,
      questions: serviceChapters.length > 0 ? serviceChapters[0].questions : [],
    }));
  }, [serviceChapters]);

  return (
    <div className="service-view">
      <h1 className="service-view-headline">
        {t("Service.ServiceView.header")} : {title}
      </h1>
      <ServiceWizard
        chapters={chapters}
        activeChapter={activeChapter}
        setActiveChapter={setActiveChapter}
      />
      {questions.map((question, index) => (
        <ServiceQuestion
          {...question}
          key={index}
          index={index}
          setQuestionAnswer={setQuestionAnswer}
        />
      ))}
    </div>
  );
};

export default ServiceView;
