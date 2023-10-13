import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import { MaterialProps } from "../Material";
import { Heading } from "@component-library/Typography";
import useProcess from "@/pages/Projects/hooks/useProcess";

interface Props {
  material: MaterialProps;
}

export const ProcessMaterialItem: React.FC<Props> = (props) => {
  const { material } = props;
  const { t } = useTranslation();
  const { updateProcess } = useProcess();

  const handleOnClickButtonDeselect = () => {
    updateProcess.mutate({ deletions: { service: ["material"] } });
  };

  return (
    <div className="flex h-fit w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <Heading variant="h2">{material.title}</Heading>
      <img className="w-full max-w-xs" src={material.URI} alt="Model" />
      <div className="model-view-tags">
        {material.propList.map((title: string, index: number) => (
          <div key={index} className="model-view-tag">
            {title}
          </div>
        ))}
      </div>
      <Button
        onClick={handleOnClickButtonDeselect}
        title={t(
          "Service.Manufacturing.Material.components.Item.button.change"
        )}
      />
    </div>
  );
};
