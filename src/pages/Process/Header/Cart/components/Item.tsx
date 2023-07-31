import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { IconBadge } from "@component-library/Badge";
import { ReactNode, useContext, useEffect, useState } from "react";
import ProcessHeaderStatusIcon from "../../components/StatusIcon";
import { Heading } from "@component-library/Typography";
import { ProcessContext } from "@/pages/Process/Process";
import { IProcessItem } from "@/pages/Process/types";

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

const ProcessHeaderCartItem: React.FC<Props> = (props) => {
  const { index, active, title, icon, onClickCard, isItem, process } = props;
  const { deleteProcessItem, setProcessItemTitle } = useContext(ProcessContext);
  const [state, setState] = useState<State>({ edit: false, titleText: title });
  const { edit, titleText } = state;

  useEffect(() => {
    setState((prevState) => ({ ...prevState, titleText: title }));
  }, [title]);

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
    if (index !== undefined) deleteProcessItem(index);
  };

  const handleOnClickEditCheckButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prevState) => ({ ...prevState, edit: !prevState.edit }));
    if (index !== undefined) setProcessItemTitle(titleText, index);
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
      className={`flex h-12 flex-row items-center justify-between gap-3 bg-white px-3 py-2 duration-300 hover:cursor-pointer hover:bg-slate-200
      ${active === true ? "shadow-border shadow-gray-500" : ""}
      `}
      onClick={handleOnClickCard}
    >
      {isItem ? (
        <IconBadge
          position="small"
          icon={<ProcessHeaderStatusIcon process={process} />}
        >
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
        <Heading variant="h3">{titleText}</Heading>
      )}
      {isItem === true ? (
        <div className="flex flex-col items-center justify-center gap-1">
          <a
            onClick={handleOnClickEditCheckButton}
            href="/editItem"
            className="flex items-center justify-center duration-300 hover:text-white"
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
            className="flex items-center justify-center duration-300 hover:text-white"
          >
            <DeleteForeverOutlinedIcon fontSize="small" />
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default ProcessHeaderCartItem;
