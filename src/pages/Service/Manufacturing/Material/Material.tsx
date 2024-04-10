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
import useProcess from "@/pages/Projects/hooks/useProcess";
import { ServiceType } from "../../hooks/useService";
import logger from "@/hooks/useLogger";

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
  const { process } = useProcess();
  const { grid, searchText } = processState;
  const [state, setState] = useState<State>({
    modalOpen: false,
    material: undefined,
  });
  // logger(process.serviceDetails);
  const { materialsQuery } = useManufacturingMaterialQuerys([
    ...filters,
    {
      id: 20,
      isChecked: false,
      isOpen: false,
      question: {
        isSelectable: false,
        title: "material",
        category: "MATERIAL",
        type: "TEXT",
        range: null,
        values: null,
        units: null,
      },
      answer: {
        unit: "id",
        value:
          process.serviceType === ServiceType.MANUFACTURING
            ? process.serviceDetails.material !== undefined
              ? process.serviceDetails.material.id
              : ""
            : "",
      },
    },
    {
      id: 21,
      isChecked: false,
      isOpen: false,
      question: {
        isSelectable: false,
        title: "postprocessings",
        category: "POSTPROCESSING",
        type: "TEXT",
        range: null,
        values: null,
        units: null,
      },
      answer: {
        unit: "ids",
        value:
          process.serviceType === ServiceType.MANUFACTURING
            ? process.serviceDetails.postProcessings !== undefined
              ? process.serviceDetails.postProcessings.map(
                  (postProcessing) => postProcessing.id
                )
              : []
            : [],
      },
    },
  ]);
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
              modalKey="ProcessMaterialPreView"
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
