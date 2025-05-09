import React, { PropsWithChildren } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import useGetProcess from "@/api/Process/Querys/useGetProcess";
import useGetFilters from "@/api/Filter/Querys/useGetFilters";
import { Container, LoadingAnimation } from "@component-library/index";
import ProcessContextProvider, {
  ProcessLoadGroup,
} from "@/contexts/ProcessContext";

interface ProcessOutletProps {}

const ProcessOutlet: React.FC<PropsWithChildren<ProcessOutletProps>> = (
  props
) => {
  const { children } = props;
  const process = useGetProcess();
  const filter = useGetFilters();
  const { projectID } = useParams();
  const [loadGroup, setLoadGroup] = React.useState<ProcessLoadGroup>({
    groupID: undefined,
    navLink: undefined,
    loadNav: false,
  });

  if (process.isLoading || filter.isLoading)
    return (
      <Container width="full" className="h-80 bg-white">
        <LoadingAnimation />
      </Container>
    );

  if (
    process.isFetched &&
    process.data !== undefined &&
    filter.isFetched &&
    filter.data !== undefined
  )
    return (
      <ProcessContextProvider
        process={process.data}
        filters={filter.data}
        loadGroup={loadGroup}
        setLoadGroup={setLoadGroup}
      >
        {children}
        <Outlet />
      </ProcessContextProvider>
    );

  if (process.isRefetching) return <LoadingAnimation />;
  return <Navigate to={`/projects/${projectID}`} />;
};

export default ProcessOutlet;
