import React, { useContext } from "react";
import { ProcessContext } from "../ProcessView";
import Search from "./Search/Search";
import "./Header.scss";
import Cart from "./Cart/Cart";
import { Wizard } from "./Wizard/Wizard";

const Header: React.FC = () => {
  const { processState } = useContext(ProcessContext);
  const { progress } = processState;

  return (
    <div className="process-header">
      <Cart />
      <div className="process-header-box">
        {progress.link !== "/process/upload" ? (
          <Wizard processState={processState} />
        ) : null}
        <h1 className="process-headline">{progress.title}</h1>
        {progress.type === 0 ? <Search /> : null}
      </div>
    </div>
  );
};

export default Header;
