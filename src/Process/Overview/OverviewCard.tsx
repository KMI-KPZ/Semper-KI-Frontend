import "../ProcessView.scss";
import "./Overview.scss";
import {Process} from "../../Interface";
import MinimizeIcon from "@mui/icons-material/Minimize";
import {DeleteForever} from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, {useState} from "react";
import {OverviewModelCard} from "./OverviewModelCard";

interface Props {
  processList:Process[],
  setProgressState: (progressStateIndex:number)=>void,
  selectProcess: (id:number)=>void
}

interface State {
  processExpanded:boolean,
  modelExpanded:boolean,
  manufacturerExpanded:boolean,
}

export const OverviewCard = ({processList,setProgressState,selectProcess}:Props) => {
    const [state,setState] = useState<State>({modelExpanded:false,manufacturerExpanded:false,processExpanded:true});

    const getManufacturerCardBoxClassName =           ():string => (`overview-card-box ${state.manufacturerExpanded ? "expanded":""}`)
    const getManufacturerCardBoxExpandIconClassName = ():string => (`overview-card-box-icon ${state.manufacturerExpanded ? "expanded":""}`)
    const getModelCardBoxClassName =                  ():string => (`overview-card-box ${state.modelExpanded ? "expanded":""}` )
    const getModelCardBoxExpandIconClassName =        ():string => (`overview-card-box-icon ${state.modelExpanded ? "expanded":""}`)


    const onClickModelCardExpandIcon = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      setState(prevState => ({...prevState,modelExpanded:!prevState.modelExpanded}));
    }

    const onClickManufacturerCardExpandIcon = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      setState(prevState => ({...prevState,manufacturerExpanded:!prevState.manufacturerExpanded}));
    }

    const onClickOverviewModelCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,id:number):void => {
      e.preventDefault();
      selectProcess(id);
      setProgressState(0);
    }

    const onClickMinimize = (e: React.MouseEvent<SVGSVGElement, MouseEvent>):void => {
      e.preventDefault();
      setState(prevState => ({...prevState,processExpanded:!prevState.processExpanded}));
    }

    return(
      <div className="overview-card">
        <div className="overview-card-header">
          <div className="overview-card-header left">
            <div className="headline">Bestellung #0000000</div>
            <div className="text">Datum: DD.MM.YYYY</div>
            <div className="text">Status: in Bearbeitung</div>
          </div>
          <div className="overview-card-header right">
            <MinimizeIcon  className="iconButton minimize" onClick={e=>onClickMinimize(e)}/>
            <DeleteForever className="iconButton close"  />
          </div>
        </div>
        {state.processExpanded &&
          <>
          <div className={getModelCardBoxClassName()} >
            <div className="overview-card-box-title">Modelle</div>
            <div className="overview-model-cards" >
            {processList.map((process:Process,index:number)=>(
                <OverviewModelCard process={process} key={index} expanded={state.modelExpanded} onClick={onClickOverviewModelCard}/>
            ))}
            </div>
            <div className="overview-card-box-icon-box" onClick={onClickModelCardExpandIcon}>
              <ExpandMoreIcon className={getModelCardBoxExpandIconClassName()} />
            </div>
          </div>
          <div className={getManufacturerCardBoxClassName()} >
            <div className="overview-card-box-title">Hersteller</div>
            <div className="overview-card-box-icon-box" onClick={onClickManufacturerCardExpandIcon}>
              <ExpandMoreIcon className={getManufacturerCardBoxExpandIconClassName()} />
            </div>
          </div>
          <div className="overview-card-row">
            Rechnung:
          </div>
          <div className="overview-card-footer">
            <div className="overview-card-footer-button">Bearbeiten</div>
            <div className="overview-card-footer-button">Löschen</div>
            <div className="overview-card-footer-button">Anfragen</div>
          </div>
        </>}
      </div>
    );
}