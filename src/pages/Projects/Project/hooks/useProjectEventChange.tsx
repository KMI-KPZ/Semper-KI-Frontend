import { AppContext } from "@/pages/App/App";
import { useContext, useEffect } from "react";
import { ProcessProps } from "../../hooks/useProcess";
import { DeleteProjectEvent } from "@/pages/App/types";

interface ReturnProps {
  getDeleteProjectEvent: (type: "status" | "message") => DeleteProjectEvent;
}

const useProjectEventChange = (
  process: ProcessProps,
  projectCollectionID: string,
  chatOpen: boolean
): ReturnProps => {
  const { deleteEvent } = useContext(AppContext);

  const getDeleteProjectEvent = (
    type: "status" | "message"
  ): DeleteProjectEvent => {
    const deleteProjectEvent: DeleteProjectEvent = {
      eventType: "projectEvent",
      projectID: projectCollectionID,
      processID: process.processID,
      type: type,
    };
    return deleteProjectEvent;
  };

  useEffect(() => {
    deleteEvent(getDeleteProjectEvent("status"));
    if (chatOpen) deleteEvent(getDeleteProjectEvent("message"));
  }, [process]);

  return { getDeleteProjectEvent };
};

export default useProjectEventChange;
