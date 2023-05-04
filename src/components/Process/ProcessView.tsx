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
import useCart from "../../hooks/useCart";
import { checkForSelectedData } from "../../services/utils";
import { useTranslation } from "react-i18next";
import LoadingSuspense from "../General/LoadingSuspense";

interface Props {
  selectedProgressItem?: { index: number; progress: string };
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
  hasChanged: boolean;
}

export interface IProcessContext {
  processState: IProcessState;
  createEmpytProcessItem(): void;
  deleteProcessItem(processId: number): void;
  selectProcessItem(index: number): void;
  setProgress(path: string): void;
  setGridState(grid: boolean): void;
  setFilterOpen(open: boolean): void;
  searchModels(name: string): void;
  setProcessItemTitle(title: string): void;
}
const initialProcessState = (): IProcessState => ({
  items: [{ title: "Item 1" }],
  activeItemIndex: 0,
  searchText: "",
  grid: true,
  progress: { title: "Modell finden", link: "/process/model", type: 0 },
  filterOpen: false,
  hasChanged: false,
});

export const ProcessContext = createContext<IProcessContext>({
  processState: initialProcessState(),
  createEmpytProcessItem: () => {
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
  setProcessItemTitle: () => {
    console.log("Error ProcessContext setProcessItemTitle");
  },
});

export const ProcessView: React.FC<Props> = (props) => {
  const { guideAnswers, isLoggedInResponse, selectedProgressItem } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [state, setState] = useState<IProcessState>(initialProcessState());
  const setChangesFalse = () => {
    setState((prevState) => ({ ...prevState, hasChanged: false }));
  };
  const { cartQuery, updateCart } = useCart();
  const { data: cart, error } = cartQuery;
  const { hasChanged, grid, items, progress, activeItemIndex, filterOpen } =
    state;
  const { filtersQuery, updateFilters: filtersMutate } = useFilter();
  useEffect(() => {
    if (
      cart !== undefined &&
      error === null &&
      (cart.length > 1 || (cart.length > 0 && checkForSelectedData(cart)))
    ) {
      setState((prevState) => ({
        ...prevState,
        items: cart,
        activeItemIndex:
          selectedProgressItem === undefined
            ? prevState.activeItemIndex
            : selectedProgressItem.index,
        progress:
          selectedProgressItem === undefined
            ? prevState.progress
            : getProgressByPath(selectedProgressItem.progress),
      }));
    }
  }, [cart]);

  useEffect(() => {
    if (hasChanged === true)
      updateCart.mutate(items, {
        onSuccess(data, variables, context) {
          setChangesFalse();
        },
      });
  }, [items, hasChanged]);

  const searchModels = (name: string): void => {
    // console.log("Process | searchModels |", name);
    setState((prevState) => ({ ...prevState, searchText: name }));
  };
  const applyFilters = (filterItemList: IFilterItem[]): void => {
    // console.log("Process | applyFilters |", filterItemList);
    filtersMutate.mutate(filterItemList);
  };
  const startNewProcess = (): void => {
    setState((prevState) => ({
      ...prevState,
      items: [{ title: `${t("Process.ProcessView.item")} 1` }],
    }));
  };
  const createEmpytProcessItem = (): void => {
    // console.log("Process | createEmpytProcessItem |", model);
    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        {
          title: `${t("Process.ProcessView.item")} ${
            prevState.items.length + 1
          }`,
        },
      ],
      progress: getProgressByPath("model"),
      activeItemIndex: prevState.items.length,
      hasChanged: true,
    }));
  };
  const createProcessItemFromModels = (
    models: IModel[],
    index: number
  ): void => {
    // console.log("Process | createProcessItemFromModel |", model);
    const createItems = (): IProcessItem[] => {
      return models
        .filter((item, index) => index > 0)
        .map((model) => ({ title: model.title, model: model }));
    };
    setState((prevState) => {
      return {
        ...prevState,
        items: [
          ...prevState.items.filter((item, _index) => _index < index),
          {
            ...prevState.items[index],
            model: models[0],
            title: models[0].title,
          },
          ...prevState.items.filter((item, _index) => _index > index),
          ...createItems(),
        ],
        progress: getProgressByPath("model"),
        activeItemIndex: index,
        hasChanged: true,
      };
    });
  };
  const deleteProcessItem = (index: number): void => {
    // console.log("Process | deleteProcessItem |", index);

    setState((prevState) => {
      let items = [
        ...prevState.items.filter((item, _index) => _index !== index),
      ];
      if (items.length === 0)
        items.push({ title: `${t("Process.ProcessView.item")} 1` });
      return {
        ...prevState,
        items,
        activeItemIndex: 0,
        hasChanged: true,
      };
    });
    navigate("/process/model");
  };
  const selectProcessItem = (index: number): void => {
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
        progress = {
          title: t("Process.ProcessView.path.model"),
          link: "/process/model",
          type: 0,
        };
        break;
      case "upload":
        progress = {
          title: t("Process.ProcessView.path.upload"),
          link: "/process/upload",
          type: 1,
        };
        break;
      case "material":
        progress = {
          title: t("Process.ProcessView.path.material"),
          link: "/process/material",
          type: 0,
        };
        break;
      case "postprocessing":
        progress = {
          title: t("Process.ProcessView.path.postprocessing"),
          link: "/process/postprocessing",
          type: 1,
        };
        break;
      default:
        progress = {
          title: t("Process.ProcessView.path.model"),
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
      activeItemIndex: prevState.activeItemIndex,
    }));
    // if (filtersQuery.data.length > 0) loadData(path);
  };
  const selectModel = (model: IModel): void => {
    // console.log("Process | selectModel |", model);
    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items.filter((item, index) => index < activeItemIndex),
        { ...prevState.items[activeItemIndex], model, title: model.title },
        ...prevState.items.filter((item, index) => index > activeItemIndex),
      ],
      hasChanged: true,
    }));
    navigate("/process/material");
  };
  const selectMaterial = (material: IMaterial): void => {
    // console.log("Process | selectMaterial |", material);

    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items.filter((item, index) => index < activeItemIndex),
        { ...prevState.items[activeItemIndex], material },
        ...prevState.items.filter((item, index) => index > activeItemIndex),
      ],
      hasChanged: true,
    }));
    navigate("/process/postprocessing");
  };
  const selectPostProcessings = (postProcessings: IPostProcessing[]): void => {
    // console.log("Process | selectPostProcessing |", postProcessings);

    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items.filter((item, index) => index < activeItemIndex),
        { ...prevState.items[activeItemIndex], postProcessings },
        ...prevState.items.filter((item, index) => index > activeItemIndex),
      ],
      hasChanged: true,
    }));
    // navigate("/cart");
  };
  const setFilterOpen = (open: boolean): void => {
    setState((prevState) => ({ ...prevState, filterOpen: open }));
  };
  const deselectModel = () => {
    // console.log("Process | removeModel |");
    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items.filter((item, index) => index < activeItemIndex),
        {
          ...prevState.items[activeItemIndex],
          model: undefined,
          title: `${t("Process.ProcessView.item")} ${activeItemIndex + 1}`,
        },
        ...prevState.items.filter((item, index) => index > activeItemIndex),
      ],
      hasChanged: true,
    }));
  };
  const deselectMaterial = () => {
    // console.log("Process | deselectMaterial |");
    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items.filter((item, index) => index < activeItemIndex),
        { ...prevState.items[activeItemIndex], material: undefined },
        ...prevState.items.filter((item, index) => index > activeItemIndex),
      ],
      hasChanged: true,
    }));
  };
  const setProcessItemTitle = (title: string) => {
    // console.log("Process | setItemTitle |");
    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items.filter((item, index) => index < activeItemIndex),
        { ...prevState.items[activeItemIndex], title: title },
        ...prevState.items.filter((item, index) => index > activeItemIndex),
      ],
      hasChanged: true,
    }));
  };

  return (
    <ProcessContext.Provider
      value={{
        processState: state,
        createEmpytProcessItem,
        deleteProcessItem,
        selectProcessItem,
        setProgress,
        setGridState,
        setFilterOpen,
        searchModels,
        setProcessItemTitle,
      }}
    >
      <LoadingSuspense query={filtersQuery}>
        <div className="relativ flex flex-col xl:flex-row gap-5 w-full p-5">
          <Filter
            setFilterOpen={setFilterOpen}
            filterOpen={filterOpen}
            filters={filtersQuery.data}
            applyFilters={applyFilters}
            guideAnswers={guideAnswers}
            progress={progress}
          />
          <div className="flex flex-col gap-5 w-full ">
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
                    filters={filtersQuery.data}
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
                    activeItemIndex={activeItemIndex}
                    createProcessItemFromModels={createProcessItemFromModels}
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
                    filters={filtersQuery.data}
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
                    filters={filtersQuery.data}
                    selectPostProcessings={selectPostProcessings}
                    setProgress={setProgress}
                  />
                }
              />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
      </LoadingSuspense>
    </ProcessContext.Provider>
  );
};
