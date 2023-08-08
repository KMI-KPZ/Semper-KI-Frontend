import { PostProcessingProps } from "@/pages/OrderRoutes/Service/Manufacturing/PostProcessing/PostProcessing";
import { ServiceManufacturingProps } from "@/pages/OrderRoutes/Service/Manufacturing/types";
import { Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface SubOrderServiceManufacturingProps {
  service: ServiceManufacturingProps;
}

const SubOrderServiceManufacturing: React.FC<
  SubOrderServiceManufacturingProps
> = (props) => {
  const { service } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col md:flex-row">
      <Text variant="body">Name: {service.title}</Text>
      <Text variant="body">Modell: {service.model?.title}</Text>
      <Text variant="body">Material: {service.material?.title}</Text>
      <Text variant="body">
        Nachbeabeitungen:{" "}
        {service.postProcessings?.map(
          (postProcessing: PostProcessingProps) => postProcessing.title
        )}
      </Text>
    </div>
  );
};

export default SubOrderServiceManufacturing;
