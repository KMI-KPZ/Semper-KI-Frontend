import React from "react";
import { Link } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

interface Props {
  className?: string;
}

const HomeOrderCard: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";

  return (
    <Link
      to="/process/model"
      className={`${additionalClassNames}  p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300`}
    >
      <LocalShippingIcon fontSize="large" />
      <h2>Auftrag beginnen</h2>
    </Link>
  );
};

export default HomeOrderCard;
