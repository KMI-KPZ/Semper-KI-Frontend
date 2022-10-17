import "../ProcessView.scss";
import "./Overview.scss";
import {Process} from "../../Interface";
import React from "react";

interface Props {
  expanded:boolean
  process:Process
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>,id:number)=>void
}

export const OverviewModelCard = ({process,expanded,onClick}:Props) => {

  const getModelCardExpanded = ():JSX.Element => {

    return (
      <div className="overview-model-card expanded" onClick={e=>onClick(e,process.id)}>
        <img className="model-card-img" src={require("../../images/model_placeholder.png")} alt="Model"/>
        {process.model?process.model.file.name:"noch kein Model gewählt"}
      </div>
    );
  }

  const getModelCardSmall = ():JSX.Element => {

    return (
      <div className="overview-model-card small" onClick={e=>onClick(e,process.id)}>
        <img className="model-card-img" src={require("../../images/model_placeholder.png")} alt="Model"/>
        {process.model?process.model.file.name:"noch kein Model gewählt"}
      </div>
    );
  }

  return(
   expanded ? getModelCardExpanded() : getModelCardSmall()
  );
}