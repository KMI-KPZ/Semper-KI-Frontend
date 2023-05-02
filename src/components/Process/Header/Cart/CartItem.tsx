import React, { ReactNode, useContext, useState } from "react";
import { IconDelete } from "../../../../constants/Icons";
import { IProcessItem } from "../../../../interface/Interface";
import Badge from "../../../General/Badge";
import IconBadge from "../../../General/IconBagde";
import { ProcessContext } from "../../ProcessView";
import StatusIcon from "../StatusIcon/StatusIcon";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  process?: IProcessItem;
  index?: number;
  active: boolean;
  title: string;
  icon: ReactNode;
  onClickCard(id?: number): void;
  isItem: boolean;
}

interface State {
  edit: boolean;
  titleText: string;
}

const CartItem: React.FC<Props> = (props) => {
  const { index, active, title, icon, onClickCard, isItem, process } = props;
  const { deleteProcessItem: deleteProcess } = useContext(ProcessContext);
  const [state, setState] = useState<State>({ edit: false, titleText: title });
  const { edit, titleText } = state;

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onClickCard(index === undefined ? undefined : index);
  };

  const handleOnClickDeleteIcon = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (index !== undefined) deleteProcess(index);
  };

  const handleOnClickEditIcon = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prevState) => ({ ...prevState, edit: !prevState.edit }));
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prevState) => ({
      ...prevState,
      titleText: e.target.value,
    }));
  };

  return (
    <div
      className={`flex flex-row justify-start items-center gap-3 bg-white h-12 px-3 py-2 hover:bg-slate-200 hover:cursor-pointer duration-300
      ${active === true ? "shadow-border shadow-gray-500" : ""}
      `}
      onClick={handleOnClickCard}
    >
      {isItem ? (
        <IconBadge position="small" icon={<StatusIcon process={process} />}>
          {icon}
        </IconBadge>
      ) : (
        icon
      )}
      {edit === true ? (
        <input
          type="text"
          value={titleText}
          className="pl-2"
          onChange={handleOnChangeInput}
        />
      ) : (
        <h3 className="whitespace-nowrap">{titleText}</h3>
      )}
      {isItem === true ? (
        <div className="flex flex-col gap-1 items-center justify-center">
          <a
            onClick={handleOnClickEditIcon}
            href="/editItem"
            className="flex justify-center items-center hover:text-white duration-300"
          >
            {edit ? (
              <CheckIcon fontSize="small" />
            ) : (
              <EditIcon fontSize="small" />
            )}
          </a>
          <a
            onClick={handleOnClickDeleteIcon}
            href="/deleteItem"
            className="flex justify-center items-center hover:text-white duration-300"
          >
            <DeleteForeverOutlinedIcon fontSize="small" />
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default CartItem;
