import "../ProcessView.scss";
import "./Additive.scss";
import React, {useRef} from "react";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {Additive, ProcessState} from "../../Interface";

interface Props {
  state:ProcessState,
  setProgressState: (progressStateIndex:number)=>void,
  selectAdditive: (additive:Additive)=>void
}

export const AdditiveView = ({selectAdditive,setProgressState,state}:Props) => {
    const refUpload = useRef<HTMLInputElement>(null);

    const handleUploadClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      if(refUpload.current){
        refUpload.current.click();
      }
    }

  const handleClickNext = () => {
    setProgressState(5);
  }

    return(
      <div className="process-content-container">
        <div className="content-box">
          <div className="additive-headline">Zusätzliche Dateien (technische Zeichnung usw.)</div>
          <div className="additive-upload" onClick={handleUploadClick}>
            <UploadFileIcon className="additive-upload-icon"/>
          </div>
          <input type="file" ref={refUpload} hidden/>
        </div>
        <div className="content-box">
          <div className="additive-headline">Zusätzliche Anmerkungen</div>
          <textarea placeholder="Zusatztext..." className="additive-text-input"/>
        </div>
        <div className="next-button dark" onClick={handleClickNext}>Weiter</div>
      </div>
    );
}