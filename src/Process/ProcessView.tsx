import {Wizard} from "./Wizard/Wizard";
import {useState} from "react";

import "../styles.scss";
import {Route, Routes, useNavigate} from "react-router-dom";
import {ModelUpload} from "./Model/ModelUpload";
import {ModelCatalog} from "./Model/ModelCatalog/ModelCatalog";
import {Error} from "../Error";
import {ShoppingCart} from "./ShoppingCart/ShoppingCart";
import {
  Material,
  Model,
  PostProcessing,
  Process,
  ProcessState,
  Manufacturer,
  Additive,
} from "../Interface";
import {MaterialCatalog} from "./Material/MaterialCatalog/MaterialCatalog";
import {PostProcessingView} from "./PostProcessing/PostProcessingView";
import {AdditiveView} from "./Additive/AdditiveView";
import {ModelView} from "./Model/ModelView";
import {MaterialView} from "./Material/MaterialView";
import {ManufacturerCatalog} from "./Manufacturer/ManufacturerCatalog/ManufacturerCatalog";
import {Overview} from "./Overview/Overview";

export const ProcessView = () => {
  const [state,setState] = useState<ProcessState>({progressState:0,activeProcess:0,processList:[{processId:0}],nextID:1});
  const navigate = useNavigate();

  // const {data:user,isLoading:userIsLoading,error:userLoadingError} = useFetch<User>({url:"http://localhost:3001/userList"});
  // const {data:order,isLoading:orderIsLoading,error:orderLoadingError} = useFetch<Order>({url:"http://localhost:3001/orderList"});



  const setProgressState = (progressStateIndex:number):void => {
    let link;

    switch (progressStateIndex) {
      case 0:   link="/Process/Model/Catalog";     break;
      case 1:   link="/Process/Material/Catalog";  break;
      case 2:   link="/Process/Manufacturer";      break;
      case 3:   link="/Process/PostProcessing";    break;
      case 4:   link="/Process/Additive";          break;
      case 5:   link="/Process/Overview";          break;
      default:  link="/Process/Overview";          break;
    }
    console.log("set Progress State",link,progressStateIndex);
    navigate(link);
    setState(prevState => ({...prevState,progressState:progressStateIndex}));
  }

  const addProcess = (process:Process):void => {
    console.log("add Process",process);
    setState(prevState => ({
      ...prevState,
      processList:[...prevState.processList,process],
      nextID:(state.nextID+1),
      activeProcess:(prevState.processList.length === 0)?(process.processId):(prevState.activeProcess)
    }));
  }

  const addProcessList = (processList:Process[]):void => {
    console.log("add Process List",processList);
    setState(prevState => ({
      ...prevState,
      processList:[...prevState.processList,...processList],
      nextID:(state.nextID+processList.length),
      activeProcess:(prevState.processList.length === 0)?(processList[0].processId):(prevState.activeProcess),
    }));
  }

  const deleteProcess = (processId:number):void => {
    console.log("delete Process",processId);
    setState(prevState => ({
      ...prevState,
      activeProcess: prevState.activeProcess !== processId ? prevState.activeProcess :
        (prevState.processList.filter((process:Process)=>(process.processId!==processId)).length === 0 ? 0 : prevState.processList.filter((process:Process)=>(process.processId!==processId))[0].processId),
      processList:prevState.processList.filter((process:Process)=>(process.processId!==processId))
    }));
  }

  const selectProcess = (processId:number):void => {
    console.log("select Process",processId);
    setState(prevState => ({
      ...prevState,
      activeProcess:processId
    }))
  }

  const getActiveProcess = ():Process|undefined => {
    return state.processList.filter((process:Process)=>(process.processId===state.activeProcess))[0];
  }

  const selectModel = (model:Model):void => {
    setState(prevState => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter((process:Process)=>(process.processId<prevState.activeProcess)),
        {
          ...prevState.processList.filter((process:Process)=>(process.processId===prevState.activeProcess))[0],
          model:model
        },
        ...prevState.processList.filter((process:Process)=>(process.processId>prevState.activeProcess))
      ]
    }))
  }

  const selectMaterial = (material:Material):void => {
    setState(prevState => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter((process:Process)=>(process.processId<prevState.activeProcess)),
        {
          ...prevState.processList.filter((process:Process)=>(process.processId===prevState.activeProcess))[0],
          material:material
        },
        ...prevState.processList.filter((process:Process)=>(process.processId>prevState.activeProcess))
      ]
    }))
  }

  const selectManufacturer= (manufacturer:Manufacturer):void => {
    setState(prevState => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter((process:Process)=>(process.processId<prevState.activeProcess)),
        {
          ...prevState.processList.filter((process:Process)=>(process.processId===prevState.activeProcess))[0],
          manufacturer:manufacturer
        },
        ...prevState.processList.filter((process:Process)=>(process.processId>prevState.activeProcess))
      ]
    }))
  }

  const selectPostProcessing= (postProcessing:PostProcessing):void => {
    setState(prevState => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter((process:Process)=>(process.processId<prevState.activeProcess)),
        {
          ...prevState.processList.filter((process:Process)=>(process.processId===prevState.activeProcess))[0],
          postProcessing:postProcessing
        },
        ...prevState.processList.filter((process:Process)=>(process.processId>prevState.activeProcess))
      ]
    }))
  }

  const selectAdditive = (additive:Additive):void => {
    setState(prevState => ({
      ...prevState,
      processList: [
        ...prevState.processList.filter((process:Process)=>(process.processId<prevState.activeProcess)),
        {
          ...prevState.processList.filter((process:Process)=>(process.processId===prevState.activeProcess))[0],
          additive:additive
        },
        ...prevState.processList.filter((process:Process)=>(process.processId>prevState.activeProcess))
      ]
    }))
  }

  return(
    <div className="container">
      <Wizard state={state} setProgressState={setProgressState}/>
      <div className="process-box">
        <div className={`process-content-box  ${state.progressState === 5 ? "full-width":""}`}>
          <Routes>
            <Route path="Model">
              <Route index                element={<ModelView model={getActiveProcess()?.model}/>}/>
              <Route path="Upload"        element={<ModelUpload state={state} addProcessList={addProcessList} setProgressState={setProgressState} selectProcess={selectProcess}/>}/>
              <Route path="Catalog"       element={<ModelCatalog setProgressState={setProgressState} selectModel={selectModel}/>}/>
            </Route>
            <Route path="Material">
              <Route index                element={<MaterialView material={getActiveProcess()?.material}/>}/>
              <Route path="Catalog"       element={<MaterialCatalog setProgressState={setProgressState} selectMaterial={selectMaterial}/>}/>
            </Route>
            <Route path="Manufacturer">
              <Route index                element={<ManufacturerCatalog setProgressState={setProgressState} selectManufacturer={selectManufacturer}/>}/>
            </Route>
            <Route path="PostProcessing"  element={<PostProcessingView state={state} setProgressState={setProgressState} selectPostProcessing={selectPostProcessing}/> }/>
            <Route path="Additive"        element={<AdditiveView setProgressState={setProgressState} state={state} selectAdditive={selectAdditive}/>}/>
            <Route path="Overview"        element={<Overview state={state} setProgressState={setProgressState} selectProcess={selectProcess}/>} />
            <Route path="*"               element={<Error/>}/>
          </Routes>
        </div>
        {state.progressState !== 5 &&
          <ShoppingCart setProgressState={setProgressState} state={state} addProcess={addProcess} deleteProcess={deleteProcess} selectProcess={selectProcess}/>
        }
      </div>
    </div>
  );
}