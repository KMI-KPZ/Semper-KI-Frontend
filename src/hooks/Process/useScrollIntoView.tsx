import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProcess from "./useProcess";
interface useScrollIntoViewReturnProps {}

const useScrollIntoView = (newestID?: string): useScrollIntoViewReturnProps => {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const {} = useProcess();

  useEffect(() => {
    // const elementId = hash.slice(1);
    // if (elementId) {
    //   const element = document.getElementById(
    //     elementId === "newest" && newestID !== undefined ? newestID : elementId
    //   );
    //   // logger("useScrollIntoView | useEffect | id", element, newestID);
    //   if (element) {
    //     setTimeout(() => {
    //       element.scrollIntoView({ behavior: "smooth", block: "start" });
    //       navigate("# ");
    //       history.replaceState(null, "", " ");
    //     }, 500);
    //   }
    // }
    const elementId = hash.slice(1);
    if (elementId) {
      const element = document.getElementById(
        elementId === "newest" && newestID !== undefined ? newestID : elementId
      );
      // logger("useScrollIntoView | useEffect | id", element, newestID);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        navigate("# ");
        history.replaceState(null, "", " ");
      }
    }
  }, [hash, newestID]);
  return {};
};

export default useScrollIntoView;
