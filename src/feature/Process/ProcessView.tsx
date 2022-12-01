import { Wizard } from "../../components/Process/Wizard/Wizard";
import { useState } from "react";

import "../../styles.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ModelUpload } from "./Model/ModelUpload";
import { ModelCatalog } from "./Model/ModelCatalog";
import { Error } from "../Error/Error";
import { ShoppingCart } from "../../components/Process/ProcessShoppingCart/ProcessShoppingCart";
import {
  Material,
  Model,
  PostProcessing,
  Process,
  ProcessState,
  Manufacturer,
  Additive,
} from "../../interface/Interface";
import { MaterialCatalog } from "./Material/MaterialCatalog";
import { PostProcessingView } from "./PostProcessing/PostProcessingView";
import { AdditiveView } from "./Additive/AdditiveView";
import { ModelView } from "./Model/ModelView";
import { MaterialView } from "./Material/MaterialView";
import { ManufacturerCatalog } from "./Manufacturer/ManufacturerCatalog";
import { Overview } from "./Overview/Overview";
import Filter from "../../components/Process/Filter/Filter";

export const ProcessView = () => {
  const [state, setState] = useState<ProcessState>({
    progressState: 0,
    activeProcess: 0,
    activeProcessList: [0],
    processList: [{ processId: 0 }],
    nextID: 1,
  });
  const maxExpandedShoppingCardItem = 2;
  const navigate = useNavigate();

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

  const addProcess = (process: Process): void => {
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

  const addProcessList = (processList: Process[]): void => {
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
              (process: Process) => process.processId !== processId
            ).length === 0
          ? 0
          : prevState.processList.filter(
              (process: Process) => process.processId !== processId
            )[0].processId,
      processList: prevState.processList.filter(
        (process: Process) => process.processId !== processId
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

  const getActiveProcess = (): Process | undefined => {
    return state.processList.filter(
      (process: Process) => process.processId === state.activeProcess
    )[0];
  };

  const selectModel = (model: Model): void => {
    setState((prevState) => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter(
          (process: Process) => process.processId < prevState.activeProcess
        ),
        {
          ...prevState.processList.filter(
            (process: Process) => process.processId === prevState.activeProcess
          )[0],
          model: model,
        },
        ...prevState.processList.filter(
          (process: Process) => process.processId > prevState.activeProcess
        ),
      ],
    }));
  };

  const selectMaterial = (material: Material): void => {
    setState((prevState) => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter(
          (process: Process) => process.processId < prevState.activeProcess
        ),
        {
          ...prevState.processList.filter(
            (process: Process) => process.processId === prevState.activeProcess
          )[0],
          material: material,
        },
        ...prevState.processList.filter(
          (process: Process) => process.processId > prevState.activeProcess
        ),
      ],
    }));
  };

  const selectManufacturer = (manufacturer: Manufacturer): void => {
    setState((prevState) => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter(
          (process: Process) => process.processId < prevState.activeProcess
        ),
        {
          ...prevState.processList.filter(
            (process: Process) => process.processId === prevState.activeProcess
          )[0],
          manufacturer: manufacturer,
        },
        ...prevState.processList.filter(
          (process: Process) => process.processId > prevState.activeProcess
        ),
      ],
    }));
  };

  const selectPostProcessing = (postProcessing: PostProcessing): void => {
    setState((prevState) => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter(
          (process: Process) => process.processId < prevState.activeProcess
        ),
        {
          ...prevState.processList.filter(
            (process: Process) => process.processId === prevState.activeProcess
          )[0],
          postProcessing: postProcessing,
        },
        ...prevState.processList.filter(
          (process: Process) => process.processId > prevState.activeProcess
        ),
      ],
    }));
  };

  const selectAdditive = (additive: Additive): void => {
    setState((prevState) => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter(
          (process: Process) => process.processId < prevState.activeProcess
        ),
        {
          ...prevState.processList.filter(
            (process: Process) => process.processId === prevState.activeProcess
          )[0],
          additive: additive,
        },
        ...prevState.processList.filter(
          (process: Process) => process.processId > prevState.activeProcess
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
