import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IPostProcessing } from "../../../interface/Interface";
import { EPostProcessingOptionType } from "../../../interface/enums";
import ItemCard from "./ItemCard";

interface Props<Item> {
  item: Item;
  checkItem(item: Item): void;
  closeItemView(): void;
}

const ItemView = <Item extends IPostProcessing>(props: Props<Item>) => {
  const { closeItemView, item, checkItem } = props;

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

  return (
    <div className="flex flex-col gap-5 items-center justify-start bg-white h-screen w-screen xl:w-fit xl:max-h-[90vh] overflow-x-hidden+">
      <div className="xl:hidden flex flex-row-reverse w-full">
        <div
          className="hover:bg-gray-300 hover:cursor-pointer p-3"
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
      <div className="pb-2" onClick={(e) => checkItem(item)}>
        <div className=" text-white flex flex-row justify-center items-center w-full p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer">
          Auswählen
        </div>
      </div>
    </div>
  );
};

export default ItemView;
