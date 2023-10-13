import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { Heading } from "@component-library/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ServiceType } from "../../hooks/useService";
import { TFunction, useTranslation } from "react-i18next";
import useProcess, { ProcessProps } from "@/pages/Projects/hooks/useProcess";

interface Props {
  process: ProcessProps;
}

interface State {
  edit: boolean;
  titleText: string;
}

export const getTitleFromProcess = (
  process: ProcessProps,
  t: TFunction<"translation", undefined>
): string => {
  return process.details.title !== undefined
    ? process.details.title
    : process.service.type !== undefined
    ? t(`enum.ServiceType.${ServiceType[process.service.type]}`)
    : t("Service.Overview.components.Item.titleEmpty");
};

const ServiceOverviewItem: React.FC<Props> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const { projectID, processID } = useParams();
  const inputText: string = getTitleFromProcess(process, t);

  const [state, setState] = useState<State>({
    edit: false,
    titleText: "",
  });
  const { edit, titleText } = state;
  const navigate = useNavigate();
  const { deleteProcess, updateProcess } = useProcess();
  const active = processID === process.processID;

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/projects/${projectID}/${process.processID}`);
  };

  const handleOnClickDeleteIcon = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(t("Service.Overview.components.Item.confirm.cancel"))) {
      deleteProcess.mutate(process.processID);
    }
  };

  const handleOnClickEditCheckButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (state.edit)
      updateProcess.mutate({
        changes: { details: { title: state.titleText } },
      });
    setState((prevState) => {
      return {
        edit: !prevState.edit,
        titleText: prevState.edit ? prevState.titleText : inputText,
      };
    });
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
      className={`flex h-fit w-full flex-row items-center justify-between gap-3 bg-white px-3 py-2 duration-300 hover:cursor-pointer hover:bg-slate-200
      ${active === true ? "shadow-border shadow-gray-500" : ""}
      `}
      onClick={handleOnClickCard}
    >
      {edit === true ? (
        <input
          type="text"
          value={titleText}
          className="pl-2"
          onChange={handleOnChangeInput}
        />
      ) : (
        <Heading variant="h3">{inputText}</Heading>
      )}
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
    </div>
  );
};

export default ServiceOverviewItem;
