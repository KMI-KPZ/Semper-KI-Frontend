import React from "react";
import { IMaterial } from "../../../interface/Interface";
import Button from "../../Button/Button";

interface Props {
  material: IMaterial;
  deselectMaterial: () => void;
}

export const MaterialView: React.FC<Props> = (props) => {
  const { deselectMaterial, material } = props;
  return (
    <div className="flex flex-col gap-5 items-center justify-start bg-white h-fit w-full">
      <h2 className="">{material.title}</h2>
      <img className="w-full max-w-xs" src={material.URI} alt="Model" />
      <div className="model-view-tags">
        {material.propList.map((title: string, index: number) => (
          <div key={index} className="model-view-tag">
            {title}
          </div>
        ))}
      </div>
      <div className="pb-2" onClick={deselectMaterial}>
        <div className=" text-white flex flex-row justify-center items-center w-full p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer">
          Ändern
        </div>
      </div>
    </div>
  );
};
