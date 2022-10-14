import "../../../styles.scss";
import "../../ProcessView.scss"
import "../Material.scss"
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import React, {useState} from "react";
import {Material} from "../../../Interface";
import {MaterialCatalogCard} from "./MaterialCatalogCard";

const testMaterialList:Material[] = [
  {name:"Material 1",propList:["Eigenschaft 1","Eigenschaft 2"]},
  {name:"Material 2",propList:["Eigenschaft 1","Eigenschaft 2"]},
  {name:"Material 3",propList:["Eigenschaft 1","Eigenschaft 2"]},
  {name:"Material 4",propList:["Eigenschaft 1","Eigenschaft 2"]},
  {name:"Material 5",propList:["Eigenschaft 1","Eigenschaft 2"]}
]

interface Props {
  setProgressState: (progressStateIndex:number)=>void,
  selectMaterial: (material:Material)=>void,
}

export const MaterialCatalog = ({setProgressState,selectMaterial}:Props) => {
  const [materialList,setMaterialList] = useState<Material[]>(testMaterialList);
  const [filter,setFilter] = useState<number>(0);

  const getFilterClassName = (index:number):string => {
    return `filter-text ${filter === index ? "active" : ""}`;
  }

  const handleClickFilter = (index:number):void => {
    setFilter(index);
  }

  return(
    <div className="process-content-container">
      <div className="catalog-container">
        <div className="user-input">
          <input type="text" className="input-field" placeholder="Herstellen aus..."/>
          <div className="settings button light"><SettingsIcon/></div>
          <div className="search button dark"><SearchIcon/></div>
        </div>
        <div className="filter">
          <div className={getFilterClassName(0)} onClick={e=>handleClickFilter(0)}>Top Material</div>
          <div className={getFilterClassName(1)} onClick={e=>handleClickFilter(1)}>Plastik</div>
          <div className={getFilterClassName(2)} onClick={e=>handleClickFilter(2)}>Metall</div>
          <div className={getFilterClassName(3)} onClick={e=>handleClickFilter(3)}>Keramik/Glaß</div>
        </div>
        <div className="material-cards">
          {materialList.map((material:Material,index:number)=>(
            <MaterialCatalogCard setProgressState={setProgressState} selectMaterial={selectMaterial}  material={material} key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
}