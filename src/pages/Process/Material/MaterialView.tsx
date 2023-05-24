import React from "react";
import { useTranslation } from "react-i18next";
import { IMaterial } from "../../../interface/Interface";
import { Button } from "@component-library/Button";

interface Props {
  material: IMaterial;
  deselectMaterial: () => void;
}

export const MaterialView: React.FC<Props> = (props) => {
  const { deselectMaterial, material } = props;
  const { t } = useTranslation();
  return (
    <div className="flex h-fit w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <h2 className="">{material.title}</h2>
      <img className="w-full max-w-xs" src={material.URI} alt="Model" />
      <div className="model-view-tags">
        {material.propList.map((title: string, index: number) => (
          <div key={index} className="model-view-tag">
            {title}
          </div>
        ))}
      </div>
      <Button onClick={deselectMaterial}>
        {t("Process.Material.MaterialView.button.change")}
      </Button>
    </div>
  );
};
