import React, { useEffect } from "react";

interface Props {
  startNewProcess(): void;
}

const NewProcess = ({ startNewProcess }: Props) => {
  useEffect(() => {
    startNewProcess();
  }, []);
  return <div>start new Process</div>;
};

export default NewProcess;
