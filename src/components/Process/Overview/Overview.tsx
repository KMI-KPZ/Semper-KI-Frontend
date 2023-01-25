import "../ProcessView.scss";
import "./Overview.scss";
import { OverviewCard } from "./OverviewCard";
import AddIcon from "@mui/icons-material/Add";
import { IProcess } from "../../../interface/Interface";

interface Props {
  processList: IProcess[];
  selectProcess: (id: number) => void;
}

export const Overview = ({ processList, selectProcess }: Props) => {
  return (
    <div className="overview-card-container">
      <OverviewCard processList={processList} selectProcess={selectProcess} />
      <div className="overview-card add-button">
        <AddIcon className="overview-add-button" />
      </div>
    </div>
  );
};
