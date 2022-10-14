import "../../../styles.scss";
import "../../ProcessView.scss"
import React, {useState} from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import {Model} from "../../../Interface";
import {ModelCatalogCard} from "./ModelCatalogCard";

const testModelList:Model[] = [
  {file:new File([],"text0.stl")},
  {file:new File([],"text1.stl")},
  {file:new File([],"text2.stl")},
  {file:new File([],"text3.stl")},
  {file:new File([],"text4.stl")}
]

interface Props {
  selectModel: (model:Model)=>void,
  setProgressState: (progressStateIndex:number)=>void
}

export const ModelCatalog = ({selectModel,setProgressState}:Props) => {
  const [modelList,setModelList] = useState<Model[]>(testModelList);

  return (
    <div className="process-content-container">
      <div className="catalog-container">
        <div className="user-input">
          <input type="text" className="input-field" placeholder="Ich benötige..." autoFocus/>
          <div className="settings button light"><SettingsIcon/></div>
          <div className="search button dark"><SearchIcon/></div>
        </div>
        <div className="model-cards">
          {modelList.map((model:Model,index:number)=>(
            <ModelCatalogCard setProgressState={setProgressState} selectModel={selectModel} model={model} key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
}