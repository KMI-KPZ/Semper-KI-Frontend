import React from "react";
import { Container, LoadingAnimation } from "@component-library/index";
import { Navigate, useParams } from "react-router-dom";

interface AdminProjectProps {}

const AdminProject: React.FC<AdminProjectProps> = (props) => {
  const {} = props;
  const { projectID } = useParams();

  return (
    <Container>
      <LoadingAnimation />
      <Navigate to={`/projects/${projectID}`} />
    </Container>
  );
};

export default AdminProject;
