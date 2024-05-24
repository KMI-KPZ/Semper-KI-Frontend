import { Project } from "@/api/Project/Querys/useGetProject";
import { ProjectContext } from "@/contexts/ProjectContext";
import { useContext } from "react";

interface ReturnProps {
  project: Project;
}

export const useProject = (): ReturnProps => {
  const { project } = useContext(ProjectContext);
  return {
    project,
  };
};
