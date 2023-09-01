import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import FactoryIcon from "@mui/icons-material/Factory";
import DeleteForever from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import logger from "@/hooks/useLogger";
import { UserProps } from "@/hooks/useUser/types";
import useSubOrder, { SubOrderProps } from "../SubOrder/hooks/useSubOrder";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { OrderProps, OrderState } from "../hooks/useOrder";
import Container from "@component-library/Container";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import useService from "@/pages/Service/hooks/useService";
import Order from "../Order";

interface OrderButtonsProps {
  order: OrderProps;
  user: UserProps | undefined;
  checkedSubOrders: string[];
}

interface OrderButtonProps {
  title: string;
  type: OrderButtonType;
  icon: ReactNode;
  contractor: boolean;
  allowedStates: OrderState[];
}

interface OrderButtonWithCountProps extends OrderButtonProps {
  count?: number;
}

type OrderButtonType =
  | "Delete"
  | "Cancel"
  | "ReOrder"
  | "Reject"
  | "Confirm"
  | "Verify"
  | "Edit"
  | "ContractorSelection";

const OrderButtonData: OrderButtonProps[] = [
  {
    title: "Orders.OrderCollection.button.delete",
    type: "Delete",
    icon: <DeleteForever />,
    contractor: false,
    allowedStates: [
      OrderState.DRAFT,
      OrderState.CONTRACTOR_SELECTED,
      OrderState.DELIVERY,
      OrderState.REQUESTED,
    ],
  },
  {
    title: "Orders.OrderCollection.button.edit",
    type: "Edit",
    icon: <EditIcon />,
    contractor: false,
    allowedStates: [OrderState.DRAFT],
  },
  {
    title: "Orders.OrderCollection.button.cancel",
    type: "Cancel",
    icon: <CancelIcon />,
    contractor: false,
    allowedStates: [OrderState.REQUESTED],
  },
  {
    title: "Orders.OrderCollection.button.contractorSelect",
    type: "ContractorSelection",
    icon: <FactoryIcon />,
    contractor: false,
    allowedStates: [OrderState.DRAFT],
  },
  {
    title: "Orders.OrderCollection.button.verify",
    type: "Verify",
    icon: <AssignmentTurnedInIcon />,
    contractor: false,
    allowedStates: [OrderState.CONTRACTOR_SELECTED],
  },
  {
    title: "Orders.OrderCollection.button.reject",
    type: "Reject",
    icon: <CancelIcon />,
    contractor: true,
    allowedStates: [OrderState.REQUESTED, OrderState.CLARIFICATION],
  },
  {
    title: "Orders.OrderCollection.button.confirm",
    type: "Confirm",
    icon: <CheckIcon />,
    contractor: true,
    allowedStates: [OrderState.REQUESTED, OrderState.CLARIFICATION],
  },
  {
    title: "Orders.OrderCollection.button.reOrder",
    type: "ReOrder",
    icon: <ReplayIcon />,
    contractor: false,
    allowedStates: [OrderState.COMPLETED],
  },
];

const OrderButtons: React.FC<OrderButtonsProps> = (props) => {
  const { user, order, checkedSubOrders } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { deleteSubOrder } = useSubOrder();
  const { isServiceComplete } = useService();

  const showClientButton = (): boolean =>
    user === undefined ||
    (user !== undefined &&
      (user.organizations.includes(order.client) ||
        user.hashedID === order.client));

  const showContractorButton = (): boolean => user !== undefined && false;

  const filterButtonsByUser = (button: OrderButtonProps): boolean =>
    (showClientButton() && button.contractor === false) ||
    (showContractorButton() && button.contractor === true);

  const getCountOfSubOrdersForButton = (
    button: OrderButtonProps,
    selectedSubOrders: SubOrderProps[]
  ): number => {
    return selectedSubOrders.filter(
      (subOrder) =>
        button.allowedStates.includes(subOrder.state) &&
        ((isServiceComplete(subOrder.subOrderID) &&
          button.type === "ContractorSelection") ||
          button.type !== "ContractorSelection")
    ).length;
  };

  const getButtons = (): OrderButtonWithCountProps[] => {
    const buttonsFilterByUser = OrderButtonData.filter(filterButtonsByUser);
    let buttonsWithCount: OrderButtonWithCountProps[] = [];

    const selectedSubOrderStates: SubOrderProps[] = order.subOrders.filter(
      (subOrder) => checkedSubOrders.includes(subOrder.subOrderID)
    );

    buttonsFilterByUser.forEach((button) => {
      const count = getCountOfSubOrdersForButton(
        button,
        selectedSubOrderStates
      );
      if (count > 0) {
        buttonsWithCount.push({
          ...button,
          count: count,
        });
      }
    });

    return buttonsWithCount;
  };

  const handleOnClickButton = (button: OrderButtonProps) => {
    switch (button.type) {
      case "Delete":
        if (window.confirm(t("Orders.OrderCollection.button.cancel") + "?")) {
          logger("checkefSubOrders", checkedSubOrders);
          checkedSubOrders.forEach((subOrderID) => {
            deleteSubOrder.mutate(subOrderID);
          });
        }
        break;
      case "Cancel":
        if (window.confirm(t("Orders.OrderCollection.button.cancel") + "?")) {
          logger("//TODO Cancel");
        }
        break;
      case "ReOrder":
        if (window.confirm(t("Orders.OrderCollection.button.reOrder") + "?")) {
          logger("//TODO ReOrder");
        }
        break;
      case "Reject":
        if (window.confirm(t("Orders.OrderCollection.button.reject") + "?")) {
          logger("//TODO Reject");
        }
        break;
      case "Confirm":
        if (window.confirm(t("Orders.OrderCollection.button.confirm") + "?")) {
          logger("//TODO Confirm");
        }
        break;
      case "Verify":
        navigate("verification");
        break;
      case "Edit":
        navigate(`suborder/${checkedSubOrders[0]}`);
        break;
      case "ContractorSelection":
        navigate("contractorSelection");
        break;
    }
  };

  return (
    <Container wrap="wrap">
      {getButtons().map((button, index) => (
        <PermissionGate element={`OrderButton${button.type}`} key={index}>
          <Button
            key={index}
            variant="icon"
            size="sm"
            startIcon={button.icon}
            onClick={() => handleOnClickButton(button)}
            title={`${t(button.title)}${
              button.count !== undefined ? ` ( ${button.count} )` : ""
            }`}
          />
        </PermissionGate>
      ))}
    </Container>
  );
};

export default OrderButtons;
