import React, { PropsWithChildren } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { LoadingAnimation } from "@component-library/index";
import useGetProcess from "@/api/Process/Querys/useGetProcess";
import ProcessContextProvider from "@/contexts/ProcessContext";
import { FilterItemProps } from "@/pages/Process/components/Service/Filter/MaufacturingFilter/Filter";
import _FilterItems from "@/hooks/Data/FilterQuestions.json";
const FilterItems = _FilterItems as FilterItemProps[];

interface ProcessOutletProps {}

const ProcessOutlet: React.FC<PropsWithChildren<ProcessOutletProps>> = (
  props
) => {
  const { children } = props;
  const process = useGetProcess();
  // const filter = useGetFilters();
  const { projectID } = useParams();

  if (
    process.isLoading
    //FilterItems  || filter.isLoading
  )
    return <LoadingAnimation />;

  if (
    process.isFetched &&
    process.data !== undefined

    // && filter.isFetched &&
    // filter.data !== undefined
  )
    return (
      <ProcessContextProvider process={process.data} filters={FilterItems}>
        {children}
        <Outlet />
      </ProcessContextProvider>
    );

  if (process.isRefetching) return <LoadingAnimation />;
  return <Navigate to={`/projects/${projectID}`} />;
};

export default ProcessOutlet;
