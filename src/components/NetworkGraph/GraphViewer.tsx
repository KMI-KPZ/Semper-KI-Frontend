import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Container } from "@component-library/index";
import logger from "@/hooks/useLogger";

export interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
}

export interface Edge {
  source: string;
  target: string;
}

interface NetworkGraphProps {
  nodes: Node[];
  edges: Edge[];
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ nodes, edges }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const width = 1200;
  const height = 800;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(edges)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .attr("stroke-width", 1.5);

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#69b3a2")
      .call(drag(simulation));

    const labels = svg
      .append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("dy", 40)
      .attr("text-anchor", "middle")
      .attr("fill", "#000")
      .attr("font-size", "16px")
      .text((d) => d.name);

    function ticked() {
      link
        .attr("x1", (d) => (d as any).source.x)
        .attr("y1", (d) => (d as any).source.y)
        .attr("x2", (d) => (d as any).target.x)
        .attr("y2", (d) => (d as any).target.y);

      node.attr("cx", (d) => d.x as number).attr("cy", (d) => d.y as number);

      labels.attr("x", (d) => d.x as number).attr("y", (d) => d.y as number);
    }

    function drag(simulation: d3.Simulation<Node, undefined>) {
      return d3
        .drag<SVGCircleElement, Node>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });
    }
  }, [nodes, edges]);

  return (
    <div
      className={`flex h-fit w-fit items-center justify-center overflow-clip rounded-xl border-2 bg-white`}
    >
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};

export default NetworkGraph;
