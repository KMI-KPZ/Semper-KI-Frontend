import React from "react";
import { useTranslation } from "react-i18next";
import { Container, LoadingAnimation } from "@component-library/index";
import useGetGraph from "@/api/Graph/Querys/useGetGraph";
import NetworkGraph from "@/components/NetworkGraph/GraphViewer";

interface GraphProps {}

const Graph: React.FC<GraphProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const graph = useGetGraph();

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

export default Graph;
