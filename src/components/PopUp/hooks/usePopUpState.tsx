import { AppContext } from "@/pages/App";
import { useContext, useEffect } from "react";

interface ReturnProps {}

const usePopUpState = (open: boolean): ReturnProps => {
  const { setAppState } = useContext(AppContext);

  useEffect(() => {
    setAppState((prevState) => ({ ...prevState, stopScroll: open }));
  }, [open]);

  return {};
};

export default usePopUpState;
