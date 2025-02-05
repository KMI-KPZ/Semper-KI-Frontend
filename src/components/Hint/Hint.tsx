import React, { PropsWithChildren } from "react";
import { Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface HintProps {
  title: string | React.ReactNode;
}

const Hint: React.FC<PropsWithChildren<HintProps>> = (props) => {
  const { title, children } = props;

  return (
    <Tooltip title={title} className="flex items-center justify-center">
      {children !== undefined ? (
        <>{children}</>
      ) : (
        <HelpOutlineIcon style={{ height: "20px", width: "20px" }} />
      )}
    </Tooltip>
  );
};

export default Hint;
