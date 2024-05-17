import { useParams } from "react-router-dom";

interface useGeneralProcessReturnProps {
  getNavigationPrefix: (currentProcessID: string) => string;
}

const useGeneralProcess = (): useGeneralProcessReturnProps => {
  const { processID } = useParams();

  const getNavigationPrefix = (currentProcessID: string) => {
    const paramProcessIDAvaliable = processID !== undefined;
    const processIDsAreEqual = processID === currentProcessID;

    if (processIDsAreEqual) return "";
    if (!paramProcessIDAvaliable) return `${currentProcessID}/`;
    return `../${currentProcessID}/`;
  };

  return {
    getNavigationPrefix,
  };
};

export default useGeneralProcess;
