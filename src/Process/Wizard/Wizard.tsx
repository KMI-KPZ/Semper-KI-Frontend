import "./Wizard.scss";
import React, {ReactNode} from "react";
import {ProcessState} from "../../Interface";

interface Props {
    state: ProcessState,
    setProgressState: (id:number)=>void,
}

export const Wizard = ({state,setProgressState}:Props) => {

    const handleClick = (e:any, index:number) => {
        e.preventDefault();
        setProgressState(index);
    }

    const getUnderline = (index:number):ReactNode => {
        return <hr className={`wizard-card-line ${state.progressState === index ? "active" : ""}`}/>;
    }

    return(
      <div className="wizard">
        <div className="wizard-card" onClick={e=>handleClick(e,0)}>Modell{getUnderline(0)}</div>
        <div className="wizard-card" onClick={e=>handleClick(e,1)}>Material | Verfahren{getUnderline(1)}</div>
        <div className="wizard-card" onClick={e=>handleClick(e,2)}>Hersteller{getUnderline(2)}</div>
        <div className="wizard-card" onClick={e=>handleClick(e,3)}>Nachbearbeitung{getUnderline(3)}</div>
        <div className="wizard-card" onClick={e=>handleClick(e,4)}>Zusatz{getUnderline(4)}</div>
        <div className="wizard-card" onClick={e=>handleClick(e,5)}>Übersicht{getUnderline(5)}</div>
      </div>
    );
}