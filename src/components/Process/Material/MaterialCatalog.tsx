import "../../../styles.scss";
import React, { useEffect, useState } from "react";
import { MaterialCatalogCard } from "./MaterialCatalogCard";
import { IMaterial } from "../../../interface/Interface";
import PopUp from "../../PopUp/PopUp";
import { MaterialView } from "./MaterialView";
import { IProcessState } from "../ProcessView";

interface Props {
  materials: IMaterial[];
  processState: IProcessState;
  selectMaterial: (material: IMaterial) => void;
  setProgress(path: string): void;
}

interface State {
  popUp: boolean;
  material: IMaterial | undefined;
}

export const MaterialCatalog: React.FC<Props> = (props) => {
  const { selectMaterial, setProgress, materials, processState } = props;
  const { grid, searchText } = processState;
  const [state, setState] = useState<State>({
    popUp: false,
    material: undefined,
  });
  useEffect(() => {
    setProgress("material");
  }, []);
  const openMaterialView = (material: IMaterial) => {
    setState((prevState) => ({ ...prevState, popUp: true, material }));
  };
  const closeMaterialView = () => {
    setState((prevState) => ({
      ...prevState,
      popUp: false,
      material: undefined,
    }));
  };
  const filterBySearch = (material: IMaterial): boolean => {
    if (searchText === "") {
      return true;
    }
    if (
      material.title.toLocaleLowerCase().includes(searchText) ||
      material.propList.filter((prop) =>
        prop.toLocaleLowerCase().includes(searchText)
      ).length > 0
    )
      return true;
    return false;
  };

  return (
    <div
      className={`flex gap-y-5 ${
        grid === true
          ? "flex-row flex-wrap justify-between"
          : "flex-col flex-nowrap "
      }`}
    >
      {materials.length > 0 ? (
        <>
          {materials
            .filter((material) => filterBySearch(material))
            .map((material: IMaterial, index: number) => (
              <MaterialCatalogCard
                grid={grid}
                selectMaterial={selectMaterial}
                openMaterialView={openMaterialView}
                material={material}
                key={index}
              />
            ))}
          <PopUp
            open={state.popUp === true && state.material !== undefined}
            onOutsideClick={closeMaterialView}
          >
            {state.material !== undefined ? (
              <MaterialView
                material={state.material}
                closeMaterialView={closeMaterialView}
                selectMaterial={selectMaterial}
              />
            ) : null}
          </PopUp>
        </>
      ) : (
        "keine Materialien gefunden"
      )}
    </div>
  );
};
