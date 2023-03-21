import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IPostProcessing } from "../../../interface/Interface";

interface Props<Item> {
  item: Item;
  selectItem: (item: Item) => void;
  closeItemView(): void;
}

const ItemView = <Item extends IPostProcessing>(props: Props<Item>) => {
  const { closeItemView, item, selectItem } = props;

  return (
    <div className="flex flex-col gap-5 items-center justify-start bg-white h-screen w-screen xl:w-fit xl:max-h-[90vh] overflow-x-hidden overflow-y-scroll">
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

      <div className="pb-2" onClick={(e) => selectItem(item)}>
        <div className=" text-white flex flex-row justify-center items-center w-full p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer">
          Auswählen
        </div>
      </div>
    </div>
  );
};

export default ItemView;
