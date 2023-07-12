import { IGuide, IGuideQuestion } from "@/pages/Guide/Guide";
import { useState } from "react";
import _GuideQuestions from "@/hooks/Data/GuideQuestions.json";
import logger from "@/hooks/useLogger";
const GuideQuestions = _GuideQuestions as IGuide[];

interface ReturnProps {
  guideQuestions: IGuideQuestion[];
  loadGuideQuestions(title: string): void;
}

const useGuide = (): ReturnProps => {
  const [guideQuestions, setGuideQuestions] = useState<IGuideQuestion[]>([]);

  const loadGuideQuestions = (title: string) => {
    // logger("useGuide | loadGuideQuestions", title);

    setGuideQuestions(
      GuideQuestions.filter((guide: IGuide) => guide.title === title)[0]
        .questions
    );
  };

  return { guideQuestions, loadGuideQuestions };
};

export default useGuide;
