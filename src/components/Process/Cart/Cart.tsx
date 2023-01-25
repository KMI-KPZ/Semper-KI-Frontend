import React from "react";
import CartItem from "./CartItem";
import "./Cart.scss";
import { IconUpload, IconPlus, IconModel } from "../../../config/Icons";
import { useNavigate } from "react-router-dom";
import { IProcess } from "../../../interface/Interface";

interface Props {
  processList: IProcess[];
}

const Cart: React.FC<Props> = () => {
  const navigate = useNavigate();

  const addNewItem = () => {
    console.log("Add new Item");
  };

  const navigateToUpload = () => {
    navigate("/process/upload");
  };

  const selectItem = (index: number) => {};

  return (
    <div className="process-cart">
      <CartItem
        active={false}
        icon={IconUpload}
        title="Upload"
        onClickCard={navigateToUpload}
      />
      <CartItem
        active={true}
        icon={IconModel}
        title="Modell 1"
        onClickCard={selectItem}
      />
      <CartItem
        active={false}
        icon={IconPlus}
        title="Neu"
        onClickCard={addNewItem}
      />
    </div>
  );
};

export default Cart;
