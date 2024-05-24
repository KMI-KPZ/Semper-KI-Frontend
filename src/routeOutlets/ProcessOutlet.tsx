import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { LoadingAnimation } from "@component-library/index";
import useGetProcess from "@/api/Process/Querys/useGetProcess";
import ProcessContextProvider from "@/contexts/ProcessContext";

interface ProcessOutletProps {}

const ProcessOutlet: React.FC<ProcessOutletProps> = (props) => {
  const {} = props;
  const process = useGetProcess();
  const { projectID } = useParams();

  if (process.isLoading) return <LoadingAnimation />;

  if (process.isFetched && process.data !== undefined)
    return (
      <ProcessContextProvider process={process.data}>
        <Outlet />
      </ProcessContextProvider>
    );

  if (process.isRefetching) return <LoadingAnimation />;
  return <Navigate to={`/projects/${projectID}`} />;
};

export default ProcessOutlet;
