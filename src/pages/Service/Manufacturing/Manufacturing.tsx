import { createContext, useContext, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ProcessModel } from "./Model/Model";
import { ProcessMaterial } from "./Material/Material";
import { ProcessPostProcessing } from "./PostProcessing/PostProcessing";
import useFilter from "./Filter/hooks/useFilter";
import ProcessHeader from "./Header/Header";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/Loading";
import ProcessFilter, { FilterItemProps } from "./Filter/Filter";
import { ProcessModelUpload } from "./Model/Upload/Upload";
import logger from "@/hooks/useLogger";
import {
  ServiceManufacturingContextReturnProps,
  ServiceManufacturingProps,
  ServiceManufacturingState,
} from "./types/types";
import { Error } from "@/pages/Error/Error";
import { ServiceContext } from "../context/ServiceContext";

interface Props {}

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
    service: { type: 1 },
  });

export const ServiceManufacturing: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { service: service_ } = useContext(ServiceContext);
  const service = service_ as ServiceManufacturingProps;
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
  const applyFilters = (filterItemList: FilterItemProps[]): void => {
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
        service,
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
                    model={service !== undefined ? service.model : undefined}
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
                    material={
                      service !== undefined ? service.material : undefined
                    }
                    processState={state}
                    filters={filtersQuery.data}
                  />
                }
              />
              <Route
                path="postprocessing"
                element={
                  <ProcessPostProcessing
                    postProcessings={
                      service !== undefined
                        ? service.postProcessings
                        : undefined
                    }
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
