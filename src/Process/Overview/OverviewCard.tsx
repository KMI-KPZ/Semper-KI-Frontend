import "../ProcessView.scss";
import "./Overview.scss";
import {Process} from "../../Interface";
import MinimizeIcon from "@mui/icons-material/Minimize";
import {DeleteForever} from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";

interface Props {
  process:Process
}

export const OverviewCard = ({process}:Props) => {

    return(
      <div className="overview-card">
        <div className="overview-card-header">
          <div className="overview-card-header left">
            <div className="headline">Bestellung #{process.id}</div>
            <div className="text">Datum: DD.MM.YYYY</div>
            <div className="text">Status: in Bearbeitung</div>
          </div>
          <div className="overview-card-header right">
            <MinimizeIcon  className="iconButton minimize" />
            <DeleteForever className="iconButton close"  />
          </div>
        </div>
        <div className="overview-card-box">
          <div className="overview-card-box-title">Modelle</div>
          <ExpandMoreIcon/>
        </div>
        <div className="overview-card-box">
          <div className="overview-card-box-title">Hersteller</div>
          <ExpandMoreIcon/>
        </div>
        <div className="overview-card-row">
          Rechnung:
        </div>
        <div className="overview-card-footer">
          <div className="overview-card-footer-button">Bearbeiten</div>
          <div className="overview-card-footer-button">Löschen</div>
          <div className="overview-card-footer-button">Anfragen</div>
        </div>
      </div>
    );
}