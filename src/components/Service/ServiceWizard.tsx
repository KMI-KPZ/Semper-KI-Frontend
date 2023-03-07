import React from "react";
import { getIconByName } from "../../config/Icons";
import { IServiceChapter } from "./Interface";

interface Props {
  activeChapter: number;
  chapters: IServiceChapter[];
  setActiveChapter(index: number): void;
}

const ServiceWizard: React.FC<Props> = (props) => {
  const { activeChapter, chapters, setActiveChapter } = props;

  const handleOnClickItem = (index: number) => {
    setActiveChapter(index);
  };

  return (
    <div className="service-wizard">
      {chapters.map((chapter, index) => (
        <React.Fragment key={index}>
          <div
            className={`service-wizard-item ${
              activeChapter === index ? "active" : ""
            }`}
            key={index}
            onClick={() => handleOnClickItem(index)}
          >
            <img src={getIconByName(chapter.icon)} alt={chapter.icon} />
            {chapter.title}
          </div>
          {index !== chapters.length - 1 ? "->" : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ServiceWizard;
