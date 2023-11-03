import { useTranslation } from "react-i18next";
import { StatusData } from "../StatusBar";
import { Text } from "@component-library/Typography";
import { ProcessStatus } from "@/pages/Projects/hooks/useProcess";

type StatusItemType = {
  item: StatusData;
  state: ProcessStatus;
};

const StatusItem: React.FC<StatusItemType> = (props) => {
  const {
    item: { icon, startStatus, endStatus, text },
    state,
  } = props;
  const { t } = useTranslation();

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
  );
};

export default StatusItem;
