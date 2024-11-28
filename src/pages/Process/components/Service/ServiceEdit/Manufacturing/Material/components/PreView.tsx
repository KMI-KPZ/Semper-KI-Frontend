import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@component-library/index";
import { Heading } from "@component-library/index";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useProcess from "@/hooks/Process/useProcess";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import { MaterialProps } from "@/api/Service/AdditiveManufacturing/Material/Querys/useGetMaterials";
import {
  OntoNodePropertyName,
  isOntoNodePropertyName,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";

interface Props {
  material: MaterialProps;
  closeMaterialView(): void;
}

export const ProcessMaterialPreView: React.FC<Props> = (props) => {
  const { closeMaterialView, material } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { process } = useProcess();
  const updateProcess = useUpdateProcess();

  const handleOnClickButtonSelect = () => {
    updateProcess.mutate({
      processIDs: [process.processID],
      updates: { changes: { serviceDetails: { material: [material] } } },
    });
    navigate("../postprocessing");
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start gap-5 overflow-y-auto overflow-x-hidden bg-white xl:max-h-[90vh] xl:w-fit xl:min-w-[700px]">
      <div className="flex w-full flex-row-reverse xl:hidden">
        <div
          className="p-3 hover:cursor-pointer hover:bg-gray-300"
          onClick={closeMaterialView}
        >
          <CloseIcon fontSize="large" />
        </div>
      </div>
      <Heading variant="h2">{material.title}</Heading>
      <img className="w-full xl:max-w-xl" src={material.imgPath} alt="Model" />
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
      <Button
        onClick={handleOnClickButtonSelect}
        title={t("general.button.select")}
      />
    </div>
  );
};
