import React from "react";
import { IProcess } from "../../../interface/Interface";
import Cart from "../Cart/Cart";
import Search from "../Search/Search";
import { Wizard } from "../Wizard/Wizard";
import "./Header.scss";

interface Props {
  processList: IProcess[];
}

const Header: React.FC<Props> = ({ processList }) => {
  const handleClickGrid = () => {};

  return (
    <div className="process-header">
      <Cart processList={processList} />
      <Wizard processList={processList} />
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
