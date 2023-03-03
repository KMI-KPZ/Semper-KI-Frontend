import React, { useEffect, useState } from "react";
import useService from "../../hooks/useService";
import {
  EServiceQuestionType,
  IServiceChapter,
  IServiceQuestion,
} from "./Interface";
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
  const { activeChapter, chapters, questions } = state;

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
        <ServiceQuestion {...question} key={index} />
      ))}
    </div>
  );
};

export default ServiceView;
