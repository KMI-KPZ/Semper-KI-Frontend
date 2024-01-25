import { Heading } from "@component-library/index";
import { PostProcessingProps } from "../PostProcessing";
import { isProcessAtServiceStatus } from "@/pages/Projects/hooks/useGeneralProcess";
import useProcess from "@/pages/Projects/hooks/useProcess";

interface Props<Item> {
  item: Item;
  grid: boolean;
  checkItem(item: Item): void;
  openItemView(item: Item): void;
}

const ProcessPostProcessingCard = <Item extends PostProcessingProps>(
  props: Props<Item>
) => {
  const { grid, item, openItemView, checkItem } = props;
  const { process } = useProcess();

  const handleOnClickSelect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    checkItem(item);
  };

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    openItemView(item);
  };

  const handleOnClickCheckbox = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.stopPropagation();
    checkItem(item);
  };
  const handleOnChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div
      className={`flex items-center justify-start overflow-hidden bg-white hover:cursor-pointer hover:bg-gray-300 ${
        grid === true
          ? "basis-[48%] flex-col sm:basis-[32%] md:basis-[23.5%]"
          : "w-full flex-row"
      }`}
      onClick={handleOnClickCard}
    >
      <img
        className={`object-cover ${
          grid === true
            ? "h-44 min-w-full max-w-[200%]"
            : "max-h-44 min-h-full w-44 "
        }`}
        src={item.URI}
        alt="PostProcessing"
      />
      <div
        className={`flex h-full items-center justify-around gap-2 p-3  md:justify-between ${
          grid === true ? "flex-col " : "w-full flex-row gap-5"
        }`}
      >
        <Heading variant="h2">{item.title}</Heading>
        {isProcessAtServiceStatus(process) ? (
          <input
            type="checkbox"
            className="h-10 w-10 checked:accent-türkis"
            checked={item.checked}
            onClick={handleOnClickCheckbox}
            onChange={handleOnChangeCheckbox}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProcessPostProcessingCard;
