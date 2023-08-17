import { OrderState } from "@/pages/OrderRoutes/hooks/useOrder";
import { Button } from "@component-library/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import FactoryIcon from "@mui/icons-material/Factory";
import PolicyIcon from "@mui/icons-material/Policy";
import SendIcon from "@mui/icons-material/Send";

interface SubOrderStateButtonProps {
  subOrderID: string;
  state: OrderState;
}

const SubOrderStateButton: React.FC<SubOrderStateButtonProps> = (props) => {
  const { state, subOrderID } = props;
  const { t } = useTranslation();

  const renderButtons = () => {
    if (state === OrderState.DRAFT)
      return (
        <Button
          startIcon={<FactoryIcon />}
          title={t(
            "OrderRoutes.SubOrder.components.StateButton.selectManufacturer"
          )}
          to={`suborder/${subOrderID}/manufacturerSelection`}
        />
      );
    else if (state === OrderState.MANUFACTURER_SELECTED)
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
