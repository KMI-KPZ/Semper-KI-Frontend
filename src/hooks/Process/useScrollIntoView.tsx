import { useEffect } from "react";
import logger from "../useLogger";

interface useScrollIntoViewReturnProps {}

const useScrollIntoView = (newestID?: string): useScrollIntoViewReturnProps => {
  useEffect(() => {
    const hash = window.location.hash;
    const elementId = hash.slice(1);
    if (elementId) {
      const element = document.getElementById(
        elementId === "newest" && newestID !== undefined ? newestID : elementId
      );
      logger("useScrollIntoView | useEffect | id", element, newestID);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [window.location.hash]);
  return {};
};

export default useScrollIntoView;
