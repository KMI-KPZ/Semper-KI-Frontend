import { useEffect } from "react";

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
