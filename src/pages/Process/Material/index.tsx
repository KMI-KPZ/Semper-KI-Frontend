import React, { useEffect, useState } from "react";
import { MaterialCatalogCard } from "./components/card";
import { IMaterial } from "../../../interface/Interface";
import { IProcessState } from "..";
import { useTranslation } from "react-i18next";
import { useMaterialData } from "../../../hooks/useProcessData";
import { LoadingSuspense } from "@component-library/Loading";
import PopUp from "@/components/PopUp";
import { MaterialPreView } from "./components/preView";
import { MaterialView } from "./components/view";
import { IFilterItem } from "../Filter";

interface Props {
  processState: IProcessState;
  selectedMaterial: IMaterial | undefined;
  filters: IFilterItem[];
  selectMaterial(material: IMaterial): void;
  deselectMaterial(): void;
  setProgress(path: string): void;
}

interface State {
  popUp: boolean;
  material: IMaterial | undefined;
}

export const MaterialCatalog: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    selectMaterial,
    setProgress,
    filters,
    processState,
    deselectMaterial,
    selectedMaterial,
  } = props;
  const { grid, searchText } = processState;
  const [state, setState] = useState<State>({
    popUp: false,
    material: undefined,
  });
  const { materialsQuery } = useMaterialData(filters);
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

  return selectedMaterial === undefined ? (
    <LoadingSuspense query={materialsQuery}>
      <div
        className={`flex gap-y-5 ${
          grid === true
            ? "flex-row flex-wrap justify-between"
            : "flex-col flex-nowrap "
        }`}
      >
        {materialsQuery.data !== undefined && materialsQuery.data.length > 0 ? (
          <>
            {materialsQuery.data
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
                <MaterialPreView
                  material={state.material}
                  closeMaterialView={closeMaterialView}
                  selectMaterial={selectMaterial}
                />
              ) : null}
            </PopUp>
          </>
        ) : (
          t("Process.Material.MaterialCatalog.empty")
        )}
      </div>
    </LoadingSuspense>
  ) : (
    <MaterialView
      deselectMaterial={deselectMaterial}
      material={selectedMaterial}
    />
  );
};
