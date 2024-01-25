import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import {
  EPostProcessingOptionType,
  PostProcessingProps,
} from "../PostProcessing";
import { Heading } from "@component-library/index";
import { Button } from "@component-library/index";
import useProcess from "@/pages/Projects/hooks/useProcess";
import { isProcessAtServiceStatus } from "@/pages/Projects/hooks/useGeneralProcess";

interface Props<Item> {
  item: Item;
  checkItem(item: Item): void;
  closeItemView(): void;
}

const ProcessPostProcessingItem = <Item extends PostProcessingProps>(
  props: Props<Item>
) => {
  const { closeItemView, item, checkItem } = props;
  const { t } = useTranslation();
  const { process } = useProcess();

  const renderNumberInput = () => (
    <input className="border" type="number" min="0" />
  );
  const renderTextInput = () => <input className="border" type="text" />;
  const renderSelectInput = () => (
    <select className="border">
      {item.valueList.map((title, index) => (
        <option key={index} value={title}>
          {title}
        </option>
      ))}
    </select>
  );
  const renderInput = (type: EPostProcessingOptionType) => {
    switch (type.toString()) {
      case "number":
        return renderNumberInput();
      case "text":
        return renderTextInput();
      case "selection":
        return renderSelectInput();
      default:
        return (
          <Heading variant="h3">No Correct Input found for:{type}</Heading>
        );
    }
  };

  const handleOnClickButton = () => {
    checkItem(item);
    closeItemView();
  };

  return (
    <div className="overflow-x-hidden+ flex h-screen w-screen flex-col items-center justify-start gap-5 bg-white xl:max-h-[90vh] xl:w-fit">
      <div className="flex w-full flex-row-reverse xl:hidden">
        <div
          className="p-3 hover:cursor-pointer hover:bg-gray-300"
          onClick={closeItemView}
        >
          <CloseIcon fontSize="large" />
        </div>
      </div>
      <Heading variant="h2">{item.title}</Heading>
      <img className="w-full xl:max-w-xl" src={item.URI} alt="Model" />
      <Heading variant="h3">{item.type}</Heading>
      {item.value !== "" ? (
        <div className="flex flex-row items-center justify-center">
          {item.value}
        </div>
      ) : null}
      <div className="flex flex-row items-center justify-center">
        {renderInput(item.type)}
      </div>
      {isProcessAtServiceStatus(process) ? (
        <Button
          onClick={handleOnClickButton}
          variant={item.checked ? "secondary" : "primary"}
          title={
            item.checked
              ? t(
                  "Service.Manufacturing.PostProcessing.components.Item.button.deselect"
                )
              : t(
                  "Service.Manufacturing.PostProcessing.components.Item.button.select"
                )
          }
        />
      ) : null}
    </div>
  );
};

export default ProcessPostProcessingItem;
