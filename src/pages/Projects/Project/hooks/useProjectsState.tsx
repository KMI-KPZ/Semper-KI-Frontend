import { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { ProjectProps } from "../../hooks/useProject";

interface ReturnProps {}

const useProjectsState = (
  projectsQuery: UseQueryResult<ProjectProps[], Error>,
  state: boolean[],
  setState: React.Dispatch<React.SetStateAction<boolean[]>>
): ReturnProps => {
  useEffect(() => {
    if (projectsQuery.data !== undefined && state.length === 0)
      setState(
        projectsQuery.data.map((open, index) => (index === 0 ? true : false))
      );
  }, [projectsQuery.data]);

  return {};
};

export default useProjectsState;
