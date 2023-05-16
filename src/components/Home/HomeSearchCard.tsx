import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "../General/Button";

interface Props {
  className?: string;
}

const HomeSearchCard: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";

  return (
    <div
      className={`${additionalClassNames}  p-3 flex flex-row justify-center items-center gap-5`}
    >
      <div className="w-4/5 flex items-center justify-center">
        <input
          type="text"
          className="p-3 border-2 w-full"
          placeholder="Suche..."
        />
      </div>
      <div className="w-1/5 md:w-fit flex items-center justify-center">
        <Button icon={<SearchIcon />}></Button>
      </div>
    </div>
  );
};

export default HomeSearchCard;
