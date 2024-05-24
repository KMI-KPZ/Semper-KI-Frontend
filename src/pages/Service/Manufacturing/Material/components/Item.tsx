import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/index";
import { MaterialProps } from "../Material";
import { Heading } from "@component-library/index";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import useProcess from "@/hooks/Process/useProcess";
import { isProcessAtServiceStatus } from "@/api/Process/Querys/useGetProcess";

interface Props {
  material: MaterialProps;
}

export const ProcessMaterialItem: React.FC<Props> = (props) => {
  const { material } = props;
  const { t } = useTranslation();
  const { process } = useProcess();
  const updateProcess = useUpdateProcess();
  const handleOnClickButtonDeselect = () => {
    updateProcess.mutate({
      processIDs: [process.processID],
      updates: { deletions: { serviceDetails: ["material"] } },
    });
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
      {isProcessAtServiceStatus(process) ? (
        <Button
          onClick={handleOnClickButtonDeselect}
          title={t(
            "Service.Manufacturing.Material.components.Item.button.change"
          )}
        />
      ) : null}
    </div>
  );
};
