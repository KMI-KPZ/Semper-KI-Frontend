import React from "react";
import { IMaterial } from "../../../interface/Interface";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@component-library/Button";

interface Props {
  material: IMaterial;
  selectMaterial: (material: IMaterial) => void;
  closeMaterialView(): void;
}

export const MaterialPreView: React.FC<Props> = (props) => {
  const { closeMaterialView, material, selectMaterial } = props;
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
      <h2 className="">{material.title}</h2>
      <img className="w-full xl:max-w-xl" src={material.URI} alt="Model" />
      <div className="model-view-tags">
        {material.propList.map((title: string, index: number) => (
          <div key={index} className="model-view-tag">
            {title}
          </div>
        ))}
      </div>
      <Button onClick={() => selectMaterial(material)}>Auswählen</Button>
    </div>
  );
};
