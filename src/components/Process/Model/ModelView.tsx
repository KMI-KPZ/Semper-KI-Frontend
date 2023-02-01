import "../ProcessView.scss";
import React from "react";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { getFileSizeAsString } from "../../../services/utils";
import { IModel } from "../../../interface/Interface";
import { Delete } from "@mui/icons-material";

interface Props {
  model?: IModel;
}

export const ModelView = ({ model }: Props) => {
  return (
    <div className="process-content-container">
      <div className="headline dark">Modell</div>
      {model && (
        <div className="content-container row box">
          <ViewInArIcon sx={{ fontSize: "200px", margin: "20px" }} />
          <div>
            {model.name}
            {/* <br />( {getFileSizeAsString(model.file.size)} ) */}
          </div>
          <Delete sx={{ fontSize: "50px", margin: "20px" }} />
        </div>
      )}
      {!model && (
        <div className="content-container box column">
          Noch Kein Modell gewählt!
        </div>
      )}
    </div>
  );
};
