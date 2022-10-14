import "../../ProcessView.scss"
import "../Manufacturer.scss"
import {Manufacturer} from "../../../Interface";
import React from "react";

interface Props {
  manufacturer:Manufacturer
  setProgressState: (progressStateIndex:number)=>void
  selectManufacturer: (manufacturer:Manufacturer)=>void
}

export const ManufacturerCatalogCard = ({manufacturer,setProgressState,selectManufacturer}:Props) => {

  const handleAddClick = () => {
    selectManufacturer(manufacturer);
    setProgressState(3);
  }

  return(
    <div className="manufacturer-card">
      <img className="manufacturer-card-map" src={require("../../../images/map_placeholder.png")} alt="Manufacturer"/>
      <div className="manufacturer-card-column">
        <div className="manufacturer-card-headline">{manufacturer.name}</div>
        <div>
        {manufacturer.certificateList?.map((certificate:string,index:number)=>(
          <div className="manufacturer-card-text" key={index}>{certificate}</div>
        ))}
        </div>
        <div>
        {manufacturer.propList?.map((prop:string,index:number)=>(
          <div className="manufacturer-card-text" key={index}>{prop}</div>
        ))}
        </div>
      </div>
      <div className="manufacturer-card-column">
        <div className="manufacturer-card-text">Entfernung</div>
        <div className="manufacturer-card-text-secondary">{manufacturer.distance?manufacturer.distance:"000"} KM</div>
        <div className="manufacturer-card-text">Produktionszeit</div>
        <div className="manufacturer-card-text-secondary">{manufacturer.productionTime?manufacturer.productionTime:"000"} Tage</div>
        <div className="manufacturer-card-text">Lieferzeit</div>
        <div className="manufacturer-card-text-secondary">{manufacturer.deliverTime?manufacturer.deliverTime:"000"} Tage</div>
        <div className="manufacturer-card-text">Gesamtzeit</div>
        <div className="manufacturer-card-text-secondary">{(manufacturer.productionTime && manufacturer.deliverTime)?(manufacturer.productionTime + manufacturer.deliverTime):"000"} Tage</div>
      </div>
      <div className="manufacturer-card-column">
        <img className="firm-logo" src={require("../../../images/firm_logo_placeholder.png")} alt="Firm Logo"/>
        <div className="manufacturer-card-text">Preis: <b>$$$</b></div>
        <div className="manufacturer-card-button dark" onClick={handleAddClick}>hinzufügen</div>
      </div>
    </div>
  );
}