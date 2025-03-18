import React from "react";
import { Container } from "@component-library/index";
import HomeProjects from "./Projects";
import useUser, { UserType } from "@/hooks/useUser";
import { useParams } from "react-router-dom";

interface ProjectsOverviewProps {}

const ProjectsOverview: React.FC<ProjectsOverviewProps> = (props) => {
  const {} = props;
  const { user } = useUser();
  const { projectID } = useParams();

  return (
    <Container width="full" direction="col" className="p-0">
      <HomeProjects
        projectID={projectID}
        user={user.usertype === UserType.ANONYM ? undefined : user}
      />
      {user !== undefined && user.usertype === UserType.ORGANIZATION ? (
        <HomeProjects projectID={projectID} recieved user={user} />
      ) : null}
    </Container>
  );
};

export default ProjectsOverview;
