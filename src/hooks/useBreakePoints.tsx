import { useState, useEffect } from "react";

export enum TWBreakpoint {
  default = 0,
  xs = 475,
  sm = 640,
  md = 768,
  lg = 1024,
  xl = 1280,
}

export const useBreakpoint = () => {
  const getBreakpoint = (): TWBreakpoint => {
    if (window.matchMedia(`(min-width: ${TWBreakpoint.xl}px)`).matches) {
      return TWBreakpoint.xl;
    } else if (window.matchMedia(`(min-width: ${TWBreakpoint.lg}px)`).matches) {
      return TWBreakpoint.lg;
    } else if (window.matchMedia(`(min-width: ${TWBreakpoint.md}px)`).matches) {
      return TWBreakpoint.md;
    } else if (window.matchMedia(`(min-width: ${TWBreakpoint.sm}px)`).matches) {
      return TWBreakpoint.sm;
    } else if (window.matchMedia(`(min-width: ${TWBreakpoint.xs}px)`).matches) {
      return TWBreakpoint.xs;
    } else {
      return TWBreakpoint.default;
    }
  };

  const [breakpoint, setBreakpoint] = useState<TWBreakpoint>(getBreakpoint);

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};
