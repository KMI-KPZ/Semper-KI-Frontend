import { Wizard } from "../../components/Process/Wizard/Wizard";
import React, { ReactNode, useEffect, useState } from "react";

import "../../styles.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ModelUpload } from "./Model/ModelUpload";
import { ModelCatalog } from "./Model/ModelCatalog";
import { Error } from "../Error/Error";
import { ShoppingCart } from "../../components/Process/ProcessShoppingCart/ProcessShoppingCart";
import {
  IMaterial,
  IModel,
  IPostProcessing,
  IProcess,
  IProcessState,
  IManufacturer,
  IAdditive,
} from "../../interface/Interface";
import { MaterialCatalog } from "./Material/MaterialCatalog";
import { PostProcessingView } from "./PostProcessing/PostProcessingView";
import { AdditiveView } from "./Additive/AdditiveView";
import { ModelView } from "./Model/ModelView";
import { MaterialView } from "./Material/MaterialView";
import { ManufacturerCatalog } from "./Manufacturer/ManufacturerCatalog";
import { Overview } from "./Overview/Overview";
import Filter from "../../components/Process/Filter/Filter";
import NewProcess from "./NewProcess";

interface Props {
  setProcessList?(processList: IProcess[]): void;
  processList?: IProcess[];
}

const calcNextFreeId = (processList: IProcess[]): number => {
  let nextFreeId: number = 0;
  processList.forEach((process: IProcess) => {
    if (process.processId > nextFreeId) nextFreeId = process.processId;
  });
  return nextFreeId + 1;
};

export const ProcessView = ({ setProcessList, processList }: Props) => {
  const [state, setState] = useState<IProcessState>({
    progressState: 0,
    activeProcess: 0,
    activeProcessList: [0],
    processList: processList ? processList : [{ processId: 0 }],
    nextID: processList ? calcNextFreeId(processList) : 1,
  });

  const maxExpandedShoppingCardItem = 2;
  const navigate = useNavigate();

  useEffect(() => {
    if (setProcessList !== undefined) {
      setProcessList(state.processList);
    }
  }, [state.processList]);

  const startNewProcess = () => {
    setState({
      progressState: 0,
      activeProcess: 0,
      activeProcessList: [0],
      processList: [{ processId: 0 }],
      nextID: 1,
    });
    if (setProcessList !== undefined) setProcessList([]);
  };

  const setProgressState = (progressStateIndex: number): void => {
    let link;

    switch (progressStateIndex) {
      case 0:
        link = "/process/models";
        break;
      case 1:
        link = "/process/materials";
        break;
      case 2:
        link = "/process/manufacturer";
        break;
      case 3:
        link = "/process/postprocessing";
        break;
      case 4:
        link = "/process/additive";
        break;
      case 5:
        link = "/shoppingcart";
        break;
      default:
        link = "/shoppingcart";
        break;
    }
    console.log("set Progress State", link, progressStateIndex);
    navigate(link);
    setState((prevState) => ({
      ...prevState,
      progressState: progressStateIndex,
    }));
  };

  const addProcess = (process: IProcess): void => {
    console.log("add Process", process);
    setState((prevState) => ({
      ...prevState,
      processList: [...prevState.processList, process],
      nextID: state.nextID + 1,
      activeProcess:
        prevState.processList.length === 0
          ? process.processId
          : prevState.activeProcess,
    }));
  };

  const addProcessList = (processList: IProcess[]): void => {
    console.log("add Process List", processList);
    setState((prevState) => ({
      ...prevState,
      processList: [...prevState.processList, ...processList],
      nextID: state.nextID + processList.length,
      activeProcess:
        prevState.processList.length === 0
          ? processList[0].processId
          : prevState.activeProcess,
    }));
  };

  const deleteProcess = (processId: number): void => {
    console.log("delete Process", processId);
    setState((prevState) => ({
      ...prevState,
      activeProcess:
        prevState.activeProcess !== processId
          ? prevState.activeProcess
          : prevState.processList.filter(
              (process: IProcess) => process.processId !== processId
            ).length === 0
          ? 0
          : prevState.processList.filter(
              (process: IProcess) => process.processId !== processId
            )[0].processId,
      processList: prevState.processList.filter(
        (process: IProcess) => process.processId !== processId
      ),
    }));
  };

  const calcActiveProcessList = (
    processId: number,
    expand: boolean
  ): number[] => {
    let activeProcessList = state.activeProcessList;
    var index = activeProcessList.indexOf(processId);
    if (expand) {
      if (activeProcessList.length <= 1) {
        activeProcessList.push(processId);
      } else if (activeProcessList.length > 1) {
        if (activeProcessList.includes(processId)) {
          if (index !== -1) {
            activeProcessList.splice(index, 1);
          }
        }
        if (activeProcessList.length === maxExpandedShoppingCardItem)
          activeProcessList.shift();
        activeProcessList.push(processId);
      }
    } else {
      if (index !== -1) {
        activeProcessList.splice(index, 1);
      }
    }
    return activeProcessList;
  };

  const selectProcess = (processId: number): void => {
    console.log("select Process", processId);

    setState((prevState) => ({
      ...prevState,
      activeProcess: processId,
      activeProcessList: calcActiveProcessList(processId, true),
    }));
  };

  const setShoppingCardItemExpanded = (
    processId: number,
    expand: boolean
  ): void => {
    console.log("toggel Process Shoppingcart", processId);
    setState((prevState) => ({
      ...prevState,
      activeProcessList: calcActiveProcessList(processId, expand),
    }));
  };

  const getActiveProcess = (): IProcess | undefined => {
    return state.processList.filter(
      (process: IProcess) => process.processId === state.activeProcess
    )[0];
  };

  const selectModel = (model: IModel): void => {
    setState((prevState) => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter(
          (process: IProcess) => process.processId < prevState.activeProcess
        ),
        {
          ...prevState.processList.filter(
            (process: IProcess) => process.processId === prevState.activeProcess
          )[0],
          model: model,
        },
        ...prevState.processList.filter(
          (process: IProcess) => process.processId > prevState.activeProcess
        ),
      ],
    }));
  };

  const selectMaterial = (material: IMaterial): void => {
    setState((prevState) => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter(
          (process: IProcess) => process.processId < prevState.activeProcess
        ),
        {
          ...prevState.processList.filter(
            (process: IProcess) => process.processId === prevState.activeProcess
          )[0],
          material: material,
        },
        ...prevState.processList.filter(
          (process: IProcess) => process.processId > prevState.activeProcess
        ),
      ],
    }));
  };

  const selectManufacturer = (manufacturer: IManufacturer): void => {
    setState((prevState) => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter(
          (process: IProcess) => process.processId < prevState.activeProcess
        ),
        {
          ...prevState.processList.filter(
            (process: IProcess) => process.processId === prevState.activeProcess
          )[0],
          manufacturer: manufacturer,
        },
        ...prevState.processList.filter(
          (process: IProcess) => process.processId > prevState.activeProcess
        ),
      ],
    }));
  };

  const selectPostProcessing = (postProcessing: IPostProcessing): void => {
    setState((prevState) => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter(
          (process: IProcess) => process.processId < prevState.activeProcess
        ),
        {
          ...prevState.processList.filter(
            (process: IProcess) => process.processId === prevState.activeProcess
          )[0],
          postProcessing: postProcessing,
        },
        ...prevState.processList.filter(
          (process: IProcess) => process.processId > prevState.activeProcess
        ),
      ],
    }));
  };

  const selectAdditive = (additive: IAdditive): void => {
    setState((prevState) => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter(
          (process: IProcess) => process.processId < prevState.activeProcess
        ),
        {
          ...prevState.processList.filter(
            (process: IProcess) => process.processId === prevState.activeProcess
          )[0],
          additive: additive,
        },
        ...prevState.processList.filter(
          (process: IProcess) => process.processId > prevState.activeProcess
        ),
      ],
    }));
  };

  return (
    <div className="process-container main horizontal">
      <Filter />
      <div className="process-container content vertical">
        <Wizard state={state} setProgressState={setProgressState} />
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
                  <ModelCatalog
                    setProgressState={setProgressState}
                    selectModel={selectModel}
                  />
                }
              />
              <Route
                path="upload"
                element={
                  <ModelUpload
                    state={state}
                    addProcessList={addProcessList}
                    setProgressState={setProgressState}
                    selectProcess={selectProcess}
                  />
                }
              />
            </Route>
            <Route path="materials">
              <Route
                index
                element={
                  <MaterialCatalog
                    setProgressState={setProgressState}
                    selectMaterial={selectMaterial}
                  />
                }
              />
            </Route>
            <Route path="manufacturer">
              <Route
                index
                element={
                  <ManufacturerCatalog
                    setProgressState={setProgressState}
                    selectManufacturer={selectManufacturer}
                  />
                }
              />
            </Route>
            <Route
              path="postprocessing"
              element={
                <PostProcessingView
                  state={state}
                  setProgressState={setProgressState}
                  selectPostProcessing={selectPostProcessing}
                />
              }
            />
            <Route
              path="additive"
              element={
                <AdditiveView
                  setProgressState={setProgressState}
                  state={state}
                  selectAdditive={selectAdditive}
                />
              }
            />
            <Route
              path="overview"
              element={
                <Overview
                  state={state}
                  setProgressState={setProgressState}
                  selectProcess={selectProcess}
                />
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>

      {state.progressState !== 5 && (
        <ShoppingCart
          setShoppingCardItemExpanded={setShoppingCardItemExpanded}
          setProgressState={setProgressState}
          state={state}
          addProcess={addProcess}
          deleteProcess={deleteProcess}
          selectProcess={selectProcess}
        />
      )}
    </div>
  );
};
