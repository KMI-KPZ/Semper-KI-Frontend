import React, { useContext, useEffect } from "react";
import { ProcessContext } from "../ProcessView";

interface Props {
  setProgress(path: string): void;
}

const Procedure: React.FC<Props> = ({ setProgress }) => {
  useEffect(() => {
    setProgress("procedure");
  }, []);
  return <div>Procedure</div>;
};

export default Procedure;
