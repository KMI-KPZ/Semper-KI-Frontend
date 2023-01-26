import React, { Dispatch, SetStateAction } from "react";
import { IProcess } from "../../../interface/Interface";
import Cart from "../Cart/Cart";
import { IProcessState } from "../ProcessView";
import Search from "../Search/Search";
import { Wizard } from "../Wizard/Wizard";
import "./Header.scss";

interface Props {
  processState: IProcessState;
  setProcessState: Dispatch<SetStateAction<IProcessState>>;
}

const Header: React.FC<Props> = ({ processState, setProcessState }) => {
  const handleClickGrid = () => {};

  return (
    <div className="process-header">
      <Cart />
      <Wizard />
      <Search
        grid={true}
        handleClickGrid={handleClickGrid}
        headline={"Title"}
        placeholder={"ich benötige"}
      />
    </div>
  );
};

export default Header;
