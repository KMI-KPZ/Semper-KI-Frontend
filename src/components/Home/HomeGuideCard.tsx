import React from "react";
import { Link } from "react-router-dom";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";

interface Props {
  className?: string;
}

const HomeGuideCard: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";

  return (
    <Link
      to="/guide"
      className={`${additionalClassNames}  p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300`}
    >
      <PsychologyAltIcon fontSize="large" />
      <h2>Angeleiteter Einstieg</h2>
    </Link>
  );
};

export default HomeGuideCard;
