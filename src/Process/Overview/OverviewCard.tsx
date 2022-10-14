import "../ProcessView.scss";
import "./Overview.scss";
import {Process} from "../../Interface";

interface Props {
  process:Process
}

export const OverviewCard = ({process}:Props) => {

    return(
      <div className="overview-card">
        {process.id}{process.model?.file.name}
      </div>
    );
}