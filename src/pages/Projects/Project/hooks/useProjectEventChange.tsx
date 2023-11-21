import { useContext, useEffect } from "react";
import { ProcessProps } from "../../hooks/useProcess";
import { DeleteProjectEvent } from "@/pages/App/types";
import { EventContext } from "@/contexts/EventContextProvider";
import useEvents from "@/hooks/useEvents/useEvents";

interface ReturnProps {
  getDeleteProjectEvent: (type: "status" | "message") => DeleteProjectEvent;
}

const useProjectEventChange = (
  process: ProcessProps,
  projectCollectionID: string,
  chatOpen: boolean
): ReturnProps => {
  const { deleteEvent } = useEvents();

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
