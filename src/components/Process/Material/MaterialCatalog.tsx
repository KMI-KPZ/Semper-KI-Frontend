import "../../../styles.scss";
import "../ProcessView.scss";
import "./Material.scss";
import React, { useEffect } from "react";
import { MaterialCatalogCard } from "./MaterialCatalogCard";
import { IMaterial } from "../../../interface/Interface";

interface Props {
  materials: IMaterial[];
  grid: boolean;
  selectMaterial: (material: IMaterial) => void;
  setProgress(path: string): void;
}

export const MaterialCatalog: React.FC<Props> = (props) => {
  const { selectMaterial, setProgress, materials, grid } = props;
  useEffect(() => {
    setProgress("material");
  }, []);

  return (
    <div className="material-cards">
      {materials.length > 0
        ? materials
            .slice(0, 12)
            .map((material: IMaterial, index: number) => (
              <MaterialCatalogCard
                grid={grid}
                selectMaterial={selectMaterial}
                material={material}
                key={index}
              />
            ))
        : "keine Materialien gefunden"}
    </div>
  );
};
