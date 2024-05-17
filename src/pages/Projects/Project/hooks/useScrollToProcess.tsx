import { useEffect } from "react";
import { Process } from "../../hooks/useProcess";

const useScrollToProcess = (processID: string | undefined) => {
  useEffect(() => {
    if (processID !== undefined) {
      const processElement = document.getElementById(processID);
      if (processElement) {
        processElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [processID]);
};

export default useScrollToProcess;
