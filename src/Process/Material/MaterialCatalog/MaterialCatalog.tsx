import "../../../styles.scss";
import "../../ProcessView.scss"
import "../Material.scss"
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import React, {useState} from "react";
import {Material} from "../../../Interface";
import {MaterialCatalogCard} from "./MaterialCatalogCard";
import {useFetch} from "../../../Hooks/useFetch";

interface Props {
  setProgressState: (progressStateIndex:number)=>void,
  selectMaterial: (material:Material)=>void,
}

export const MaterialCatalog = ({setProgressState,selectMaterial}:Props) => {
  const {data:materialList,isLoading:materialIsLoading,error:materialLoadingError} = useFetch<Material>({url:"http://localhost:3001/materialList"});
  const [filter,setFilter] = useState<number>(0);

  const getFilterClassName = (index:number):string => {
    return `filter-text ${filter === index ? "active" : ""}`;
  }

  const handleClickFilter = (e:React.MouseEvent<HTMLDivElement,MouseEvent>,index:number):void => {
    e.preventDefault();
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
          <div className={getFilterClassName(0)} onClick={e=>handleClickFilter(e,0)}>Top Material</div>
          <div className={getFilterClassName(1)} onClick={e=>handleClickFilter(e,1)}>Plastik</div>
          <div className={getFilterClassName(2)} onClick={e=>handleClickFilter(e,2)}>Metall</div>
          <div className={getFilterClassName(3)} onClick={e=>handleClickFilter(e,3)}>Keramik/Glaß</div>
        </div>
        {materialLoadingError &&
          <div>Fehler beim laden der Materialien
            <br/>Error: {materialLoadingError.message}
          </div>}
        {(materialIsLoading || !materialList) && !materialLoadingError && <div>Materialien laden...</div>}
        {!materialIsLoading && materialList && !materialLoadingError &&
          <div className="material-cards">
            {materialList.slice(0,5).map((material:Material,index:number)=>(
              <MaterialCatalogCard setProgressState={setProgressState} selectMaterial={selectMaterial}  material={material} key={index}/>
            ))}
          </div>}
      </div>
    </div>
  );
}