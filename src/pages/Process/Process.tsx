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
import { Error } from "../Error/Error";
import useFilter from "./Filter/hooks/useFilter";
import ProcessHeader from "./Header/Header";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/Loading";
import ProcessFilter, { IFilterItem } from "./Filter/Filter";
import { ProcessModelUpload } from "./Model/components/Upload";
import useCart from "@/hooks/useCart";
import { checkForSelectedData } from "@/services/utils";
import useOnQueryDataChange from "@/hooks/useOnQueryDataChange";
import useSyncCart from "./hooks/useSyncCart";
import logger from "@/hooks/useLogger";
import {
  IProcessContext,
  IProcessItem,
  IProcessState,
  IProgress,
} from "./types";
import ProcessHeaderCart from "./Header/Cart/Cart";

interface Props {
  selectedProgressItem?: { index: number; progress: string };
  guideAnswers: IFilterItem[];
}

const initialProcessState = (itemTitle?: string): IProcessState => ({
  items: [{ title: itemTitle === undefined ? "Item 1" : itemTitle }],
  activeItemIndex: 0,
  searchText: "",
  grid: true,
  progress: { title: "Modell finden", link: "model", type: 0 },
  filterOpen: false,
  hasChanged: false,
});

export const ProcessContext = createContext<IProcessContext>({
  processState: initialProcessState(),
  createEmpytProcessItem: () => {
    logger("Error ProcessContext createProcessItem");
  },
  deleteProcessItem: () => {
    logger("Error ProcessContext deleteProcess");
  },
  selectProcessItem: () => {
    logger("Error ProcessContext selectProcess");
  },
  setProgress: () => {
    logger("Error ProcessContext setProgress");
  },
  setGridState: () => {
    logger("Error ProcessContext setGridBoolean");
  },
  setFilterOpen: () => {
    logger("Error ProcessContext setFilterOpen");
  },
  searchModels: () => {
    logger("Error ProcessContext searchModels");
  },
  setProcessItemTitle: () => {
    logger("Error ProcessContext setProcessItemTitle");
  },
});

export const Process: React.FC<Props> = (props) => {
  const { guideAnswers, selectedProgressItem } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [state, setState] = useState<IProcessState>(
    initialProcessState(`${t("Process.ProcessView.item")} 1`)
  );
  const setChangesFalse = () => {
    setState((prevState) => ({ ...prevState, hasChanged: false }));
  };
  const { cartQuery, updateCart } = useCart();
  const { data: cart, error } = cartQuery;
  const { hasChanged, grid, items, progress, activeItemIndex, filterOpen } =
    state;
  const { filtersQuery, updateFilters: filtersMutate } = useFilter();

  const onQueryDataChange = (data: IProcessItem[]) => {
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
  };
  useOnQueryDataChange(
    cartQuery,
    (cartQuery.data !== undefined && cartQuery.data.length > 1) ||
      (cartQuery.data.length > 0 && checkForSelectedData(cartQuery.data)),
    onQueryDataChange
  );
  useSyncCart(hasChanged, items, setChangesFalse);

  const searchModels = (name: string): void => {
    // logger("Process | searchModels |", name);
    setState((prevState) => ({ ...prevState, searchText: name }));
  };
  const applyFilters = (filterItemList: IFilterItem[]): void => {
    // logger("Process | applyFilters |", filterItemList);
    filtersMutate.mutate(filterItemList);
  };
  const startNewProcess = (): void => {
    setState((prevState) => ({
      ...prevState,
      items: [{ title: `${t("Process.ProcessView.item")} 1` }],
    }));
  };
  const createEmpytProcessItem = (): void => {
    // logger("Process | createEmpytProcessItem |", model);
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
    // logger("Process | createProcessItemFromModel |", model);
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
    // logger("Process | deleteProcessItem |", index);

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
    navigate("model");
  };
  const selectProcessItem = (index: number): void => {
    setState((prevState) => ({
      ...prevState,
      activeItemIndex: index,
      progress: index === -1 ? getProgressByPath("upload") : prevState.progress,
    }));

    if (index === -1) {
      navigate("upload");
    } else {
      navigate("model");
    }
  };
  const setGridState = (grid: boolean): void => {
    setState((prevState) => ({ ...prevState, grid }));
  };
  const getProgressByPath = (path: string): IProgress => {
    let progress: IProgress = {
      title: "Modell finden",
      link: "model",
      type: 0,
    };
    switch (path) {
      case "model":
        progress = {
          title: t("Process.ProcessView.path.model"),
          link: "model",
          type: 0,
        };
        break;
      case "upload":
        progress = {
          title: t("Process.ProcessView.path.upload"),
          link: "upload",
          type: 1,
        };
        break;
      case "material":
        progress = {
          title: t("Process.ProcessView.path.material"),
          link: "material",
          type: 0,
        };
        break;
      case "postprocessing":
        progress = {
          title: t("Process.ProcessView.path.postprocessing"),
          link: "postprocessing",
          type: 1,
        };
        break;
      default:
        progress = {
          title: t("Process.ProcessView.path.model"),
          link: "model",
          type: 1,
        };
        break;
    }
    return progress;
  };
  const setProgress = (path: string): void => {
    // logger("Process| setProgress", path);
    setState((prevState) => ({
      ...prevState,
      progress: getProgressByPath(path),
      activeItemIndex: prevState.activeItemIndex,
    }));
    // if (filtersQuery.data.length > 0) loadData(path);
  };
  const selectModel = (model: IModel): void => {
    // logger("Process | selectModel |", model);
    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items.filter((item, index) => index < activeItemIndex),
        { ...prevState.items[activeItemIndex], model, title: model.title },
        ...prevState.items.filter((item, index) => index > activeItemIndex),
      ],
      hasChanged: true,
    }));
    navigate("material");
  };
  const selectMaterial = (material: IMaterial): void => {
    // logger("Process | selectMaterial |", material);

    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items.filter((item, index) => index < activeItemIndex),
        { ...prevState.items[activeItemIndex], material },
        ...prevState.items.filter((item, index) => index > activeItemIndex),
      ],
      hasChanged: true,
    }));
    navigate("postprocessing");
  };
  const selectPostProcessings = (postProcessings: IPostProcessing[]): void => {
    // logger("Process | selectPostProcessing |", postProcessings);

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
    // logger("Process | removeModel |");
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
    // logger("Process | deselectMaterial |");
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
  const setProcessItemTitle = (title: string, _index: number) => {
    // logger("Process | setItemTitle |");
    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items.filter((item, index) => index < _index),
        { ...prevState.items[_index], title: title },
        ...prevState.items.filter((item, index) => index > _index),
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
        <div className="relativ flex w-full flex-col gap-5 xl:flex-row">
          <ProcessFilter
            setFilterOpen={setFilterOpen}
            filterOpen={filterOpen}
            filters={filtersQuery.data}
            applyFilters={applyFilters}
            guideAnswers={guideAnswers}
            progress={progress}
          />
          <div className="flex w-full flex-col gap-5 ">
            <ProcessHeader />
            <Routes>
              <Route index element={<Navigate to="model" />} />
              <Route
                path="new"
                element={<ProcessNewItem startNewProcess={startNewProcess} />}
              />
              <Route
                path="model"
                element={
                  <ProcessModel
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
                  <ProcessModelUpload
                    activeItemIndex={activeItemIndex}
                    createProcessItemFromModels={createProcessItemFromModels}
                    setProgress={setProgress}
                  />
                }
              />
              <Route
                path="material"
                element={
                  <ProcessMaterial
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
                  <ProcessPostProcessing
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
          <ProcessHeaderCart />
        </div>
      </LoadingSuspense>
    </ProcessContext.Provider>
  );
};
