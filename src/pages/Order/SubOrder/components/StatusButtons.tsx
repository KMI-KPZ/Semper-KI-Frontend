import { Button } from "@component-library/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import FactoryIcon from "@mui/icons-material/Factory";
import PolicyIcon from "@mui/icons-material/Policy";
import SendIcon from "@mui/icons-material/Send";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { OrderState } from "@/pages/Order/hooks/useOrder";
import useService from "@/pages/Service/hooks/useService";
import EditIcon from "@mui/icons-material/Edit";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface SubOrderStatusButtonsProps {
  subOrderID: string;
  state: OrderState;
}

const SubOrderStatusButtons: React.FC<SubOrderStatusButtonsProps> = (props) => {
  const { state, subOrderID } = props;
  const { t } = useTranslation();
  const { isServiceComplete } = useService();

  const renderButtons = () => {
    if (state === OrderState.DRAFT)
      return (
        <>
          <PermissionGate element="SubOrderButtonEdit">
            <Button
              variant="icon"
              startIcon={<EditIcon />}
              title={t("OrderRoutes.SubOrder.components.StateButton.edit")}
              to={`suborder/${subOrderID}`}
            />
          </PermissionGate>

          <PermissionGate element="SubOrderButtonContractorSelection">
            <Button
              variant="icon"
              startIcon={<FactoryIcon />}
              title={t(
                "OrderRoutes.SubOrder.components.StateButton.selectContractor"
              )}
              to={`suborder/${subOrderID}/contractorSelection`}
              active={isServiceComplete(subOrderID)}
            />
          </PermissionGate>
        </>
      );
    else if (state === OrderState.CONTRACTOR_SELECTED)
      return (
        <PermissionGate element="SubOrderButtonVerify">
          <Button
            variant="icon"
            startIcon={<PolicyIcon />}
            title={t("OrderRoutes.SubOrder.components.StateButton.verify")}
            to={`suborder/${subOrderID}/verification`}
          />
        </PermissionGate>
      );
    else if (state === OrderState.VERIFIED)
      return (
        <PermissionGate element="SubOrderButtonRequest">
          <Button
            variant="icon"
            startIcon={<SendIcon />}
            title={t("OrderRoutes.SubOrder.components.StateButton.request")}
            to={`suborder/${subOrderID}/checkout`}
          />
        </PermissionGate>
      );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
      {renderButtons()}
    </div>
  );
};

export default SubOrderStatusButtons;
