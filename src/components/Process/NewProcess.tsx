import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  startNewProcess(): void;
}

const NewProcess: React.FC<Props> = (props) => {
  const { startNewProcess } = props;
  const navigate = useNavigate();
  useEffect(() => {
    startNewProcess();
    navigate("/process/model");
  }, []);
  return <div>start new Process</div>;
};

export default NewProcess;
