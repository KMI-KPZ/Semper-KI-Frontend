import React from "react";

interface Props {
  active: boolean;
  title: string;
  icon: string;
  onClickCard(id?: number): void;
}

const CartItem: React.FC<Props> = ({ active, title, icon, onClickCard }) => {
  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    onClickCard();
  };

  return (
    <div
      className={`process-cart-item ${active ? "active" : ""}`}
      onClick={handleOnClickCard}
    >
      <img src={icon} />
      {title}
    </div>
  );
};

export default CartItem;
