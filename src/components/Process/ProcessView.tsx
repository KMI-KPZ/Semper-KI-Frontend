import { createContext, useEffect, useState } from "react";
import "../../styles.scss";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ModelUpload } from "./Model/ModelUpload";
import { ModelCatalog } from "./Model/ModelCatalog";
import {
  IMaterial,
  IModel,
  IPostProcessing,
  IProcessItem,
  IProgress,
} from "../../interface/Interface";
import { MaterialCatalog } from "./Material/MaterialCatalog";
import { PostProcessingView } from "./PostProcessing/PostProcessingView";
import Filter from "../../components/Process/Filter/Filter";
import NewProcess from "./NewProcess";
import { Error } from "../Error/Error";
import { IFilterItem } from "./Filter/Interface";
import useFilter from "../../hooks/useFilter";
import Header from "./Header/Header";
import useProcessData from "../../hooks/useProcessData";
import useCart from "../../hooks/useCart";
import { checkForSelectedData } from "../../services/utils";

interface Props {
  guideAnswers: IFilterItem[];
  isLoggedInResponse: boolean;
}

export interface IProcessState {
  items: IProcessItem[];
  activeItemIndex: number;
  grid: boolean;
  searchText: string;
  progress: IProgress;
  filterOpen: boolean;
}

export interface IProcessContext {
  processState: IProcessState;
  createProcessItem(model?: IModel): void;
  deleteProcessItem(processId: number): void;
  selectProcessItem(index: number): void;
  setProgress(path: string): void;
  setGridState(grid: boolean): void;
  setFilterOpen(open: boolean): void;
  searchModels(name: string): void;
}
const initialProcessState = (cart?: IProcessItem[]): IProcessState => ({
  items: cart !== undefined && cart.length > 0 ? cart : [{ title: "Item 1" }],
  activeItemIndex: 0,
  searchText: "",
  grid: true,
  progress: { title: "Modell finden", link: "/process/model", type: 0 },
  filterOpen: false,
});

export const ProcessContext = createContext<IProcessContext>({
  processState: initialProcessState(),
  createProcessItem: () => {
    console.log("Error ProcessContext createProcessItem");
  },
  deleteProcessItem: () => {
    console.log("Error ProcessContext deleteProcess");
  },
  selectProcessItem: () => {
    console.log("Error ProcessContext selectProcess");
  },
  setProgress: () => {
    console.log("Error ProcessContext setProgress");
  },
  setGridState: () => {
    console.log("Error ProcessContext setGridBoolean");
  },
  setFilterOpen: () => {
    console.log("Error ProcessContext setFilterOpen");
  },
  searchModels: () => {
    console.log("Error ProcessContext searchModels");
  },
});

export const ProcessView: React.FC<Props> = (props) => {
  const { guideAnswers, isLoggedInResponse } = props;
  const navigate = useNavigate();
  const { cart, loadCart, updateCart } = useCart();
  const [state, setState] = useState<IProcessState>(initialProcessState(cart));
  const { grid, items, progress, activeItemIndex, filterOpen } = state;

  const { filters: filtersEmpty } = useFilter();
  const {
    data,
    loadAllData,
    loadMaterialData,
    loadModelData,
    loadPostProcessingData,
  } = useProcessData();
  const { filters: filtersData, materials, models, postProcessing } = data;
  const filters: IFilterItem[] =
    filtersData.length === 0 ? filtersEmpty : filtersData;

  useEffect(() => {
    loadAllData(filtersEmpty);
  }, []);

  useEffect(() => {
    if (isLoggedInResponse === true) {
      loadCart();
    }
  }, [isLoggedInResponse]);

  useEffect(() => {
    if (
      cart !== undefined &&
      (cart.length > 1 || (cart.length > 0 && checkForSelectedData(cart)))
    )
      setState((prevState) => ({ ...prevState, items: cart }));
  }, [cart]);

  useEffect(() => {
    updateCart(items);
  }, [items]);

  const loadData = (title?: string) => {
    // console.log("Process| loadData", title);
    switch (title?.toLocaleLowerCase()) {
      case "model":
        loadModelData(filters);
        break;
      case "material":
        loadMaterialData(filters);
        break;
      case "postprocessing":
        loadPostProcessingData(filters);
        break;

      default:
        loadAllData(filters);
        break;
    }
  };
  const searchModels = (name: string): void => {
    console.log("Process | searchModels |", name);
    setState((prevState) => ({ ...prevState, searchText: name }));
  };
  const applyFilters = (filterItemList: IFilterItem[]): void => {
    console.log("Process | applyFilters |", filterItemList);
    loadAllData(filterItemList);
  };
  const startNewProcess = (): void => {
    setState((prevState) => ({ ...prevState, items: [{}] }));
  };
  const createProcessItem = (model?: IModel): void => {
    console.log("Process | createProcessItem |", model);

    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        {
          title:
            model === undefined
              ? "Item " + (prevState.items.length + 1)
              : model.title,
          model: model,
        },
      ],
      progress: getProgressByPath("model"),
      activeItemIndex: prevState.items.length,
    }));
  };
  const deleteProcessItem = (index: number): void => {
    console.log("Process | deleteProcessItem |", index);

    setState((prevState) => ({
      ...prevState,
      items: [...prevState.items.filter((item, _index) => _index !== index)],
      activeItemIndex: -1,
    }));
    navigate("/process/upload");
  };
  const selectProcessItem = (index: number): void => {
    console.log(
      "Process | selectProcessItem |",
      index === -1 ? "Upload" : index
    );

    setState((prevState) => ({
      ...prevState,
      activeItemIndex: index,
      progress: index === -1 ? getProgressByPath("upload") : prevState.progress,
    }));

    if (index === -1) {
      navigate("/process/upload");
    } else {
      navigate("/process/model");
    }
  };
  const setGridState = (grid: boolean): void => {
    setState((prevState) => ({ ...prevState, grid }));
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
  const setProgress = (path: string): void => {
    // console.log("Process| setProgress", path);
    setState((prevState) => ({
      ...prevState,
      progress: getProgressByPath(path),
      activeItemIndex: path === "upload" ? -1 : prevState.activeItemIndex,
    }));
    if (filters.length > 0) loadData(path);
  };
  const selectModel = (model: IModel): void => {
    console.log("Process | selectModel |", model);
    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items.filter((item, index) => index < activeItemIndex),
        { ...prevState.items[activeItemIndex], model },
        ...prevState.items.filter((item, index) => index > activeItemIndex),
      ],
    }));
    navigate("/process/material");
  };
  const selectMaterial = (material: IMaterial): void => {
    console.log("Process | selectMaterial |", material);

    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items.filter((item, index) => index < activeItemIndex),
        { ...prevState.items[activeItemIndex], material },
        ...prevState.items.filter((item, index) => index > activeItemIndex),
      ],
    }));
    navigate("/process/postprocessing");
  };
  const selectPostProcessings = (postProcessings: IPostProcessing[]): void => {
    console.log("Process | selectPostProcessing |", postProcessings);

    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items.filter((item, index) => index < activeItemIndex),
        { ...prevState.items[activeItemIndex], postProcessings },
        ...prevState.items.filter((item, index) => index > activeItemIndex),
      ],
    }));
    // navigate("/cart");
  };
  const setFilterOpen = (open: boolean): void => {
    setState((prevState) => ({ ...prevState, filterOpen: open }));
  };
  const deselectModel = () => {
    console.log("Process | removeModel |");
    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items.filter((item, index) => index < activeItemIndex),
        { ...prevState.items[activeItemIndex], model: undefined },
        ...prevState.items.filter((item, index) => index > activeItemIndex),
      ],
    }));
  };
  const deselectMaterial = () => {
    console.log("Process | deselectMaterial |");
    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items.filter((item, index) => index < activeItemIndex),
        { ...prevState.items[activeItemIndex], material: undefined },
        ...prevState.items.filter((item, index) => index > activeItemIndex),
      ],
    }));
  };

  return (
    <ProcessContext.Provider
      value={{
        processState: state,
        createProcessItem,
        deleteProcessItem,
        selectProcessItem,
        setProgress,
        setGridState,
        setFilterOpen,
        searchModels,
      }}
    >
      <div className="relativ flex flex-col xl:flex-row gap-10">
        <Filter
          setFilterOpen={setFilterOpen}
          filterOpen={filterOpen}
          filters={filters}
          applyFilters={applyFilters}
          guideAnswers={guideAnswers}
          progress={progress}
        />
        <div className="flex flex-col gap-10 max-w-6xl p-5 w-full xl:w-[1152px]">
          <Header />
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
                  processState={state}
                  models={models}
                  selectedModel={
                    items[activeItemIndex] !== undefined &&
                    items[activeItemIndex].model !== undefined
                      ? items[activeItemIndex].model
                      : undefined
                  }
                  selectModel={selectModel}
                  deselectModel={deselectModel}
                  setProgress={setProgress}
                />
              }
            />
            <Route
              path="upload"
              element={
                <ModelUpload
                  createProcessItem={createProcessItem}
                  setProgress={setProgress}
                />
              }
            />
            <Route
              path="material"
              element={
                <MaterialCatalog
                  deselectMaterial={deselectMaterial}
                  selectedMaterial={
                    items[activeItemIndex] !== undefined &&
                    items[activeItemIndex].material !== undefined
                      ? items[activeItemIndex].material
                      : undefined
                  }
                  processState={state}
                  materials={materials}
                  selectMaterial={selectMaterial}
                  setProgress={setProgress}
                />
              }
            />
            <Route
              path="postprocessing"
              element={
                <PostProcessingView
                  processState={state}
                  postprocessings={postProcessing}
                  selectPostProcessings={selectPostProcessings}
                  setProgress={setProgress}
                />
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </ProcessContext.Provider>
  );
};
