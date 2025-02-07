import { ProcessContext } from "@/contexts/ProcessContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface useLoadGroupIDProps {
  setActiveGroup?: (groupID: number) => void;
}

const useLoadGroupID = (props: useLoadGroupIDProps) => {
  const { setActiveGroup } = props;
  const { loadGroup, setLoadGroup } = useContext(ProcessContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (setActiveGroup !== undefined && loadGroup.groupID !== undefined) {
      setActiveGroup(loadGroup.groupID);
      setLoadGroup({
        groupID: undefined,
        navLink: loadGroup.navLink,
        loadNav: loadGroup.navLink !== undefined,
      });
    }
  }, [loadGroup, setActiveGroup]);

  useEffect(() => {
    if (
      loadGroup.navLink !== undefined &&
      loadGroup.loadNav !== undefined &&
      loadGroup.loadNav
    ) {
      navigate(loadGroup.navLink);
      setLoadGroup({ groupID: undefined, navLink: undefined, loadNav: false });
    }
  }, [loadGroup]);
};

export default useLoadGroupID;
