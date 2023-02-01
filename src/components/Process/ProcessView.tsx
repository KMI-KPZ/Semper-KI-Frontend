import { createContext, useState } from "react";
import "../../styles.scss";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ModelUpload } from "./Model/ModelUpload";
import { ModelCatalog } from "./Model/ModelCatalog";
import {
  IMaterial,
  IModel,
  IPostProcessing,
  IProcess,
  IManufacturer,
  IAdditive,
  IProgress,
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
import { removeItem } from "../../services/utils";
import Procedure from "./Procedure/Procedure";
import { TestModelList } from "../../services/TestData";

interface Props {
  guideAnswers: IFilterItem[];
}
export interface IProcessState {
  processList: IProcess[];
  activeProcessList: number[];
  grid: boolean;
  progress: IProgress;
}
export interface IProcessContext {
  processState: IProcessState;
  createEmptryProcess(): void;
  addProcessList(processList: IProcess[]): void;
  deleteProcess(processId: number): void;
  selectProcess(index: number): void;
  setProgress(path: string): void;
}
const initialProcessState: IProcessState = {
  processList: [{ title: "Item 1" }],
  activeProcessList: [0],
  grid: true,
  progress: { title: "Modell finden", link: "/process/model", type: 0 },
};
export const ProcessContext = createContext<IProcessContext>({
  processState: initialProcessState,
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
  setProgress: () => {
    console.log("Error ProcessContext setProgress");
  },
});

export const ProcessView = ({ guideAnswers }: Props) => {
  const { path } = useParams<string>();
  const navigate = useNavigate();
  const [state, setState] = useState<IProcessState>(initialProcessState);
  const { loadData, data } = useFilter();

  const applyFilters = (filterItemList: IFilterItem[]) => {
    console.log("Apply Filter", filterItemList);

    loadData(filterItemList);
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
    navigate("/process/upload");
  };
  const selectProcess = (index: number): void => {
    console.log("Process| select Process " + index);
    let activeProcessList: number[] = state.activeProcessList;
    let upload: boolean = false;
    if (index === -1) {
      //Upload
      upload = true;
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
      upload = true;

    setState((prevState) => ({
      ...prevState,
      activeProcessList: upload === true ? [-1] : activeProcessList,
      progress: index === -1 ? getProgressByPath("upload") : prevState.progress,
    }));

    if (upload) {
      navigate("/process/upload");
    } else {
      navigate("/process/model");
    }
  };

  const getProgressByPath = (path: string): IProgress => {
    let progress: IProgress = {
      title: "Modell finden",
      link: "/process/model",
      type: 0,
    };
    switch (path) {
      case "model":
        progress = { title: "Modell finden", link: "/process/model", type: 0 };
        break;
      case "upload":
        progress = {
          title: "Modell/e hochladen",
          link: "/process/upload",
          type: 1,
        };
        break;
      case "material":
        progress = {
          title: "Material finden",
          link: "/process/material",
          type: 0,
        };
        break;
      case "procedure":
        progress = {
          title: "Verfahren finden",
          link: "/process/procedure",
          type: 0,
        };
        break;
      case "manufacturer":
        progress = {
          title: "Hersteller finden",
          link: "/process/manufacturer",
          type: 0,
        };
        break;
      case "postprocessing":
        progress = {
          title: "Nachbearbeitung hinzufügen",
          link: "/process/postprocessing",
          type: 1,
        };
        break;
      case "additive":
        progress = {
          title: "Zusatz hinzufügen",
          link: "/process/additive",
          type: 1,
        };
        break;
      default:
        progress = {
          title: "Modell/e hochladen",
          link: "/process/model",
          type: 1,
        };
        break;
    }
    return progress;
  };
  const setProgress = (path: string) => {
    setState((prevState) => ({
      ...prevState,
      progress: getProgressByPath(path),
      activeProcessList: path === "upload" ? [-1] : prevState.activeProcessList,
    }));
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
        setProgress,
      }}
    >
      <div className="process">
        <Filter applyFilters={applyFilters} guideAnswers={guideAnswers} />
        <div className="process-content">
          <Header />
          <div className="process-container vertical">
            <Routes>
              <Route index element={<Navigate to="/process/model" />} />
              <Route
                path="new"
                element={<NewProcess startNewProcess={startNewProcess} />}
              />
              <Route
                path="model"
                element={
                  <ModelCatalog
                    models={data.models}
                    selectModel={selectModel}
                    setProgress={setProgress}
                  />
                }
              />
              <Route
                path="upload"
                element={
                  <ModelUpload
                    addProcessList={addProcessList}
                    setProgress={setProgress}
                  />
                }
              />
              <Route
                path="material"
                element={
                  <MaterialCatalog
                    selectMaterial={selectMaterial}
                    setProgress={setProgress}
                  />
                }
              />
              <Route
                path="procedure"
                element={<Procedure setProgress={setProgress} />}
              />

              <Route
                path="manufacturer"
                element={
                  <ManufacturerCatalog
                    selectManufacturer={selectManufacturer}
                    setProgress={setProgress}
                  />
                }
              />

              <Route
                path="postprocessing"
                element={
                  <PostProcessingView
                    processList={state.processList}
                    selectPostProcessing={selectPostProcessing}
                    setProgress={setProgress}
                  />
                }
              />
              <Route
                path="additive"
                element={
                  <AdditiveView
                    processList={state.processList}
                    selectAdditive={selectAdditive}
                    setProgress={setProgress}
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
