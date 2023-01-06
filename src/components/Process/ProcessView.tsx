import { Wizard } from "../../components/Process/Wizard/Wizard";
import { useEffect, useState } from "react";

import "../../styles.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ModelUpload } from "./Model/ModelUpload";
import { ModelCatalog } from "./Model/ModelCatalog";
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
import { ManufacturerCatalog } from "./Manufacturer/ManufacturerCatalog";
import { Overview } from "./Overview/Overview";
import Filter from "../../components/Process/Filter/Filter";
import NewProcess from "./NewProcess";
import { Error } from "../Error/Error";
import {
  IFilterAnswer,
  IFilterItem,
  IFilterItemOption,
} from "./Filter/Interface";
import { IGuideAnswer } from "../Guide/Interface";

import _filter from "./Filter/FilterQuestions.json";
import useFilter from "../../hooks/useFilter";
const filter = _filter as IFilterItem[];

interface Props {
  setProcessList?(processList: IProcess[]): void;
  processList?: IProcess[];
  guideAnswers: IGuideAnswer[];
}

const calcNextFreeId = (processList: IProcess[]): number => {
  let nextFreeId: number = 0;
  processList.forEach((process: IProcess) => {
    if (process.processId > nextFreeId) nextFreeId = process.processId;
  });
  return nextFreeId + 1;
};

const generateEmptyAnswers = (): IFilterAnswer[] => {
  let answers: IFilterAnswer[] = [];
  filter.forEach((filterItem: IFilterItem) => {
    filterItem.options.forEach((filterOption: IFilterItemOption) => {
      answers.push({
        categoryId: filterItem.id,
        filterId: filterOption.id,
        title: filterOption.title,
        value: { checked: false },
      });
    });
  });

  return answers;
};

const calcFilterWithGuideAnswers = (
  guideAnswers: IGuideAnswer[]
): IFilterAnswer[] => {
  let answers: IFilterAnswer[] = generateEmptyAnswers();

  guideAnswers.forEach((answer: IGuideAnswer, index: number) => {
    answers.forEach(
      (filterAnswer: IFilterAnswer, filterAnswerIndex: number) => {
        if (answer.filter === filterAnswer.title) {
          answers[filterAnswerIndex].value = answer.value;
          answers[filterAnswerIndex].value.checked = true;
        }
      }
    );
  });

  return answers;
};

export const ProcessView = ({
  setProcessList,
  processList,
  guideAnswers,
}: Props) => {
  const { getModels } = useFilter();
  const maxExpandedShoppingCardItem = 2;
  const navigate = useNavigate();
  const [state, setState] = useState<IProcessState>({
    progressState: 0,
    activeProcess: 0,
    activeProcessList: [0],
    processList: processList ? processList : [{ processId: 0 }],
    nextID: processList ? calcNextFreeId(processList) : 1,
    filter: filter,
    filterAnswers: calcFilterWithGuideAnswers(guideAnswers),
  });
  const [models, setModels] = useState<IModel[]>([]);

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
      filter: filter,
      filterAnswers: generateEmptyAnswers(),
    });
    if (setProcessList !== undefined) setProcessList([]);
  };

  const setFilterItems = (filter: IFilterItem[]) => {
    setState((prevState) => ({ ...prevState, filter }));
  };

  const setFilterAnswer = (newfilterAnswer: IFilterAnswer) => {
    setState((prevState) => ({
      ...prevState,
      filterAnswers: [
        ...prevState.filterAnswers.filter(
          (filterAnswer: IFilterAnswer) =>
            filterAnswer.categoryId < newfilterAnswer.categoryId
        ),
        ...prevState.filterAnswers.filter(
          (filterAnswer: IFilterAnswer) =>
            filterAnswer.categoryId === newfilterAnswer.categoryId &&
            filterAnswer.filterId < newfilterAnswer.filterId
        ),
        newfilterAnswer,
        ...prevState.filterAnswers.filter(
          (filterAnswer: IFilterAnswer) =>
            filterAnswer.categoryId === newfilterAnswer.categoryId &&
            filterAnswer.filterId > newfilterAnswer.filterId
        ),
        ...prevState.filterAnswers.filter(
          (filterAnswer: IFilterAnswer) =>
            filterAnswer.categoryId > newfilterAnswer.categoryId
        ),
      ],
    }));
  };

  const setFilterAnswers = (filterAnswers: IFilterAnswer[]) => {
    setState((prevState) => ({ ...prevState, filterAnswers }));
  };

  const applyFilters = () => {
    setModels(getModels(state.filterAnswers));
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
      <Filter
        filter={state.filter}
        filterAnswers={state.filterAnswers}
        applyFilters={applyFilters}
        setFilterAnswer={setFilterAnswer}
        setFilterItems={setFilterItems}
        setFilterAnswers={setFilterAnswers}
      />
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
                    models={models}
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
