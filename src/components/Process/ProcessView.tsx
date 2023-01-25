import { Wizard } from "../../components/Process/Wizard/Wizard";
import { useEffect, useState } from "react";

import "../../styles.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ModelUpload } from "./Model/ModelUpload";
import { ModelCatalog } from "./Model/ModelCatalog";
import {
  IMaterial,
  IModel,
  IPostProcessing,
  IProcess,
  IManufacturer,
  IAdditive,
} from "../../interface/Interface";
import { MaterialCatalog } from "./Material/MaterialCatalog";
import { PostProcessingView } from "./PostProcessing/PostProcessingView";
import { AdditiveView } from "./Additive/AdditiveView";
import { ManufacturerCatalog } from "./Manufacturer/ManufacturerCatalog";
import { Overview } from "./Overview/Overview";
import Filter from "../../components/Process/Filter/Filter";
import NewProcess from "./NewProcess";
import { Error } from "../Error/Error";
import { IFilterItem } from "./Filter/Interface";
import useFilter from "../../hooks/useFilter";
import Header from "./Header/Header";

interface Props {
  setProcessList?(processList: IProcess[]): void;
  processList?: IProcess[];
  guideAnswers: IFilterItem[];
}

interface State {
  processList: IProcess[];
}

export const ProcessView = ({
  setProcessList,
  processList,
  guideAnswers,
}: Props) => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    processList: [],
  });
  const [models, setModels] = useState<IModel[]>([]);
  const { getModels } = useFilter();
  const applyFilters = (filterItemList: IFilterItem[]) => {
    getModels(filterItemList);
    console.log("Apply Filters", filterItemList);
  };

  const startNewProcess = () => {
    setState((prevState) => ({ ...prevState, processList: [] }));
  };

  const addProcess = (process: IProcess): void => {};

  const addProcessList = (processList: IProcess[]): void => {};

  const deleteProcess = (processId: number): void => {};

  const selectProcess = (processId: number): void => {};

  const selectModel = (model: IModel): void => {};

  const selectMaterial = (material: IMaterial): void => {};

  const selectManufacturer = (manufacturer: IManufacturer): void => {};

  const selectPostProcessing = (postProcessing: IPostProcessing): void => {};

  const selectAdditive = (additive: IAdditive): void => {};

  return (
    <div className="process">
      <Filter applyFilters={applyFilters} guideAnswers={guideAnswers} />
      <div className="process-content">
        <Header processList={state.processList} />
        <div className="process-container vertical">
          <Routes>
            <Route
              path="new"
              element={<NewProcess startNewProcess={startNewProcess} />}
            />
            <Route path="models">
              <Route
                index
                element={
                  <ModelCatalog models={models} selectModel={selectModel} />
                }
              />
              <Route
                path="upload"
                element={
                  <ModelUpload
                    processList={state.processList}
                    addProcessList={addProcessList}
                    selectProcess={selectProcess}
                  />
                }
              />
            </Route>
            <Route path="materials">
              <Route
                index
                element={<MaterialCatalog selectMaterial={selectMaterial} />}
              />
            </Route>
            <Route path="manufacturer">
              <Route
                index
                element={
                  <ManufacturerCatalog
                    selectManufacturer={selectManufacturer}
                  />
                }
              />
            </Route>
            <Route
              path="postprocessing"
              element={
                <PostProcessingView
                  processList={state.processList}
                  selectPostProcessing={selectPostProcessing}
                />
              }
            />
            <Route
              path="additive"
              element={
                <AdditiveView
                  processList={state.processList}
                  selectAdditive={selectAdditive}
                />
              }
            />
            <Route
              path="overview"
              element={
                <Overview
                  processList={state.processList}
                  selectProcess={selectProcess}
                />
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
