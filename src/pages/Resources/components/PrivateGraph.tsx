import React from "react";
import { useTranslation } from "react-i18next";
import { Container, LoadingAnimation } from "@component-library/index";
import useGetPrivateGraph from "@/api/Graph/Querys/useGetPrivateGraph";
import NetworkGraph from "@/components/NetworkGraph/GraphViewer";
import useGetOrgaGraph from "@/api/Resources/Organization/Querys/useGetOrgaGraph";

interface PrivateGraphProps {}

const PrivateGraph: React.FC<PrivateGraphProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const graph = useGetPrivateGraph();

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

export default PrivateGraph;
