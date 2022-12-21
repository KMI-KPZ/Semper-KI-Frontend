import React from "react";

import "Guide.scss";
import _questions from "./GuideQuestions.json";
import { IGuideQuestion } from "./Interface";

const questions = _questions as IGuideQuestion[];

const Guide = () => {
  return (
    <div className="guide">
      <h1></h1>
    </div>
  );
};

export default Guide;
