import React, { useContext } from "react";
import { IconDelete } from "../../../config/Icons";
import { IProcess } from "../../../interface/Interface";
import { ProcessContext } from "../ProcessView";

interface Props {
  index?: number;
  active: boolean;
  title: string;
  icon: string;
  onClickCard(id?: number): void;
  isItem: boolean;
}

const CartItem: React.FC<Props> = ({
  index,
  active,
  title,
  icon,
  onClickCard,
  isItem,
}) => {
  const { deleteProcess } = useContext(ProcessContext);

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onClickCard(index === undefined ? undefined : index);
  };

  const handleOnChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onClickCard(index === undefined ? undefined : index);
  };
  const handleOnClickDeleteIcon = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (index !== undefined) deleteProcess(index);
  };

  return (
    <div
      className={`process-cart-item ${active ? "active" : ""}`}
      onClick={handleOnClickCard}
    >
      {isItem === true ? (
        <div className="process-cart-icons">
          <input
            checked={active}
            type="checkbox"
            className="process-cart-icon"
            onChange={handleOnChangeCheckbox}
          />
          <img
            src={IconDelete}
            className="process-cart-icon"
            onClick={handleOnClickDeleteIcon}
          />
        </div>
      ) : null}
      <img src={icon} />
      {title}
    </div>
  );
};

export default CartItem;
