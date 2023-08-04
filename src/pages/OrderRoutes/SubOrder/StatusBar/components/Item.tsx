import usePermissionGate from "@/components/PermissionGate/hooks/usePermissionGate";
import { UserType } from "@/hooks/useUser/types";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";
import { StatusData } from "../StatusBar";
import { OrderState } from "@/pages/OrderRoutes/Order/hooks/useOrder";

type StatusItemType = {
  item: StatusData;
  currentState: OrderState;
  userType: UserType;
  updateStatus(status: OrderState): void;
};

const StatusItem: React.FC<StatusItemType> = (props) => {
  const {
    item: { icon, itemOrderState, text },
    currentState,
    updateStatus: setStatus,
    userType,
  } = props;
  const { t } = useTranslation();
  const { hasPermission } = usePermissionGate();

  const handleOnClickStatus = () => {
    if (userType === UserType.manufacturer) {
      setStatus(itemOrderState);
    }
  };

  const getClassName = (): string => {
    let classname: string[] = [];
    if (currentState === itemOrderState) {
      classname.push(" bg-orange text-white");
    } else if (currentState + 1 === itemOrderState) {
      classname.push(" bg-slate-100");
    } else if (currentState < itemOrderState) {
      classname.push(" bg-slate-200 text-slate-700");
    } else if (currentState > itemOrderState) {
      classname.push(" bg-orange-200");
    }
    if (
      userType === UserType.manufacturer &&
      currentState + 1 == itemOrderState
    ) {
      classname.push(" hover:cursor-pointer hover:bg-orange-300");
    }
    return classname.join(" ");
  };

  return (
    <a
      onClick={hasPermission("OrderStatus") ? handleOnClickStatus : () => {}}
      className={`flex w-full flex-col items-center justify-center rounded-xl p-3 md:w-fit ${getClassName()}`}
    >
      {icon}
      <span className="text-center">{t(text)}</span>
    </a>
  );
};

export default StatusItem;
