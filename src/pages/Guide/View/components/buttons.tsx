import { Button } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RedoIcon from "@mui/icons-material/Redo";

interface Props {
  handleOnClickBack?(): void;
  handleOnClickNext(): void;
  handleOnClickSkip(): void;
}

const GuideButtons: React.FC<Props> = (props) => {
  const { handleOnClickBack, handleOnClickNext, handleOnClickSkip } = props;
  return (
    <div className="guide-question-buttons">
      {handleOnClickBack !== undefined ? (
        <Button variant="contained" onClick={handleOnClickBack} title="Zurück">
          <ArrowForwardIosIcon />
        </Button>
      ) : null}
      <Button
        variant="contained"
        sx={{ background: "grey", "&:hover": { background: "grey" } }}
        onClick={handleOnClickSkip}
        title="Überspringen"
      >
        <RedoIcon />
      </Button>
      <Button variant="contained" onClick={handleOnClickNext} title="Weiter">
        <ArrowForwardIosIcon />
      </Button>
    </div>
  );
};

export default GuideButtons;
