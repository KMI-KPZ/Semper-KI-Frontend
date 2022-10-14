import "./ShoppingCart.scss";
import React, {ReactNode, useState} from "react";
import {Process, Specification} from "../../Interface";
import {DeleteForever} from "@mui/icons-material";
import MinimizeIcon from '@mui/icons-material/Minimize';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  deleteShoppingCartItem: (index:number)=>void,
  process:Process,
  isActiveProcess:boolean
  selectProcess: (id:number) => void,
  setProgressState: (progressStateIndex:number)=>void
}

interface State {
  expanded:boolean
}

export const ShoppingCartItem = ({deleteShoppingCartItem,process,isActiveProcess,selectProcess,setProgressState}:Props) => {
    const [state,setState] = useState<State>({expanded:true});

    const handleClickDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      e.stopPropagation();
      deleteShoppingCartItem(process.id);
      setExpand(true);
    }

    const handleClickEdit = (e: React.MouseEvent<SVGSVGElement, MouseEvent>,progressStateIndex:number) => {
      e.stopPropagation();
      selectProcess(process.id);
      setProgressState(progressStateIndex);
    }

    const handleClickProcess = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      selectProcess(process.id);
      setExpand(true);
    }

    const handleCLickProp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,progressStateIndex:number) => {
      e.stopPropagation();
      selectProcess(process.id);
      setProgressState(progressStateIndex);
    }

    const handleClickNextAdd = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,progressStateIndex:number) => {
      e.stopPropagation();
      selectProcess(process.id);
      setProgressState(progressStateIndex);
      setExpand(true);
    }

    const renderNextProcessAddButton = ():ReactNode => {
      let buttonName:string="",stateIndex:number=0;
      if(!process.model)                {buttonName = "Modell";         stateIndex=0;}
      else if(!process.material)        {buttonName = "Material";       stateIndex=1;}
      else if(!process.manufacturer)    {buttonName = "Hersteller";     stateIndex=2;}
      else if(!process.postProcessing)  {buttonName = "Nachbearbeitung";stateIndex=3;}
      else if(!process.additive)        {buttonName = "Zusatz";         stateIndex=4;}

      return <div className="addProgressButton" onClick={e=>handleClickNextAdd(e,stateIndex)}>{buttonName} Hinzufügen</div>
    }

    const handleHideClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      e.stopPropagation();
      setState(prevState => ({...prevState,expanded:!prevState.expanded}));
    }

    const setExpand = (expand:boolean):void => {
      setState(prevState => ({...prevState,expanded:expand}));
    }

    return(
      <div className={`shoppingCartItem pointer ${isActiveProcess ? "active" : ""}`} onClick={handleClickProcess}>
        <div className="shoppingCardItemHeader">
          { process.model && !state.expanded &&
            <div className="shoppingCardItem-text">{process.model.file.name}</div>
          }
          <MinimizeIcon  className="iconButton minimize" onClick={handleHideClick}/>
          <DeleteForever className="iconButton close" onClick={handleClickDelete} />
        </div>
        {process.model && state.expanded &&
          <div className="Section">
            <div className="Header">
              <EditIcon className="iconButton" onClick={e=>handleClickEdit(e,0)}/>
              Modell
            </div>
            <div className="Text" onClick={e=>handleCLickProp(e,0)}>{process.model.file.name}</div>
          </div>
        }
        {process.material && state.expanded &&
          <div className="Section">
            <div className="Divider"/>
            <div className="Header">
              <EditIcon className="iconButton" onClick={e=>handleClickEdit(e,1)}/>
              Material/Verfahren
            </div>
            <div className="Text" onClick={e=>handleCLickProp(e,1)}>{process.material.name}</div>
          </div>
        }
        {process.manufacturer && state.expanded &&
          <div className="Section">
            <div className="Divider"/>
            <div className="Header">
              <EditIcon className="iconButton" onClick={e=>handleClickEdit(e,2)}/>
              Hersteller
            </div>
            <div className="Text" onClick={e=>handleCLickProp(e,2)}>{process.manufacturer.name}</div>
          </div>
        }
        {process.postProcessing && state.expanded &&
          <div className="Section">
            <div className="Divider"/>
            <div className="Header">
              <EditIcon className="iconButton" onClick={e=>handleClickEdit(e,3)}/>
              Nachbearbeitung
            </div>
            {process.postProcessing && process.postProcessing.specificationList &&
              <div className="Text" onClick={e=>handleCLickProp(e,3)}>
                {process.postProcessing.specificationList.map((spec:Specification,index:number)=>(
                  <div key={index}>{spec.name} {spec.value} {spec.unit} + {spec.price}</div>
                ))}
              </div>
            }
          </div>
        }
        {process.additive && state.expanded &&
          <div className="Section">
            <div className="Divider"/>
            <div className="Header">
              <EditIcon className="iconButton" onClick={e=>handleClickEdit(e,4)}/>
              Zusatz
            </div>
            <div className="Text" onClick={e=>handleCLickProp(e,4)}>
              <div>{process.additive.file}</div>
              <div>{process.additive.text}</div>
            </div>
          </div>
        }
        {renderNextProcessAddButton()}
      </div>
    );
}