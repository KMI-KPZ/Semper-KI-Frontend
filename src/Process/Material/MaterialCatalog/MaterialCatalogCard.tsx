import "../../ProcessView.scss"
import "../Material.scss"
import {Material} from "../../../Interface";
import React from "react";

interface Props {
  material:Material
  setProgressState: (progressStateIndex:number)=>void
  selectMaterial: (material:Material)=>void
}

export const MaterialCatalogCard = ({material,setProgressState,selectMaterial}:Props) => {

    const handleAddClick = () => {
      selectMaterial(material);
      setProgressState(2);
    }

    return(
      <div className="material-card">
        <img className="material-card-image" src={require("../../../images/material_placeholder.png")} alt="Material"/>
        <div className="material-card-column">
          <div className="material-card-headline">{material.name}</div>
        </div>
        <div className="material-card-column">
          {material.propList?.map((spec:string, index:number)=>(
            <div className="material-card-text" key={index}>{spec}</div>
          ))}
        </div>
        <div className="material-card-column">
          <div className="material-card-text">Preis: <b>$$$</b></div>
        </div>
        <div className="material-card-button dark" onClick={handleAddClick}>hinzufügen</div>
      </div>
    );
}