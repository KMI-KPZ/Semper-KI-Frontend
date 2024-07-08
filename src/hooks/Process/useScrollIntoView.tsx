import { useEffect } from "react";
import logger from "../useLogger";

interface useScrollIntoViewReturnProps {}

const useScrollIntoView = (): useScrollIntoViewReturnProps => {
  useEffect(() => {
    const id = window.location.hash;
    if (id) {
      const element = document.getElementById(id.replace("#", ""));
      //   logger("useScrollIntoView | useEffect | id", element);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [window.location.hash]);
  return {};
};

export default useScrollIntoView;
