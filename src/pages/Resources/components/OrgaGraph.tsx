import React from "react";
import { Container, LoadingAnimation } from "@component-library/index";
import NetworkGraph from "@/components/NetworkGraph/GraphViewer";
import useGetOrgaGraph from "@/api/Resources/Organization/Querys/useGetOrgaGraph";
import AdminResourcesOverView from "@/pages/Admin/Resources/OverView";
import useUser, { UserType } from "@/hooks/useUser";

interface OrgaGraphProps {}

const OrgaGraph: React.FC<OrgaGraphProps> = (props) => {
  const {} = props;
  const graph = useGetOrgaGraph();
  const { user } = useUser();

  return (
    <Container width="full" direction="col">
      {user.usertype === UserType.ADMIN ? <AdminResourcesOverView /> : null}
      {graph.isFetched && graph.data !== undefined ? (
        <NetworkGraph edges={graph.data.edges} nodes={graph.data.nodes} />
      ) : (
        <LoadingAnimation />
      )}
    </Container>
  );
};

export default OrgaGraph;
