import React from "react";
import { IProcessItem } from "../../interface/Interface";

interface Props {
  process: IProcessItem;
}

const ShoppingCartItem: React.FC<Props> = (props) => {
  const { process } = props;
  return (
    <ul className="flex flex-col bg-white md:gap-4 md:flex-row w-full md:flex-wrap">
      <li className="flex flex-col w-full md:max-w-[250px]">
        <img
          className="h-30 md:h-full max-h-[250px] w-full object-cover"
          src={require("../../assets/images/model_placeholder.png")}
          alt="Model"
        />
      </li>
      <li className="flex flex-col w-full md:w-fit p-2">
        <h2 className="">
          {process.model ? process.model.title : "Model-Name"}
        </h2>
        {/* <span>{process.model ? process.model.file.name : "---"}</span> */}
        <span>---</span>
        <span>---</span>
      </li>
      <li className="flex flex-col w-full md:w-fit p-2">
        <h2 className="item-headline">
          {process.material ? process.material.title : "Material-Name"}
        </h2>
        <span>---</span>
        <span>---</span>
        <span>---</span>
      </li>
      <li className="flex flex-col w-full md:w-fit p-2">
        <h2 className="item-headline">
          {process.manufacturer ? process.manufacturer.name : "Hersteller-Name"}
        </h2>
        <span>---</span>
        <span>---</span>
        <span>---</span>
      </li>
      <li className="flex flex-col w-full md:w-fit p-2">
        <h2 className="item-headline">Nachbearbeitung</h2>
        <span>---</span>
        <span>---</span>
        <span>---</span>
      </li>
      <li className="flex flex-col w-full md:w-fit p-2">
        <h2 className="item-headline">Zusatz</h2>
        <span>---</span>
        <span>---</span>
        <span>---</span>
      </li>
      <li className="flex flex-col w-full md:w-fit p-2">
        <h2 className="item-headline">Info</h2>
        <span>---</span>
        <span>---</span>
        <span>---</span>
      </li>
    </ul>
  );
};

export default ShoppingCartItem;
