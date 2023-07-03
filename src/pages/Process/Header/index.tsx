import React, { useContext } from "react";
import { ProcessContext } from "..";
import Search from "./Search";
import Cart from "./Cart";
import { Wizard } from "./Wizard";
import { Heading } from "@component-library/Typography";

const Header: React.FC = () => {
  const { processState } = useContext(ProcessContext);
  const { progress } = processState;

  return (
    <div className="flex flex-col">
      <Cart />
      <div className="flex flex-col gap-2 bg-white p-2">
        <Wizard processState={processState} />
        <Heading variant="h1" className="text-center">
          {progress.title}
        </Heading>
        <Search />
      </div>
    </div>
  );
};

export default Header;
