import "../ProcessView.scss";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { Delete } from "@mui/icons-material";
import React from "react";
import { IMaterial } from "../../../interface/Interface";

interface Props {
  material?: IMaterial;
}

export const MaterialView: React.FC<Props> = (props) => {
  const { material } = props;
  return (
    <div className="process-content-container">
      <div className="headline dark">Material/Verfahren</div>
      {material && (
        <div className="content-container row box">
          <ViewInArIcon sx={{ fontSize: "200px", margin: "20px" }} />
          <div>{material.name}</div>
          <Delete sx={{ fontSize: "50px", margin: "20px" }} />
        </div>
      )}
      {!material && (
        <div className="content-container box column">
          Noch Kein Material/Verfahren gewählt!
        </div>
      )}
    </div>
  );
};
