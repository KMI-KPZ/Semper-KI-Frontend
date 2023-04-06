import React from "react";
import { IMaterial } from "../../../interface/Interface";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../../General/Button";

interface Props {
  material: IMaterial;
  selectMaterial: (material: IMaterial) => void;
  closeMaterialView(): void;
}

export const MaterialPreView: React.FC<Props> = (props) => {
  const { closeMaterialView, material, selectMaterial } = props;
  return (
    <div className="flex flex-col gap-5 items-center justify-start bg-white h-screen w-screen xl:w-fit xl:max-h-[90vh] overflow-x-hidden overflow-y-auto xl:min-w-[700px]">
      <div className="xl:hidden flex flex-row-reverse w-full">
        <div
          className="hover:bg-gray-300 hover:cursor-pointer p-3"
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
