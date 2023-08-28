import { PostProcessingProps } from "@/pages/Service/Manufacturing/PostProcessing/PostProcessing";
import { ServiceManufacturingProps } from "@/pages/Service/Manufacturing/types";
import { Heading, Text } from "@component-library/Typography";
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
    <div className="flex w-full flex-col gap-5 p-5">
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <Text variant="body">Modell:</Text>
        <Text variant="body">
          {service.model === undefined ? "---" : service.model.title}
        </Text>
      </div>
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <Text variant="body">Material:</Text>
        <Text variant="body">
          {service.material === undefined ? "---" : service.material.title}
        </Text>
      </div>
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <Text variant="body">Nachbeabeitungen:</Text>
        <Text variant="body">
          {service.postProcessings === undefined
            ? "---"
            : service.postProcessings.map(
                (postProcessing: PostProcessingProps) => postProcessing.title
              )}
        </Text>
      </div>
    </div>
  );
};

export default SubOrderServiceManufacturing;
