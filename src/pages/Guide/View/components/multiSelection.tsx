import { EGuideQuestionState, IGuideOption } from "../../Guide";
import GuideButtons from "./buttons";
import { IGuideOptionProps } from "./options";

interface Props extends IGuideOptionProps {}

const GuideMultiSelection: React.FC<Props> = (props) => {
  const {
    filterId,
    options,
    confirmOptions,
    skipQuestion,
    questionState,
    setOptions,
    goBackQuestion,
  } = props;

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    toggelOption(index);
  };

  const handleOnChangeCkeckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    toggelOption(index);
  };

  const toggelOption = (index: number) => {
    if (setOptions !== undefined)
      setOptions(filterId, [
        ...options.filter(
          (option: IGuideOption, optionIndex: number) => optionIndex < index
        ),
        {
          ...options.filter(
            (FOption: IGuideOption, FOptionIndex: number) =>
              FOptionIndex === index
          )[0],
          checked: !options.filter(
            (FOption: IGuideOption, FOptionIndex: number) =>
              FOptionIndex === index
          )[0].checked,
        },
        ...options.filter(
          (option: IGuideOption, optionIndex: number) => optionIndex > index
        ),
      ]);
  };

  const handleOnClickNext = () => {
    if (confirmOptions !== undefined) confirmOptions(filterId);
  };

  const handleOnClickSkip = () => {
    if (skipQuestion !== undefined) skipQuestion();
  };

  return (
    <div
      className={`guide-question-cards ${EGuideQuestionState[questionState]}`}
    >
      {options.map((option: IGuideOption, index: number) => (
        <div
          key={index}
          className={`guide-question-card ${EGuideQuestionState[questionState]}`}
          onClick={(e) => handleOnClickCard(e, index)}
        >
          <input
            type="checkbox"
            checked={option.checked}
            onChange={(e) => handleOnChangeCkeckbox(e, index)}
            onClick={(e) => e.stopPropagation()}
          />
          {option.title}
        </div>
      ))}
      {questionState === EGuideQuestionState.question ? (
        <GuideButtons
          handleOnClickNext={handleOnClickNext}
          handleOnClickSkip={handleOnClickSkip}
          handleOnClickBack={goBackQuestion}
        />
      ) : null}
    </div>
  );
};

export default GuideMultiSelection;
