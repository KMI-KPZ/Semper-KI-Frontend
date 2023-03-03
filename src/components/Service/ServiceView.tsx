import React, { useEffect, useState } from "react";
import useService from "../../hooks/useService";
import { IServiceChapter, IServiceQuestion } from "./Interface";
import ServiceQuestion from "./ServiceQuestion/ServiceQuestion";

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
  const { questions } = state;

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
      <h1 className="service-view-headline">Service Anbieten : {title}</h1>
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
