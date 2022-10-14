import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import {Manufacturer} from "../../../Interface";
import React, {useState} from "react";

import "../../../styles.scss";
import "../../ProcessView.scss";
import "../Manufacturer.scss";
import {ManufacturerCatalogCard} from "./ManufacturerCatalogCard";

const testManufacturerList:Manufacturer[] = [
  {name:"Hersteller 1",propList:["Eigenschaft 1","Eigenschaft 2"],certificateList:["Zertifikat 1","Zertifikat 2"]},
  {name:"Hersteller 2",propList:["Eigenschaft 1","Eigenschaft 2"],certificateList:["Zertifikat 1","Zertifikat 2"]},
  {name:"Hersteller 3",propList:["Eigenschaft 1","Eigenschaft 2"],certificateList:["Zertifikat 1","Zertifikat 2"]},
  {name:"Hersteller 4",propList:["Eigenschaft 1","Eigenschaft 2"],certificateList:["Zertifikat 1","Zertifikat 2"]},
  {name:"Hersteller 5",propList:["Eigenschaft 1","Eigenschaft 2"],certificateList:["Zertifikat 1","Zertifikat 2"]}
]

interface Props {
  setProgressState: (progressStateIndex:number)=>void,
  selectManufacturer: (manufacturer:Manufacturer)=>void,
}

export const ManufacturerCatalog = ({setProgressState,selectManufacturer}:Props) => {
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
          <input type="text" className="input-field" placeholder="Herstellen lassen bei..."/>
          <div className="settings button light"><SettingsIcon/></div>
          <div className="search button dark"><SearchIcon/></div>
        </div>
        <div className="filter">
          <div className={getFilterClassName(0)} onClick={e=>handleClickFilter(0)}>Top Hersteller</div>
          <div className={getFilterClassName(1)} onClick={e=>handleClickFilter(1)}>Entfernung</div>
          <div className={getFilterClassName(2)} onClick={e=>handleClickFilter(2)}>Geschwindigkeit</div>
          <div className={getFilterClassName(3)} onClick={e=>handleClickFilter(3)}>Preis</div>
        </div>
        <div className="manufacturer-cards">
          {testManufacturerList.map((manufacturer:Manufacturer,index:number)=>(
            <ManufacturerCatalogCard key={index} manufacturer={manufacturer} setProgressState={setProgressState} selectManufacturer={selectManufacturer}/>
          ))}
        </div>
      </div>
    </div>
  );
}