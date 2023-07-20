import React from "react";
import Bubbles1TransURL from "@images/Bubbles1_Trans.png";
import Bubbles2TransURL from "@images/Bubbles2_Trans.png";
import Bubbles3TransURL from "@images/Bubbles3_Trans.png";
import * as d3 from "d3";

interface Props {}

const Background: React.FC<Props> = (props) => {
  const showFancyBG = false;

  // const fancyBG = () => {
  //   const patternAmount = 20;
  //   const patternOrientation = 0.48;
  //   const color1 = "hsla(180, 32%, 28%, 1)";
  //   const color2 = "hsla(224, 37%, 51%, 1)";
  //   const color3 = "hsla(224, 37%, 18%, 1)";
  //   const color4 = "rgb(50 63 78)";
  //   const colorA = [49, 95, 95];
  //   const colorB = [50, 65, 82];
  //   const colorC = [56, 70, 87];
  //   const colorD = [56, 70, 87];

  //   const PI2 = 2 * Math.PI;
  //   const width = window.innerWidth;
  //   const height = window.innerHeight;
  //   const radiusW = width / patternAmount;
  //   const radiusH = height / patternAmount;
  //   const radius = Math.round(Math.max(radiusW, radiusH));
  //   const sechstelKreis = PI2 / 6;

  //   var addTriangle = function (
  //     shapeID: any,
  //     x: any,
  //     y: any,
  //     elem: any,
  //     color: any,
  //     radius: any,
  //     tRadius: any,
  //     rot: any
  //   ) {
  //     let d = "";
  //     let xInner, yInner, xOuter, yOuter;
  //     for (let p = 0; p < 6; p = p + 2) {
  //       xInner = x + tRadius * Math.cos(rot + p * sechstelKreis);
  //       yInner = y + tRadius * Math.sin(rot + p * sechstelKreis);
  //       xOuter = x + radius * Math.cos(rot + p * sechstelKreis);
  //       yOuter = y + radius * Math.sin(rot + p * sechstelKreis);
  //       let xDiff = xOuter - xInner;
  //       let yDiff = yOuter - yInner;
  //       if (d.length === 0) {
  //         d += "M";
  //       } else {
  //         d += "L";
  //       }
  //       d +=
  //         x +
  //         tRadius * Math.cos(rot + (-1 + p) * sechstelKreis) +
  //         xDiff +
  //         " " +
  //         (y + tRadius * Math.sin(rot + (-1 + p) * sechstelKreis) + yDiff);
  //       d +=
  //         "L" +
  //         (x + tRadius * Math.cos(rot + (1 + p) * sechstelKreis) + xDiff) +
  //         " " +
  //         (y + tRadius * Math.sin(rot + (1 + p) * sechstelKreis) + yDiff);
  //       d +=
  //         "L" +
  //         (x + tRadius * Math.cos(rot + (1 + p) * sechstelKreis)) +
  //         " " +
  //         (y + tRadius * Math.sin(rot + (1 + p) * sechstelKreis));
  //     }
  //     d += "z";
  //     elem
  //       .append("path")
  //       .attr("id", shapeID)
  //       .attr("d", d)
  //       .attr("stroke", "nonw")
  //       .attr("fill-rule", "nonzero")
  //       .style("fill", color);
  //     return d;
  //   };
  //   var addPattern = function (
  //     shapeID: any,
  //     x: any,
  //     y: any,
  //     elem: any,
  //     color_1: any,
  //     color_2: any,
  //     radius: any,
  //     rot: any
  //   ) {
  //     const outerD = addTriangle(
  //       shapeID + "_0",
  //       x,
  //       y,
  //       elem,
  //       color4,
  //       radius,
  //       radius / 4.2 + radius / 40,
  //       rot
  //     );
  //     addTriangle(
  //       shapeID + "_1",
  //       x,
  //       y,
  //       elem,
  //       "rgb(" + color_1.toString() + ")",
  //       radius,
  //       radius / 4.2,
  //       rot
  //     );
  //     addTriangle(
  //       shapeID + "_2",
  //       x,
  //       y,
  //       elem,
  //       "rgb(" + color_2.toString() + ")",
  //       radius,
  //       radius / 12,
  //       rot
  //     );
  //     return outerD;
  //   };
  //   var gradColor = function gradColor(ca: any, cb: any, ci: any, cj: any) {
  //     let c1 = [
  //       ca[0] + (cb[0] - ca[0]) * ci,
  //       ca[1] + (cb[1] - ca[1]) * ci,
  //       ca[2] + (cb[2] - ca[2]) * ci,
  //     ];
  //     let c2 = [
  //       ca[0] + (cb[0] - ca[0]) * cj,
  //       ca[1] + (cb[1] - ca[1]) * cj,
  //       ca[2] + (cb[2] - ca[2]) * cj,
  //     ];
  //     return [
  //       Math.floor((c1[0] + c2[0]) / 2),
  //       Math.floor((c1[1] + c2[1]) / 2),
  //       Math.floor((c1[2] + c2[2]) / 2),
  //     ];
  //   };

  //   var assembleKey = function (x: any, y: any) {
  //     return (
  //       "p" +
  //       Math.round(x / (radius / 1.5)) +
  //       "__" +
  //       Math.round(y / (radius / 1.5))
  //     );
  //   };

  //   var showPattern = function (
  //     key: any,
  //     x: any,
  //     y: any,
  //     pattern: any,
  //     rot: any,
  //     g: any
  //   ) {
  //     if (
  //       typeof pattern[key] === "undefined" &&
  //       x < width + radius &&
  //       y < height + radius &&
  //       x > -radius &&
  //       y > -radius
  //     ) {
  //       const color_1 = gradColor(
  //         colorA,
  //         colorB,
  //         x < 0 ? 0 : x / width,
  //         1 - (y < 0 ? 0 : y / height)
  //       );
  //       const color_2 = gradColor(
  //         colorC,
  //         colorD,
  //         x < 0 ? 0 : x / width,
  //         1 - (y < 0 ? 0 : y / height)
  //       );

  //       const outerD = addPattern(key, x, y, g, color_1, color_2, radius, rot);

  //       pattern[key] = { d: outerD, keys: [], x: x, y: y };

  //       const nextCells = [];
  //       for (let i = 0; i < 6; i++) {
  //         nextCells[i] = [
  //           x + radius * Math.cos(rot + i * sechstelKreis),
  //           y + radius * Math.sin(rot + i * sechstelKreis),
  //         ];
  //         pattern[key].keys[i] = assembleKey(nextCells[i][0], nextCells[i][1]);
  //       }

  //       for (let i = 0; i < 6; i++) {
  //         // recursion
  //         showPattern(
  //           pattern[key].keys[i],
  //           nextCells[i][0],
  //           nextCells[i][1],
  //           pattern,
  //           rot,
  //           g
  //         );
  //       }
  //     }
  //   };

  //   let cells:object = {};
  //   d3.select("fancyBG").select("svg").remove();
  //   const svg = d3
  //     .select("fancyBG")
  //     .append("svg")
  //     .attr("width", "100%")
  //     .attr("height", "100%");

  //   var printBackground = function (pattern: object, orient: any) {
  //     const defs = svg.append("defs");
  //     const g = svg.append("g");

  //     const rotation = PI2 * orient;
  //     const x = Math.round(width / 4);
  //     const y = Math.round(height / 4);
  //     const firstKey = assembleKey(x, y);

  //     showPattern(firstKey, x, y, pattern, rotation, g);

  //     for (key in pattern) {
  //       const mask = defs.append("mask").attr("id", "mask_" + key);
  //       mask
  //         .append("rect")
  //         .attr("y", "0")
  //         .attr("width", "" + width)
  //         .attr("height", "" + height)
  //         .attr("fill", "white");
  //       for (let i = 0; i < 6; i = i + 2) {
  //         if (typeof pattern[pattern[key].keys[i]] !== "undefined") {
  //           mask
  //             .append("path")
  //             .attr("d", pattern[pattern[key].keys[i]].d)
  //             .attr("fill", "black");
  //         }
  //       }
  //     }
  //     for (key in pattern) {
  //       d3.select("#" + key + "_0").attr("mask", "url(#mask_" + key + ")");
  //       d3.select("#" + key + "_1").attr("mask", "url(#mask_" + key + ")");
  //       d3.select("#" + key + "_2").attr("mask", "url(#mask_" + key + ")");
  //     }
  //     return firstKey;
  //   };

  //   const firstKey = printBackground(cells, patternOrientation);

  //   for (key in cells) {
  //     const rand = Math.random();
  //     if (rand < 0.8) {
  //       const color = gradColor(
  //         [2, 182, 182],
  //         [250, 255, 0],
  //         rand / 0.8,
  //         rand / 0.8
  //       );
  //       svg
  //         .append("g")
  //         .attr("mask", "url(#mask_" + key)
  //         .append("circle")
  //         .attr("r", "1")
  //         .attr(
  //           "fill",
  //           "rgba(" + color[0] + "," + color[1] + "," + color[2] + ",0.7)"
  //         )
  //         .append("animateMotion")
  //         .attr("begin", Math.random() * 2 + "s")
  //         .attr("dur", Math.random() * 20 + 4 + "s")
  //         .attr("repeatCount", "indefinite")
  //         .attr("path", "" + cells[key].d);
  //     }
  //   }
  // };

  return (
    <div
      className="fixed left-0 top-0 -z-10
     h-full min-h-[200px] w-full
     overflow-hidden bg-gradient-to-tr from-türkis-800 to-blau-800 brightness-125 grayscale-[30%]
     "
    >
      <div className="hidden h-full w-full opacity-10 grayscale-[40%]">
        <img
          alt=""
          className="absolute -left-[10%] -top-[10%] h-1/6 md:h-2/6 lg:h-3/6 xl:h-4/5 "
          src={Bubbles3TransURL}
        />
        <img
          alt=""
          className="absolute -right-[10%] top-20 h-1/6 md:h-2/6 lg:h-3/6 xl:-top-[10%] xl:h-4/6"
          src={Bubbles1TransURL}
        />
        <img
          alt=""
          className="absolute -bottom-[20%] right-[30%] hidden h-1/2 xl:block"
          src={Bubbles2TransURL}
        />
      </div>
      <svg
        className=" opacity-10"
        id="patternId"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="a"
            patternUnits="userSpaceOnUse"
            width="72.69"
            height="42"
            patternTransform="scale(2) rotate(20)"
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="hsla(0, 0%, 0%, 1)"
            />
            <path
              d="M0 0v9.09l19.4 11.2 4.83-2.8 3.03-5.24v-5.6L15.72 0Zm28.48 0v16.45L9.09 27.66v5.59l3.02 5.25 4.84 2.8 19.4-11.22L55.73 41.3l4.83-2.8 3.03-5.25v-5.58l-19.4-11.2V0Zm28.48 0L45.43 6.66v5.59l3.03 5.25 4.83 2.79 19.4-11.2V0ZM0 12.25V42h15.74l-7.87-4.55v-22.4l-4.84-2.8Zm69.66 0-4.84 2.8v22.4L56.95 42H72.7V12.25Zm-36.34 21-4.84 2.8V42H44.2v-5.96l-4.84-2.8z"
              strokeWidth="1"
              stroke="none"
              fill="hsla(180, 32%, 28%, 1)"
            />
            <path
              d="m18.17 0 9.09 5.25V0Zm27.26 0v5.25L54.52 0ZM63.6 15.74 54.5 21l9.1 5.25v-10.5Zm-54.51 0v10.5L18.17 21Zm18.17 21L18.16 42h9.1zm18.17 0V42h9.06l.02-.01zM54.5 42h.01z"
              strokeWidth="1"
              stroke="none"
              fill="hsla(224, 37%, 51%, 1)"
            />
            <path
              d="M0 0v3.5l24.23 14 3.02-1.75v-3.5L6.06 0Zm33.32 0v19.24l-24.23 14v3.5l3.02 1.76 24.23-14 24.23 14 3.03-1.75v-3.5l-24.23-14V0Zm33.31 0-21.2 12.25v3.5l3.03 1.74 24.23-14v.01V0Zm6.06 10.5-3.03 1.75v28L66.62 42h6.07V10.5ZM0 10.5V42h6.05l-3.02-1.74V12.25Zm36.34 21-3.02 1.74V42h6.05v-8.75Z"
              strokeWidth="1"
              stroke="none"
              fill="hsla(224, 37%, 18%, 1)"
            />
          </pattern>
        </defs>
        <rect
          width="800%"
          height="800%"
          transform="translate(0,0)"
          fill="url(#a)"
        />
      </svg>
      {showFancyBG ? (
        <>
          <div className="fancyBG" />
        </>
      ) : null}
    </div>
  );
};

export default Background;
