import { BodyScrollContext } from "@/contexts/BodyScrollContextProvider";
import { useContext } from "react";

interface ReturnProps {
  setBodyScroll(scroll: boolean): void;
}

const useBodyScroll = (): ReturnProps => {
  const { setBodyScroll } = useContext(BodyScrollContext);
  return {
    setBodyScroll,
  };
};

export default useBodyScroll;
