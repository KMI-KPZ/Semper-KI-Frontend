import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/index";
import { Heading } from "@component-library/index";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import useProcess from "@/hooks/Process/useProcess";
import { isProcessAtServiceStatus } from "@/api/Process/Querys/useGetProcess";
import { MaterialProps } from "@/api/Service/AdditiveManufacturing/Material/Querys/useGetMaterials";
import {
  OntoNodePropertyName,
  isOntoNodePropertyName,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import { ManufacturingGroupContext } from "@/contexts/ManufacturingGroupContext";

interface Props {
  material: MaterialProps;
}

export const ProcessMaterialItem: React.FC<Props> = (props) => {
  const { material } = props;
  const { t } = useTranslation();
  const { process } = useProcess();
  const updateProcess = useUpdateProcess();
  const { groupID } = useContext(ManufacturingGroupContext);
  const handleOnClickButtonDeselect = () => {
    updateProcess.mutate({
      processIDs: [process.processID],
      updates: {
        deletions: { serviceDetails: { groups: [{ groupID, material }] } },
      },
    });
  };

  return (
    <div className="flex h-fit w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <Heading variant="h2">{material.title}</Heading>
      <img className="w-full max-w-xs" src={material.imgPath} alt="Model" />
      <div className="model-view-tags">
        {material.propList.map((prop, index: number) => (
          <div key={index} className="model-view-tag">
            {isOntoNodePropertyName(prop.name)
              ? t(
                  `types.OntoNodePropertyName.${
                    prop.name as OntoNodePropertyName
                  }`
                )
              : prop.name}
            :{prop.value.toString()}
          </div>
        ))}
      </div>
      {isProcessAtServiceStatus(process) ? (
        <Button
          onClick={handleOnClickButtonDeselect}
          title={t("general.button.change")}
        />
      ) : null}
    </div>
  );
};
