import React, { useEffect, useState } from "react";
import { ProcessMaterialCard } from "./components/Card";
import { IProcessState } from "../types";
import { useTranslation } from "react-i18next";
import { useMaterialData } from "../hooks/useProcessData";
import { LoadingSuspense } from "@component-library/Loading";
import { ProcessMaterialPreView } from "./components/PreView";
import { ProcessMaterialItem } from "./components/Item";
import { IFilterItem } from "../Filter/Filter";
import Modal from "@component-library/Modal";

interface Props {
  processState: IProcessState;
  selectedMaterial: IMaterial | undefined;
  filters: IFilterItem[];
  selectMaterial(material: IMaterial): void;
  deselectMaterial(): void;
  setProgress(path: string): void;
}

interface State {
  modalOpen: boolean;
  material: IMaterial | undefined;
}

export interface IMaterial {
  id: string;
  title: string;
  propList: string[];
  URI: string;
}

export const ProcessMaterial: React.FC<Props> = (props) => {
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
    modalOpen: false,
    material: undefined,
  });
  const { materialsQuery } = useMaterialData(filters);
  useEffect(() => {
    setProgress("material");
  }, []);
  const openMaterialView = (material: IMaterial) => {
    setState((prevState) => ({ ...prevState, modalOpen: true, material }));
  };
  const closeMaterialView = () => {
    setState((prevState) => ({
      ...prevState,
      modalOpen: false,
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
                <ProcessMaterialCard
                  grid={grid}
                  selectMaterial={selectMaterial}
                  openMaterialView={openMaterialView}
                  material={material}
                  key={index}
                />
              ))}
            <Modal
              open={state.modalOpen === true && state.material !== undefined}
              closeModal={closeMaterialView}
            >
              {state.material !== undefined ? (
                <ProcessMaterialPreView
                  material={state.material}
                  closeMaterialView={closeMaterialView}
                  selectMaterial={selectMaterial}
                />
              ) : null}
            </Modal>
          </>
        ) : (
          t("Process.Material.MaterialCatalog.empty")
        )}
      </div>
    </LoadingSuspense>
  ) : (
    <ProcessMaterialItem
      deselectMaterial={deselectMaterial}
      material={selectedMaterial}
    />
  );
};
