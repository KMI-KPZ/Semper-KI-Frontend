import React, { PropsWithChildren } from "react";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Container } from "@component-library/index";

interface HintProps {
  title: string | React.ReactNode;
}

const Hint: React.FC<PropsWithChildren<HintProps>> = (props) => {
  const { title, children } = props;

  return (
    <Container width="fit">
      <Tooltip title={title} className="">
        {children !== undefined ? (
          <>{children}</>
        ) : (
          <InfoOutlinedIcon
            style={{ height: "20px", width: "20px" }}
            className="text-gray-600"
          />
        )}
      </Tooltip>
    </Container>
  );
};

export default Hint;
