import "../ProcessView.scss";
import "./Overview.scss";
import { ProcessState} from "../../Interface";
import {OverviewCard} from "./OverviewCard";
import AddIcon from '@mui/icons-material/Add';

interface Props {
  state: ProcessState,
  setProgressState: (progressStateIndex:number)=>void,
  selectProcess: (id:number) => void
}

export const Overview = ({setProgressState,state,selectProcess}:Props) => {

    return(
      <div className="overview-card-container">
        <OverviewCard processList={state.processList} setProgressState={setProgressState} selectProcess={selectProcess}/>
        <div className="overview-card add-button"><AddIcon className="overview-add-button"/></div>
      </div>
    );
}