import React, { useContext } from "react";
import { ProcessContext } from "../ProcessView";
import Search from "./Search/Search";
import "./Header.scss";
import Cart from "./Cart/Cart";
import { Wizard } from "./Wizard/Wizard";

const Header: React.FC = () => {
  const { processState } = useContext(ProcessContext);

  return (
    <div className="process-header">
      <Cart />
      <div className="process-header-box">
        <Wizard progress={processState.progress} />
        <h1 className="process-headline">{processState.progress.title}</h1>
        {processState.progress.type === 0 ? <Search /> : null}
      </div>
    </div>
  );
};

export default Header;
