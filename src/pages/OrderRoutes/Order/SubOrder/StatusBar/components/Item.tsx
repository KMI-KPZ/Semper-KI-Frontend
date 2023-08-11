import usePermissionGate from "@/components/PermissionGate/hooks/usePermissionGate";
import { UserType } from "@/hooks/useUser/types";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";
import { StatusData } from "../StatusBar";
import { OrderState } from "@/pages/OrderRoutes/hooks/useOrder";

type StatusItemType = {
  item: StatusData;
  state: OrderState;
};

const StatusItem: React.FC<StatusItemType> = (props) => {
  const {
    item: { icon, itemOrderState, text },
    state,
  } = props;
  const { t } = useTranslation();

  const getClassName = (): string => {
    let classname: string[] = [];
    if (state === itemOrderState) {
      classname.push(" bg-orange text-white");
    } else if (state < itemOrderState) {
      classname.push(" bg-slate-100 ");
    } else if (state > itemOrderState) {
      classname.push(" bg-orange-200");
    }
    return classname.join(" ");
  };

  return (
    <div
      className={`flex w-full flex-col items-center justify-center rounded-xl p-3 md:w-fit ${getClassName()}`}
    >
      {icon}
      <span className="text-center">{t(text)}</span>
    </div>
  );
};

export default StatusItem;
