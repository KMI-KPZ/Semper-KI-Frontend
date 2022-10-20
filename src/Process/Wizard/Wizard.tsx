import "./Wizard.scss";
import React, {ReactNode} from "react";
import {ProcessState} from "../../Interface";
import {useTranslation} from "react-i18next";

interface Props {
    state: ProcessState,
    setProgressState: (id:number)=>void,
}

export const Wizard = ({state,setProgressState}:Props) => {
    const {t} = useTranslation();

    const handleClick = (e:any, index:number) => {
        e.preventDefault();
        setProgressState(index);
    }

    const getUnderline = (index:number):ReactNode => {
        return <hr className={`wizard-card-line ${state.progressState === index ? "active" : ""}`}/>;
    }

    return(
      <div className="wizard">
        <div className="wizard-card" onClick={e=>handleClick(e,0)}>{t('wizard.model')}{getUnderline(0)}</div>
        <div className="wizard-card" onClick={e=>handleClick(e,1)}>{t('wizard.material-procedure')}{getUnderline(1)}</div>
        <div className="wizard-card" onClick={e=>handleClick(e,2)}>{t('wizard.manufacturer')}{getUnderline(2)}</div>
        <div className="wizard-card" onClick={e=>handleClick(e,3)}>{t('wizard.post-processing')}{getUnderline(3)}</div>
        <div className="wizard-card" onClick={e=>handleClick(e,4)}>{t('wizard.additive')}{getUnderline(4)}</div>
        <div className="wizard-card" onClick={e=>handleClick(e,5)}>{t('wizard.overview')}{getUnderline(5)}</div>
      </div>
    );
}