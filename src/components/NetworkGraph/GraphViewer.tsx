import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Edge, Node } from "@/api/Graph/Querys/useGetPrivateGraph";
import { Text } from "@component-library/index";

interface NetworkGraphProps {
  nodes: Node[];
  edges: Edge[];
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({
  nodes = [],
  edges = [],
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const width = 1000;
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
            .distance(150)
            .strength(0.15)
        )
        .force("charge", d3.forceManyBody().strength(-1500))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .on("tick", ticked);

      const link = container
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .attr("stroke-width", 2);

      const node = container
        .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("path") // Use path for different symbols
        .data(nodes)
        .enter()
        .append("path")
        .attr("d", (d) => {
          // Define different shapes based on node types
          const size = 1000; // Increased size for all shapes
          switch (d.type) {
            case "organization":
              return d3.symbol().size(size).type(d3.symbolSquare)();
            case "printer":
              return d3.symbol().size(size).type(d3.symbolDiamond)();
            case "material":
              return d3.symbol().size(size).type(d3.symbolTriangle)();
            case "materialCategory":
              return d3.symbol().size(size).type(d3.symbolStar)();
            case "additionalRequirement":
              return d3.symbol().size(size).type(d3.symbolCross)();
            case "color":
              return d3.symbol().size(size).type(d3.symbolCircle)();
            default:
              return d3.symbol().size(size).type(d3.symbolCircle)();
          }
        })
        .attr("fill", (d) => {
          switch (d.type) {
            case "organization":
              return "#1f77b4"; // Blue
            case "printer":
              return "#ff7f0e"; // Orange
            case "material":
              return "#2ca02c"; // Green
            case "materialCategory":
              return "#17becf"; // Cyan/Teal
            case "additionalRequirement":
              return "#d62728"; // Red
            case "color":
              return "#9467bd"; // Purple
            default:
              return "#7f7f7f"; // Gray for default
          }
        })
        .call(drag(simulation));

      const labels = container
        .append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("dy", 40) // Adjusted positioning
        .attr("dx", 0)
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .attr("font-size", "14px") // Increased font size
        .text((d) => d.name);

      // Legend section
      const legendData = [
        { label: "Organization", color: "#1f77b4", shape: d3.symbolSquare },
        { label: "Printer", color: "#ff7f0e", shape: d3.symbolDiamond },
        { label: "Material", color: "#2ca02c", shape: d3.symbolTriangle },
        { label: "Material Category", color: "#17becf", shape: d3.symbolStar },
        {
          label: "Additional Requirement",
          color: "#d62728",
          shape: d3.symbolCross,
        },
        { label: "Color", color: "#9467bd", shape: d3.symbolCircle },
      ];

      const legend = svg
        .append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 200}, 50)`); // Position the legend

      legend
        .selectAll("path")
        .data(legendData)
        .enter()
        .append("path")
        .attr("d", (d) => d3.symbol().type(d.shape).size(200)())
        .attr("fill", (d) => d.color)
        .attr("transform", (_, i) => `translate(0, ${i * 30})`); // Stack the legend items

      legend
        .selectAll("text")
        .data(legendData)
        .enter()
        .append("text")
        .attr("x", 20)
        .attr("y", (_, i) => i * 30 + 5) // Align with symbols
        .attr("font-size", "12px")
        .text((d) => d.label);

      function ticked() {
        link
          .attr("x1", (d) => (d as any).source.x)
          .attr("y1", (d) => (d as any).source.y)
          .attr("x2", (d) => (d as any).target.x)
          .attr("y2", (d) => (d as any).target.y);

        node.attr("transform", (d) => `translate(${d.x},${d.y})`);

        labels.attr("x", (d) => d.x as number).attr("y", (d) => d.y as number);
      }

      function drag(simulation: d3.Simulation<Node, undefined>) {
        return d3
          .drag<SVGPathElement, Node>()
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
