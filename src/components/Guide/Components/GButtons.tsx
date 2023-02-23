import { Button } from "@mui/material";
import React from "react";
import { getIconByName } from "../../../config/Icons";

interface Props {
  handleOnClickBack?(): void;
  handleOnClickNext(): void;
  handleOnClickSkip(): void;
}

const GButtons: React.FC<Props> = (props) => {
  const { handleOnClickBack, handleOnClickNext, handleOnClickSkip } = props;
  return (
    <div className="guide-question-buttons">
      {handleOnClickBack !== undefined ? (
        <Button variant="contained" onClick={handleOnClickBack} title="Zurück">
          <img
            src={getIconByName("IconArrowR")}
            style={{ transform: "rotate(180deg)", width: "30px" }}
          />
        </Button>
      ) : null}
      <Button
        variant="contained"
        sx={{ background: "grey", "&:hover": { background: "grey" } }}
        onClick={handleOnClickSkip}
        title="Überspringen"
      >
        <img src={getIconByName("IconSkip")} style={{ width: "30px" }} />
      </Button>
      <Button variant="contained" onClick={handleOnClickNext} title="Weiter">
        <img src={getIconByName("IconArrowR")} style={{ width: "30px" }} />
      </Button>
    </div>
  );
};

export default GButtons;
