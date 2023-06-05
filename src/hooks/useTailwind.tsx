import tailwindConfig from "../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const fullConfig = resolveConfig(tailwindConfig);
const breakpoints = fullConfig.theme.screens;
type BreakpointKey = keyof typeof breakpoints;

type useTailwindTypes = {
  getBreakpointValue(value: string): number;
  getCurrentBreakpoint(): string;
};

function isBreakpointKey(value: string): value is BreakpointKey {
  return ["sm", "md", "lg", "xl", "2xl", "xs"].includes(value);
}

const useTailwind = (): useTailwindTypes => {
  const getBreakpointValue = (brakePoint: BreakpointKey): number => {
    // return +breakpoints[brakePoint]?.slice(0, -2);
    return 0;
  };

  const getCurrentBreakpoint = (): string => {
    let currentBreakpoint: string = "";
    // let biggestBreakpointValue = 0;
    // for (const _breakpoint of Object.keys(fullConfig.theme.screens)) {
    //   const breakpoint = isBreakpointKey(_breakpoint) ? _breakpoint : "xs";
    //   const breakpointValue = getBreakpointValue(breakpoint);
    //   if (
    //     breakpointValue > biggestBreakpointValue &&
    //     window.innerWidth >= breakpointValue
    //   ) {
    //     biggestBreakpointValue = breakpointValue;
    //     currentBreakpoint = breakpoint;
    //   }
    // }
    return currentBreakpoint;
  };
  return { getBreakpointValue, getCurrentBreakpoint };
};

export default useTailwind;
