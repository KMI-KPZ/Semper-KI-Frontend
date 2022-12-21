import React from "react";

import "Guide.scss";
import _questions from "./GuideQuestions.json";
import { IGuideQuestion } from "./Interface";
import { useParams } from "react-router-dom";

const questions = _questions as IGuideQuestion[];

const Guide = () => {
  const path = useParams();

  return (
    <div className="guide">
      <h1></h1>
    </div>
  );
};

export default Guide;
