import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  startNewProcess(): void;
}

const NewProcess = ({ startNewProcess }: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    startNewProcess();
    navigate("/process/model");
  }, []);
  return <div>start new Process</div>;
};

export default NewProcess;
