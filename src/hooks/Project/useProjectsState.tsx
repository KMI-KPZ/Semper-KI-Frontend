import { Project } from "@/api/Project/Querys/useGetProject";
import { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

interface ReturnProps {}

const useProjectsState = (
  projectsQuery: UseQueryResult<Project[], Error>,
  state: boolean[],
  setState: React.Dispatch<React.SetStateAction<boolean[]>>
): ReturnProps => {
  useEffect(() => {
    if (projectsQuery.data !== undefined && state.length === 0)
      setState(
        projectsQuery.data.map((_, index) => (index === 0 ? true : false))
      );
  }, [projectsQuery.data]);

  return {};
};

export default useProjectsState;
