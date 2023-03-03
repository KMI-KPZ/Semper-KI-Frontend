import React from "react";
import { EServiceQuestionType, IServiceQuestion } from "../Interface";

interface Props extends IServiceQuestion {}

const ServiceQuestion: React.FC<Props> = (props) => {
  const { title, answer, options, type } = props;

  const handleOnChangeInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {};

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
            value={answer !== undefined ? options[0] : "default"}
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
      <h2>{title}</h2>
      <div>{EServiceQuestionType[type]}</div>
      {renderInput(type)}
    </div>
  );
};

export default ServiceQuestion;
