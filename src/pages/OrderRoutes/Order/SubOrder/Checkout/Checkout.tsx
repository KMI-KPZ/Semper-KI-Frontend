import React from "react";
import { useTranslation } from "react-i18next";

interface SubOrderCheckoutProps {}

const SubOrderCheckout: React.FC<SubOrderCheckoutProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return <div className="">SubOrderCheckout</div>;
};

export default SubOrderCheckout;
