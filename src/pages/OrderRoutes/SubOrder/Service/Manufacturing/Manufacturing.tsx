import { createContext, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ProcessModel } from "./Model/Model";
import { IModel } from "./Model/types";
import { IMaterial, ProcessMaterial } from "./Material/Material";
import {
  IPostProcessing,
  ProcessPostProcessing,
} from "./PostProcessing/PostProcessing";
import ProcessNewItem from "./NewItem/NewItem";
import { Error } from "../../../../Error/Error";
import useFilter from "./Filter/hooks/useFilter";
import ProcessHeader from "./Header/Header";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/Loading";
import ProcessFilter, { IFilterItem } from "./Filter/Filter";
import { ProcessModelUpload } from "./Model/components/Upload";
import logger from "@/hooks/useLogger";
import {
  ServiceManufacturingContextReturnProps,
  ServiceManufacturingProps,
  ServiceManufacturingState,
} from "./types";

interface Props {
  service: ServiceManufacturingProps;
}

const initialServiceManufacturingState: ServiceManufacturingState = {
  searchText: "",
  grid: true,
  filterOpen: false,
};

export const ServiceManufacturingContext =
  createContext<ServiceManufacturingContextReturnProps>({
    processState: initialServiceManufacturingState,
    setGrid: () => {
      logger("Error ProcessContext setGridBoolean");
    },
    setFilter: () => {
      logger("Error ProcessContext setFilterOpen");
    },
    setSearchInput: () => {
      logger("Error ProcessContext searchModels");
    },
  });

export const ServiceManufacturing: React.FC<Props> = (props) => {
  const { service } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [state, setState] = useState<ServiceManufacturingState>(
    initialServiceManufacturingState
  );
  const { grid, filterOpen, searchText } = state;
  const { filtersQuery, updateFilters: filtersMutate } = useFilter();

  const setSearchInput = (name: string): void => {
    // logger("Process | searchModels |", name);
    setState((prevState) => ({ ...prevState, searchText: name }));
  };
  const applyFilters = (filterItemList: IFilterItem[]): void => {
    // logger("Process | applyFilters |", filterItemList);
    filtersMutate.mutate(filterItemList);
  };
  const setGrid = (grid: boolean): void => {
    setState((prevState) => ({ ...prevState, grid }));
  };
  const setFilter = (open: boolean): void => {
    setState((prevState) => ({ ...prevState, filterOpen: open }));
  };

  return (
    <ServiceManufacturingContext.Provider
      value={{
        processState: state,
        setGrid: setGrid,
        setFilter: setFilter,
        setSearchInput,
      }}
    >
      <LoadingSuspense query={filtersQuery}>
        <div className="relativ flex w-full flex-col gap-5 xl:flex-row">
          <ProcessFilter
            setFilterOpen={setFilter}
            filterOpen={filterOpen}
            filters={filtersQuery.data}
            applyFilters={applyFilters}
          />
          <div className="flex w-full flex-col gap-5 ">
            <ProcessHeader />
            <Routes>
              <Route index element={<Navigate to="model" />} />
              <Route
                path="model"
                element={
                  <ProcessModel
                    model={service.model}
                    processState={state}
                    filters={filtersQuery.data}
                  />
                }
              />
              <Route path="model/upload" element={<ProcessModelUpload />} />
              <Route
                path="material"
                element={
                  <ProcessMaterial
                    material={service.material}
                    processState={state}
                    filters={filtersQuery.data}
                  />
                }
              />
              <Route
                path="postprocessing"
                element={
                  <ProcessPostProcessing
                    postProcessings={service.postProcessings}
                    processState={state}
                    filters={filtersQuery.data}
                  />
                }
              />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
      </LoadingSuspense>
    </ServiceManufacturingContext.Provider>
  );
};
