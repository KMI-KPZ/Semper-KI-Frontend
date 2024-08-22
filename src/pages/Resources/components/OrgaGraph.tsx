import React from "react";
import { useTranslation } from "react-i18next";
import { Container, LoadingAnimation } from "@component-library/index";
import useGetPrivateGraph from "@/api/Graph/Querys/useGetPrivateGraph";
import NetworkGraph from "@/components/NetworkGraph/GraphViewer";
import useGetOrgaGraph from "@/api/Resources/Organization/Querys/useGetOrgaGraph";

interface OrgaGraphProps {}

const OrgaGraph: React.FC<OrgaGraphProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const graph = useGetOrgaGraph();

  return (
    <Container>
      {graph.isFetched && graph.data !== undefined ? (
        <NetworkGraph edges={graph.data.edges} nodes={graph.data.nodes} />
      ) : (
        <LoadingAnimation />
      )}
    </Container>
  );
};

export default OrgaGraph;
