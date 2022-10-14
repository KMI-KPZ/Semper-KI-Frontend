import "../ProcessView.scss";
import "./Overview.scss";
import {Process, ProcessState} from "../../Interface";
import {OverviewCard} from "./OverviewCard";
import AddIcon from '@mui/icons-material/Add';

interface Props {
  state: ProcessState,
  setProgressState: (progressStateIndex:number)=>void,
}

export const Overview = ({setProgressState,state}:Props) => {

    return(
      <div className="overview-card-container">
        {state.processList.map((process:Process,index:number)=>(
            <OverviewCard process={process} key={index}/>
        ))}
        <div className="overview-card"><AddIcon className="overview-add-button"/></div>
      </div>
    );
}