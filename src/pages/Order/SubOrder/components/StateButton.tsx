import { Button } from "@component-library/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import FactoryIcon from "@mui/icons-material/Factory";
import PolicyIcon from "@mui/icons-material/Policy";
import SendIcon from "@mui/icons-material/Send";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { OrderState } from "@/pages/Order/hooks/useOrder";
import useService from "@/pages/Service/hooks/useService";

interface SubOrderStateButtonProps {
  subOrderID: string;
  state: OrderState;
}

const SubOrderStateButton: React.FC<SubOrderStateButtonProps> = (props) => {
  const { state, subOrderID } = props;
  const { t } = useTranslation();
  const { isServiceComplete } = useService();

  const renderButtons = () => {
    if (state === OrderState.DRAFT)
      return (
        <>
          <Button
            startIcon={<PlayArrowIcon />}
            title={t("OrderRoutes.SubOrder.components.StateButton.continue")}
            to={`suborder/${subOrderID}`}
          />
          <Button
            startIcon={<FactoryIcon />}
            title={t(
              "OrderRoutes.SubOrder.components.StateButton.selectContractor"
            )}
            to={`suborder/${subOrderID}/contractorSelection`}
            active={isServiceComplete(subOrderID)}
          />
        </>
      );
    else if (state === OrderState.CONTRACTOR_SELECTED)
      return (
        <Button
          startIcon={<PolicyIcon />}
          title={t("OrderRoutes.SubOrder.components.StateButton.verify")}
          to={`suborder/${subOrderID}/verification`}
        />
      );
    else if (state === OrderState.VERIFIED)
      return (
        <Button
          startIcon={<SendIcon />}
          title={t("OrderRoutes.SubOrder.components.StateButton.request")}
          to={`suborder/${subOrderID}/checkout`}
        />
      );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
      {renderButtons()}
    </div>
  );
};

export default SubOrderStateButton;
