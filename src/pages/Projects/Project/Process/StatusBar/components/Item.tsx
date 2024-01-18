import { useTranslation } from "react-i18next";
import { StatusData } from "../StatusBar";
import { Text } from "@component-library/index";
import { ProcessStatus } from "@/pages/Projects/hooks/useProcess";
import { Badge } from "@component-library/Badge/Badge";
import useEvents from "@/hooks/useEvents/useEvents";

type StatusItemType = {
  item: StatusData;
  state: ProcessStatus;
  projectID: string;
  processID: string;
  statusCountAction: "still" | "move";
};

const StatusItem: React.FC<StatusItemType> = (props) => {
  const {
    item: { icon, startStatus, endStatus, text },
    state,
    processID,
    projectID,
    statusCountAction,
  } = props;
  const { t } = useTranslation();
  const { getProcessEventItemCount } = useEvents();

  const getClassName = (): string => {
    let classname: string[] = [];
    if (
      (state === startStatus && endStatus === undefined) ||
      (state >= startStatus && endStatus !== undefined && state <= endStatus)
    ) {
      classname.push(" bg-orange text-white");
    } else if (state < startStatus) {
      classname.push(" bg-slate-100 ");
    } else if (state > startStatus) {
      classname.push(" bg-orange-200");
    }
    return classname.join(" ");
  };

  return (
    <Badge
      showNumber={false}
      count={
        (state === startStatus && endStatus === undefined) ||
        (state >= startStatus && endStatus !== undefined && state <= endStatus)
          ? getProcessEventItemCount(projectID, processID, "processStatus")
          : 0
      }
      className={statusCountAction === "move" ? `animate-bounce` : ""}
    >
      <div className="relative z-10 flex flex-col items-center justify-center gap-5">
        <div
          className={`flex  items-center justify-center rounded-full p-5 ${getClassName()}`}
        >
          {icon}
        </div>
        <Text
          variant="body"
          className="absolute top-20 whitespace-nowrap bg-white text-center"
        >
          {t(`Projects.Project.Process.StatusBar.StatusBar.${text}`)}
        </Text>
      </div>
    </Badge>
  );
};

export default StatusItem;
