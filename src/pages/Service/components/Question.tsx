import { Heading } from "@component-library/Typography";
import React from "react";
import { EServiceQuestionType, IServiceQuestion } from "../Service";

interface Props extends IServiceQuestion {
  index: number;
  setQuestionAnswer(value: string | number, index: number): void;
}

const ServiceQuestion: React.FC<Props> = (props) => {
  const { title, answer, options, type, index, setQuestionAnswer } = props;

  const handleOnChangeInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuestionAnswer(e.currentTarget.value, index);
  };

  const renderInput = (type: EServiceQuestionType) => {
    switch (type) {
      case 0:
        return (
          <input
            type="text"
            value={answer?.toString()}
            onChange={handleOnChangeInput}
          />
        );
      case 1:
        return (
          <textarea value={answer?.toString()} onChange={handleOnChangeInput} />
        );

      case 2:
        return options !== undefined ? (
          <select
            value={answer !== undefined ? answer : "default"}
            onChange={handleOnChangeInput}
          >
            <option value="default" disabled>
              ---
            </option>
            {options.map((value, index) => (
              <option value={value} key={index}>
                {value}
              </option>
            ))}
          </select>
        ) : null;
      case 3:
        return (
          <input
            type="number"
            value={typeof answer === "number" ? answer : undefined}
            onChange={handleOnChangeInput}
          />
        );
      default:
        return (
          <input
            type="text"
            value={answer?.toString()}
            onChange={handleOnChangeInput}
          />
        );
    }
  };

  return (
    <div className="service-question">
      <Heading variant="h2">{title}</Heading>
      <div>{EServiceQuestionType[type]}</div>
      {renderInput(type)}
    </div>
  );
};

export default ServiceQuestion;
