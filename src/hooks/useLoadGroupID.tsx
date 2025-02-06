import { ProcessContext } from "@/contexts/ProcessContext";
import { useContext, useEffect } from "react";

interface useLoadGroupIDProps {
  setActiveGroup?: (groupID: number) => void;
}

const useLoadGroupID = (props: useLoadGroupIDProps) => {
  const { setActiveGroup } = props;
  const { loadGroupID, setLoadGroupID } = useContext(ProcessContext);

  useEffect(() => {
    if (setActiveGroup !== undefined && loadGroupID !== undefined) {
      setActiveGroup(loadGroupID);
      setLoadGroupID(undefined);
    }
  }, [loadGroupID, setActiveGroup]);
};

export default useLoadGroupID;
