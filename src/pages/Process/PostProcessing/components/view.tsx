import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@component-library/Button";
import { useTranslation } from "react-i18next";
import { IPostProcessing } from "@/interface/Interface";
import { EPostProcessingOptionType } from "@/interface/enums";

interface Props<Item> {
  item: Item;
  checkItem(item: Item): void;
  closeItemView(): void;
}

const ItemView = <Item extends IPostProcessing>(props: Props<Item>) => {
  const { closeItemView, item, checkItem } = props;
  const { t } = useTranslation();

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
        return <h3>No Correct Input found for:{type}</h3>;
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
      <h2 className="">{item.title}</h2>
      <img className="w-full xl:max-w-xl" src={item.URI} alt="Model" />
      <h3>{item.type}</h3>
      {item.value !== "" ? (
        <div className="flex flex-row items-center justify-center">
          {item.value}
        </div>
      ) : null}
      <div className="flex flex-row items-center justify-center">
        {renderInput(item.type)}
      </div>
      <Button
        onClick={handleOnClickButton}
        style={item.checked ? "secondary" : "primary"}
      >
        {item.checked
          ? t("Process.PostProcessing.ItemCard.button.deselect")
          : t("Process.PostProcessing.ItemCard.button.select")}
      </Button>
    </div>
  );
};

export default ItemView;
