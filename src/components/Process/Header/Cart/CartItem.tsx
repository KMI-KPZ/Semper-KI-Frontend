import React, { useContext } from "react";
import { IconDelete } from "../../../../constants/Icons";
import { IProcessItem } from "../../../../interface/Interface";
import { ProcessContext } from "../../ProcessView";
import StatusIcon from "../StatusIcon/StatusIcon";

interface Props {
  process?: IProcessItem;
  index?: number;
  active: boolean;
  title: string;
  icon: string;
  onClickCard(id?: number): void;
  isItem: boolean;
}

const CartItem: React.FC<Props> = (props) => {
  const { index, active, title, icon, onClickCard, isItem, process } = props;
  const { deleteProcessItem: deleteProcess } = useContext(ProcessContext);

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
      className={`flex flex-row justify-start items-center gap-6 bg-white h-12 px-3 py-2 hover:bg-gray-300 hover:cursor-pointer
      `}
      // ${active === true ? "pb-5 h-16" : ""}
      onClick={handleOnClickCard}
    >
      {isItem === true ? (
        <div className="flex flex-col gap-2 items-center justify-center">
          <input
            checked={active}
            type="checkbox"
            className="h-4"
            onChange={handleOnChangeCheckbox}
          />
          <img
            alt="button delete item"
            src={IconDelete}
            className="h-4"
            onClick={handleOnClickDeleteIcon}
          />
        </div>
      ) : null}
      <img src={icon} alt="icon" className="h-8" />
      <h3 className="whitespace-nowrap">{title}</h3>
      {/* {process === undefined ? null : <StatusIcon process={process} />} */}
    </div>
  );
};

export default CartItem;
