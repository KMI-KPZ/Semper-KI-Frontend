import React from "react";
import { IProcess } from "../../../interface/Interface";

interface Props {
  process: IProcess;
}

const ShoppingCartItem = ({ process }: Props) => {
  return (
    <ul className="shopping-cart-item">
      <li className="item-column">
        <img
          className="item-img"
          src={require("../../../assets/images/model_placeholder.png")}
          alt="Model"
        />
      </li>
      <li className="item-column">
        <h2 className="item-headline">
          {process.model ? process.model.name : "Model-Name"}
        </h2>
        <span>{process.model ? process.model.file.name : "---"}</span>
        <span>---</span>
        <span>---</span>
      </li>
      <li className="item-column">
        <h2 className="item-headline">
          {process.material ? process.material.name : "Material-Name"}
        </h2>
        <span>---</span>
        <span>---</span>
        <span>---</span>
      </li>
      <li className="item-column">
        <h2 className="item-headline">
          {process.manufacturer ? process.manufacturer.name : "Hersteller-Name"}
        </h2>
        <span>---</span>
        <span>---</span>
        <span>---</span>
      </li>
      <li className="item-column">
        <h2 className="item-headline">Nachbearbeitung</h2>
        <span>---</span>
        <span>---</span>
        <span>---</span>
      </li>
      <li className="item-column">
        <h2 className="item-headline">Zusatz</h2>
        <span>---</span>
        <span>---</span>
        <span>---</span>
      </li>
      <li className="item-column">
        <h2 className="item-headline">Info</h2>
        <span>---</span>
        <span>---</span>
        <span>---</span>
      </li>
    </ul>
  );
};

export default ShoppingCartItem;
