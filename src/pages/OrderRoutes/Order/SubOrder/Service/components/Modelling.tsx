import { ServiceModellingProps } from "@/pages/OrderRoutes/Service/Modelling/Modelling";
import { Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface SubOrderServiceModellingProps {
  service: ServiceModellingProps;
}

const SubOrderServiceModelling: React.FC<SubOrderServiceModellingProps> = (
  props
) => {
  const { service } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col md:flex-row">
      <Text variant="body">Name: {service.title}</Text>
    </div>
  );
};

export default SubOrderServiceModelling;
