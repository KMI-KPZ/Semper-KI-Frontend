import { OrderState } from "@/pages/OrderRoutes/hooks/useOrder";
import { Button } from "@component-library/Button";
import React from "react";
import { useTranslation } from "react-i18next";

interface SubOrderStateButtonProps {
  state: OrderState;
}

const SubOrderStateButton: React.FC<SubOrderStateButtonProps> = (props) => {
  const { state } = props;
  const { t } = useTranslation();

  const renderButtons = () => {
    if (state === OrderState.DRAFT)
      return (
        <Button
          title={t(
            "OrderRoutes.SubOrder.components.StateButton.selectManufacturer"
          )}
        />
      );
    else if (state === OrderState.MANUFACTURER_SELECTED)
      return (
        <Button
          title={t("OrderRoutes.SubOrder.components.StateButton.verify")}
        />
      );
    else if (state === OrderState.VERIFIED)
      return (
        <Button
          title={t("OrderRoutes.SubOrder.components.StateButton.request")}
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
