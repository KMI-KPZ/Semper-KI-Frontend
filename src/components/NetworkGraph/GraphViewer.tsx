import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { Edge, Node } from "@/api/Graph/Querys/useGetGraph";
import { Button, Text } from "@component-library/index";
import logger from "@/hooks/useLogger";

interface NetworkGraphProps {
  nodes: Node[];
  edges: Edge[];
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({
  nodes = [],
  edges = [],
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [initialTick, setInitialTick] = useState<boolean>(true);

  const width = 1200;
  const height = 800;

  useEffect(() => {
    if (edges.length > 0 && nodes.length > 0) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous render

      const container = svg.append("g");

      const zoomHandler = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
          container.attr("transform", event.transform);
        });

      svg.call(zoomHandler as any);

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3
            .forceLink(edges)
            .id((d: any) => d.id)
            .distance(100)
        )
        .force("charge", d3.forceManyBody().strength(-500))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(width / 2).strength(0.05)) // Add centering force on X axis
        .force("y", d3.forceY(height / 2).strength(0.05)) // Add centering force on Y axis
        .on("tick", ticked);
      // .on("end", reScale); // Added an end event to handle scaling

      const link = container
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .attr("stroke-width", 1.5);

      const node = container
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

      const labels = container
        .append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("dy", 35)
        .attr("dx", 0)
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .attr("font-size", "12px")
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

      const reScale = () => {
        // Calculate the bounding box of the graph after the simulation
        const xValues = nodes.map((node) => node.x || 0);
        const yValues = nodes.map((node) => node.y || 0);
        const minX = Math.min(...xValues);
        const maxX = Math.max(...xValues);
        const minY = Math.min(...yValues);
        const maxY = Math.max(...yValues);
        const graphWidth = maxX - minX || 1; // Avoid division by zero
        const graphHeight = maxY - minY || 1; // Avoid division by zero
        // Calculate scaling factors
        const scaleX = width / graphWidth;
        const scaleY = height / graphHeight;
        const scale = Math.min(scaleX, scaleY) * 0.6; // Apply some padding
        container.attr(
          "transform",
          `translate(${width / 2}, ${height / 2}) scale(${scale}) translate(${
            -minX - graphWidth / 2
          }, ${-minY - graphHeight / 2})`
        );
      };

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
    }
  }, [nodes, edges]);

  //
  // useEffect(() => {
  //   if (edges.length > 0 && nodes.length > 0) {
  //     const svg = d3.select(svgRef.current);
  //     svg.selectAll("*").remove(); // Clear previous render

  //     // Witout zoom and auto scale
  //     // const simulation = d3
  //     //   .forceSimulation(nodes)
  //     //   .force(
  //     //     "link",
  //     //     d3
  //     //       .forceLink(edges)
  //     //       .id((d: any) => d.id)
  //     //       .distance(100)
  //     //   )
  //     //   .force("charge", d3.forceManyBody().strength(-300))
  //     //   .force("center", d3.forceCenter(width / 2, height / 2))
  //     //   .force("x", d3.forceX(width / 2).strength(0.05)) // Add centering force on X axis
  //     //   .force("y", d3.forceY(height / 2).strength(0.05)) // Add centering force on Y axis
  //     //   .on("tick", ticked);

  //     // const link = svg
  //     //   .append("g")
  //     //   .attr("stroke", "#999")
  //     //   .attr("stroke-opacity", 0.6)
  //     //   .selectAll("line")
  //     //   .data(edges)
  //     //   .enter()
  //     //   .append("line")
  //     //   .attr("stroke-width", 1.5);

  //     // const node = svg
  //     //   .append("g")
  //     //   .attr("stroke", "#fff")
  //     //   .attr("stroke-width", 1.5)
  //     //   .selectAll("circle")
  //     //   .data(nodes)
  //     //   .enter()
  //     //   .append("circle")
  //     //   .attr("r", 20)
  //     //   .attr("fill", "#69b3a2")
  //     //   .call(drag(simulation));

  //     // const labels = svg
  //     //   .append("g")
  //     //   .attr("class", "labels")
  //     //   .selectAll("text")
  //     //   .data(nodes)
  //     //   .enter()
  //     //   .append("text")
  //     //   .attr("dy", 40)
  //     //   .attr("text-anchor", "middle")
  //     //   .attr("fill", "#000")
  //     //   .attr("font-size", "16px")
  //     //   .text((d) => d.name);

  //     // ticket Without Boundaries
  //     // function ticked() {
  //     //   link
  //     //     .attr("x1", (d) => (d as any).source.x)
  //     //     .attr("y1", (d) => (d as any).source.y)
  //     //     .attr("x2", (d) => (d as any).target.x)
  //     //     .attr("y2", (d) => (d as any).target.y);

  //     //   node.attr("cx", (d) => d.x as number).attr("cy", (d) => d.y as number);

  //     //   labels.attr("x", (d) => d.x as number).attr("y", (d) => d.y as number);
  //     // }

  //     const container = svg.append("g");

  //     const zoomHandler = d3
  //       .zoom<SVGSVGElement, unknown>()
  //       .scaleExtent([0.1, 4])
  //       .on("zoom", (event) => {
  //         container.attr("transform", event.transform);
  //       });

  //     svg.call(zoomHandler as any);

  //     // Calculate the bounding box of the graph
  //     const xValues = nodes.map((node) => node.x || 0);
  //     const yValues = nodes.map((node) => node.y || 0);
  //     const minX = Math.min(...xValues);
  //     const maxX = Math.max(...xValues);
  //     const minY = Math.min(...yValues);
  //     const maxY = Math.max(...yValues);

  //     const graphWidth = maxX - minX;
  //     const graphHeight = maxY - minY;

  //     // Calculate scaling factors
  //     const scaleX = width / graphWidth;
  //     const scaleY = height / graphHeight;
  //     const scale = Math.min(scaleX, scaleY) * 0.8; // Apply some padding

  //     container.attr(
  //       "transform",
  //       `translate(${width / 2}, ${height / 2}) scale(${
  //         isFinite(scale) ? scale : 1
  //       }) translate(${-minX - graphWidth / 2}, ${-minY - graphHeight / 2})`
  //     );

  //     const simulation = d3
  //       .forceSimulation(nodes)
  //       .force(
  //         "link",
  //         d3
  //           .forceLink(edges)
  //           .id((d: any) => d.id)
  //           .distance(100)
  //       )
  //       .force("charge", d3.forceManyBody().strength(-300))
  //       .force("center", d3.forceCenter(width / 2, height / 2))
  //       .force("x", d3.forceX(width / 2).strength(0.05)) // Add centering force on X axis
  //       .force("y", d3.forceY(height / 2).strength(0.05)) // Add centering force on Y axis
  //       .on("tick", ticked);

  //     const link = container
  //       .append("g")
  //       .attr("stroke", "#999")
  //       .attr("stroke-opacity", 0.6)
  //       .selectAll("line")
  //       .data(edges)
  //       .enter()
  //       .append("line")
  //       .attr("stroke-width", 1.5);

  //     const node = container
  //       .append("g")
  //       .attr("stroke", "#fff")
  //       .attr("stroke-width", 1.5)
  //       .selectAll("circle")
  //       .data(nodes)
  //       .enter()
  //       .append("circle")
  //       .attr("r", 20)
  //       .attr("fill", "#69b3a2")
  //       .call(drag(simulation));

  //     const labels = container
  //       .append("g")
  //       .attr("class", "labels")
  //       .selectAll("text")
  //       .data(nodes)
  //       .enter()
  //       .append("text")
  //       .attr("dy", 35)
  //       .attr("dx", 0)
  //       .attr("text-anchor", "middle")
  //       .attr("fill", "#000")
  //       .attr("font-size", "12px")
  //       .text((d) => d.name);

  //     function ticked() {
  //       link
  //         .attr("x1", (d) =>
  //           Math.max(20, Math.min(width - 20, (d as any).source.x))
  //         )
  //         .attr("y1", (d) =>
  //           Math.max(20, Math.min(height - 20, (d as any).source.y))
  //         )
  //         .attr("x2", (d) =>
  //           Math.max(20, Math.min(width - 20, (d as any).target.x))
  //         )
  //         .attr("y2", (d) =>
  //           Math.max(20, Math.min(height - 20, (d as any).target.y))
  //         );

  //       node
  //         .attr("cx", (d) => Math.max(20, Math.min(width - 20, d.x as number)))
  //         .attr("cy", (d) =>
  //           Math.max(20, Math.min(height - 20, d.y as number))
  //         );

  //       labels
  //         .attr("x", (d) => Math.max(20, Math.min(width - 20, d.x as number)))
  //         .attr("y", (d) => Math.max(20, Math.min(height - 20, d.y as number)));
  //     }

  //     function drag(simulation: d3.Simulation<Node, undefined>) {
  //       return d3
  //         .drag<SVGCircleElement, Node>()
  //         .on("start", (event, d) => {
  //           if (!event.active) simulation.alphaTarget(0.3).restart();
  //           d.fx = d.x;
  //           d.fy = d.y;
  //         })
  //         .on("drag", (event, d) => {
  //           d.fx = event.x;
  //           d.fy = event.y;
  //         })
  //         .on("end", (event, d) => {
  //           if (!event.active) simulation.alphaTarget(0);
  //           d.fx = null;
  //           d.fy = null;
  //         });
  //     }
  //   }
  // }, [nodes, edges]);

  return (
    <div
      className={`relative flex h-fit w-fit items-center justify-center overflow-clip rounded-xl border-2 bg-white`}
    >
      {edges.length > 0 && nodes.length > 0 ? (
        <svg ref={svgRef} width={width} height={height} />
      ) : (
        <Text className="p-20">keine Graph-Daten</Text>
      )}
    </div>
  );
};

export default NetworkGraph;
