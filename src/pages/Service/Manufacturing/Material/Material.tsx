import React, { useEffect, useState } from "react";
import { ProcessMaterialCard } from "./components/Card";
import { ServiceManufacturingState } from "../types/types";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/index";
import { ProcessMaterialPreView } from "./components/PreView";
import { ProcessMaterialItem } from "./components/Item";
import { FilterItemProps } from "../Filter/Filter";
import { Modal } from "@component-library/index";
import { useManufacturingMaterialQuerys } from "../../../../api/Service/Manufacturing/useManufacturingQuerys";

interface Props {
  processState: ServiceManufacturingState;
  material: MaterialProps | undefined;
  filters: FilterItemProps[];
}

interface State {
  modalOpen: boolean;
  material: MaterialProps | undefined;
}

export interface MaterialProps {
  id: string;
  title: string;
  propList: string[];
  URI: string;
}

export const ProcessMaterial: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { filters, processState, material: material } = props;
  const { grid, searchText } = processState;
  const [state, setState] = useState<State>({
    modalOpen: false,
    material: undefined,
  });
  const { materialsQuery } = useManufacturingMaterialQuerys(filters);
  const openMaterialView = (material: MaterialProps) => {
    setState((prevState) => ({ ...prevState, modalOpen: true, material }));
  };
  const closeMaterialView = () => {
    setState((prevState) => ({
      ...prevState,
      modalOpen: false,
      material: undefined,
    }));
  };
  const filterBySearch = (material: MaterialProps): boolean => {
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

  const selectMaterial = () => {};
  const deselectMaterial = () => {};

  return material === undefined ? (
    <LoadingSuspense query={materialsQuery}>
      <div
        className={`flex gap-y-5 md:max-h-[60vh] md:overflow-x-auto md:overflow-y-scroll ${
          grid === true
            ? "flex-row flex-wrap justify-between"
            : "flex-col flex-nowrap "
        }`}
      >
        {materialsQuery.data !== undefined && materialsQuery.data.length > 0 ? (
          <>
            {materialsQuery.data
              .filter((material) => filterBySearch(material))
              .map((material: MaterialProps, index: number) => (
                <ProcessMaterialCard
                  grid={grid}
                  openMaterialView={openMaterialView}
                  material={material}
                  key={index}
                />
              ))}
            <Modal
              title="ProcessMaterialPreView"
              open={state.modalOpen === true && state.material !== undefined}
              closeModal={closeMaterialView}
            >
              {state.material !== undefined ? (
                <ProcessMaterialPreView
                  material={state.material}
                  closeMaterialView={closeMaterialView}
                />
              ) : null}
            </Modal>
          </>
        ) : (
          t("Service.Manufacturing.Material.Material.error.noMaterials")
        )}
      </div>
    </LoadingSuspense>
  ) : (
    <ProcessMaterialItem material={material} />
  );
};
