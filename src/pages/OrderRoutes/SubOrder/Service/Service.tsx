import React from "react";
import { useTranslation } from "react-i18next";

interface SubOrderServiceProps {}

const SubOrderService: React.FC<SubOrderServiceProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return <div className="">SubOrderService</div>;
};

export default SubOrderService;
