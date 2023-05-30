import { IGuide, IGuideQuestion } from "@/pages/Guide";
import { useState } from "react";
import _GuideQuestions from "@/hooks/Data/GuideQuestions.json";
const GuideQuestions = _GuideQuestions as IGuide[];

interface ReturnProps {
  guideQuestions: IGuideQuestion[];
  loadGuideQuestions(title: string): void;
}

const useGuide = (): ReturnProps => {
  const [guideQuestions, setGuideQuestions] = useState<IGuideQuestion[]>([]);

  const loadGuideQuestions = (title: string) => {
    // console.log("useGuide | loadGuideQuestions", title);

    setGuideQuestions(
      GuideQuestions.filter((guide: IGuide) => guide.title === title)[0]
        .questions
    );
  };

  return { guideQuestions, loadGuideQuestions };
};

export default useGuide;
