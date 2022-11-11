import AddIcon from "@mui/icons-material/Add";
import "./ShoppingCart.scss";
import React from "react";

interface Props {
  addShoppingCartItem: () => void;
}

export const ShoppingCartAddButton = ({ addShoppingCartItem }: Props) => {
  const handelClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    e.preventDefault();
    addShoppingCartItem();
  };

  return (
    <a
      data-testid="addButton"
      href="/"
      className="AddButton"
      onClick={(e) => handelClick(e)}
    >
      <AddIcon sx={{ color: "black", fontSize: "2em" }} />
    </a>
  );
};
