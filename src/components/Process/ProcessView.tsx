import { Wizard } from "../../components/Process/Wizard/Wizard";
import { createContext, useEffect, useState } from "react";

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
import Filter from "../../components/Process/Filter/Filter";
import NewProcess from "./NewProcess";
import { Error } from "../Error/Error";
import { IFilterItem } from "./Filter/Interface";
import useFilter from "../../hooks/useFilter";
import Header from "./Header/Header";
import { IAppState } from "../App/App";
import { removeItem } from "../../services/utils";

interface Props {
  guideAnswers: IFilterItem[];
  // setProcessList(processList: IProcess[]): void;
  // processList: IProcess[];
  // setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
}

export interface IProcessState {
  processList: IProcess[];
  activeProcessList: number[];
}

export interface IProcessContext {
  processState: IProcessState;
  createEmptryProcess(): void;
  addProcessList(processList: IProcess[]): void;
  deleteProcess(processId: number): void;
  selectProcess(index: number): void;
}

export const ProcessContext = createContext<IProcessContext>({
  processState: {
    processList: [{}],
    activeProcessList: [0],
  },
  createEmptryProcess: () => {
    console.log("Error ProcessContext createEmptryProcess");
  },
  addProcessList: () => {
    console.log("Error ProcessContext addProcessList");
  },
  deleteProcess: () => {
    console.log("Error ProcessContext deleteProcess");
  },
  selectProcess: () => {
    console.log("Error ProcessContext selectProcess");
  },
});

export const ProcessView = ({ guideAnswers }: Props) => {
  const navigate = useNavigate();
  const [state, setState] = useState<IProcessState>({
    processList: [{ title: "Item 1" }],
    activeProcessList: [0],
  });
  const [models, setModels] = useState<IModel[]>([]);
  const { getModels } = useFilter();
  const applyFilters = (filterItemList: IFilterItem[]) => {
    getModels(filterItemList);
    console.log("Apply Filters", filterItemList);
  };

  const startNewProcess = () => {
    setState((prevState) => ({ ...prevState, processList: [{}] }));
  };
  const createEmptryProcess = (): void => {
    console.log("Process| create Emptry Process");
    setState((prevState) => ({
      ...prevState,
      processList: [
        ...prevState.processList,
        { title: "Item " + (prevState.processList.length + 1) },
      ],
      activeProcessList: [prevState.processList.length],
    }));
  };
  const addProcessList = (processList: IProcess[]): void => {
    console.log("Process| add ProcessList");
    setState((prevState) => ({
      ...prevState,
      processList: [...prevState.processList, ...processList],
      activeProcessList: [prevState.processList.length],
    }));
  };
  const deleteProcess = (index: number): void => {
    console.log("Process| delete Process " + index);

    let processList: IProcess[] = state.processList;
    if (processList.length === 1 && index === 0) processList = [];
    else processList.splice(index, 1);

    setState((prevState) => ({
      ...prevState,
      processList,
      activeProcessList: [-1],
    }));
  };
  const selectProcess = (index: number): void => {
    console.log("Process| select Process " + index);
    let activeProcessList: number[] = state.activeProcessList;
    if (index === -1) {
      //Upload
      activeProcessList = [-1];
    } else if (activeProcessList.includes(-1) && index !== -1) {
      //no longer Upload
      activeProcessList = [index];
    } else if (activeProcessList.includes(index)) {
      //remove
      removeItem(activeProcessList, index);
    } else if (!activeProcessList.includes(index)) {
      //add
      activeProcessList.push(index);
    }

    if (state.processList.length === 0 || activeProcessList.length === 0)
      //select upload when no items are slected or available
      activeProcessList = [-1];

    setState((prevState) => ({
      ...prevState,
      activeProcessList,
    }));
    if (index === -1) {
      navigate("/process/upload");
    } else {
      navigate("/process/models");
    }
  };

  const selectModel = (model: IModel): void => {};
  const selectMaterial = (material: IMaterial): void => {};
  const selectManufacturer = (manufacturer: IManufacturer): void => {};
  const selectPostProcessing = (postProcessing: IPostProcessing): void => {};
  const selectAdditive = (additive: IAdditive): void => {};

  return (
    <ProcessContext.Provider
      value={{
        processState: state,
        addProcessList,
        createEmptryProcess,
        deleteProcess,
        selectProcess,
      }}
    >
      <div className="process">
        <Filter applyFilters={applyFilters} guideAnswers={guideAnswers} />
        <div className="process-content">
          <Header processState={state} setProcessState={setState} />
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
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
      </div>
    </ProcessContext.Provider>
  );
};
