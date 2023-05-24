import React, { useContext } from "react";
import { ProcessContext } from "../ProcessView";
import Search from "./Search/Search";
import Cart from "./Cart/Cart";
import { Wizard } from "./Wizard/Wizard";

const Header: React.FC = () => {
  const { processState } = useContext(ProcessContext);
  const { progress } = processState;

  return (
    <div className="flex flex-col">
      <Cart />
      <div className="flex flex-col p-2 gap-2 bg-white">
        <Wizard processState={processState} />
        <h1 className="text-center text-3xl">{progress.title}</h1>
        <Search />
      </div>
    </div>
  );
};

export default Header;
