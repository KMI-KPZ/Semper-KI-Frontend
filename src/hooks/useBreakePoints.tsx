import { useState, useEffect } from "react";

export const useBreakpoint = () => {
  const getBreakpoint = () => {
    if (window.matchMedia("(min-width: 1280px)").matches) {
      return "xl";
    } else if (window.matchMedia("(min-width: 1024px)").matches) {
      return "lg";
    } else if (window.matchMedia("(min-width: 768px)").matches) {
      return "md";
    } else if (window.matchMedia("(min-width: 640px)").matches) {
      return "sm";
    } else {
      return "default";
    }
  };

  const [breakpoint, setBreakpoint] = useState(getBreakpoint);

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};
