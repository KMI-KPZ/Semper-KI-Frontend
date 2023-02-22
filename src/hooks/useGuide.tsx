import React, { useState } from "react";
import { IGuide, IGuideQuestion } from "../components/Guide/Interface";
import _GuideQuestions from "./Data/GuideQuestions.json";
const GuideQuestions = _GuideQuestions as IGuide[];

interface ReturnProps {
  guideQuestions: IGuideQuestion[];
  loadGuideQuestions(title: string): void;
}

const useGuide = (): ReturnProps => {
  const [guideQuestions, setGuideQuestions] = useState<IGuideQuestion[]>([]);

  const loadGuideQuestions = (title: string) => {
    // console.log("useGuide | loadGuideQuestions");

    setGuideQuestions(
      GuideQuestions.filter((guide: IGuide) => guide.title === title)[0]
        .questions
    );
  };

  return { guideQuestions, loadGuideQuestions };
};

export default useGuide;
