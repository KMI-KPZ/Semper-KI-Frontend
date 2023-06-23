import { useEffect } from "react";
import { GuideState } from "..";

interface ReturnProps {}

const useGuideState = (
  path: string | undefined,
  setState: React.Dispatch<React.SetStateAction<GuideState>>
): ReturnProps => {
  useEffect(() => {
    if (path !== undefined) {
      setState((prevState) => ({ ...prevState, menuOpen: true }));
    }
  }, [path]);
  return {};
};

export default useGuideState;
