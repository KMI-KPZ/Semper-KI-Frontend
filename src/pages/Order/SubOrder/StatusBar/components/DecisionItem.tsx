import usePermissionGate from "@/components/PermissionGate/hooks/usePermissionGate";
import { UserType } from "@/hooks/useUser/types";
import { useTranslation } from "react-i18next";
import { StatusData } from "../StatusBar";
import { Divider } from "@component-library/Divider";
import { OrderState } from "@/pages/Order/hooks/useOrder";

type StatusDoubleItemType = {
  item1: StatusData;
  item2: StatusData;
  currentState: OrderState;
  userType: UserType;
  updateStatus(status: OrderState): void;
};

const StatusBarDecisionItem: React.FC<StatusDoubleItemType> = (props) => {
  const {
    item1: itemDenied,
    item2: itemSucceed,
    currentState,
    updateStatus: setStatus,
    userType,
  } = props;
  const { t } = useTranslation();
  const { hasPermission } = usePermissionGate();

  const handleOnClickStatus = (orderState: OrderState) => {
    if (userType === UserType.manufacturer) {
      setStatus(orderState);
    }
  };

  const getOuterClassName = (): string => {
    let classname: string[] = [];
    if (currentState > OrderState.CONFIRMED) {
      classname.push("bg-orange-200");
    } else if (currentState < OrderState.REJECTED) {
      classname.push("bg-slate-100");
    }
    return classname.join(" ");
  };

  const getClassName = (orderState: OrderState): string => {
    let classname: string[] = [];
    if (currentState === orderState) {
      classname.push("bg-orange text-white");
    } else if (currentState > itemDenied.itemOrderState) {
      classname.push("bg-orange-200");
    } else if (currentState < itemSucceed.itemOrderState) {
      classname.push("bg-slate-100");
    }
    if (userType === UserType.manufacturer) {
      classname.push("hover:cursor-pointer hover:bg-orange-300");
    }
    return classname.join(" ");
  };

  return (
    <div
      className={`flex h-full w-full flex-row items-center justify-center overflow-clip rounded-xl md:h-fit md:w-fit md:flex-col ${getOuterClassName()}`}
    >
      {currentState < itemDenied.itemOrderState ||
      currentState === itemDenied.itemOrderState ? (
        <a
          onClick={
            hasPermission("OrderStatus")
              ? () => handleOnClickStatus(itemDenied.itemOrderState)
              : () => {}
          }
          className={`flex h-full w-full flex-col items-center justify-center p-3 ${getClassName(
            itemDenied.itemOrderState
          )}`}
        >
          {itemDenied.icon}
          <span className="text-center">{t(itemDenied.text)}</span>
        </a>
      ) : null}
      {currentState < itemDenied.itemOrderState ? (
        <Divider type="auto-vertical" />
      ) : null}
      {currentState < itemDenied.itemOrderState ||
      currentState === itemSucceed.itemOrderState ||
      currentState > itemSucceed.itemOrderState ? (
        <a
          onClick={
            hasPermission("OrderStatus")
              ? () => handleOnClickStatus(itemSucceed.itemOrderState)
              : () => {}
          }
          className={`flex h-full w-full flex-col items-center justify-center p-3  ${getClassName(
            itemSucceed.itemOrderState
          )}`}
        >
          {itemSucceed.icon}
          <span className="text-center">{t(itemSucceed.text)}</span>
        </a>
      ) : null}
    </div>
  );
};

export default StatusBarDecisionItem;
