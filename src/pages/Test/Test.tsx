import { useContext, useState } from "react";
import { Button } from "@component-library/Button";
import Modal from "@component-library/Modal";
import Bubbles1IMG from "../../../assets/images/Bubbles1_Trans.png";
import logger from "@/hooks/useLogger";
import usePermissions from "@/hooks/usePermissions";
import { AppContext } from "../App/App";
import Container from "@component-library/Container";
import { Heading } from "@component-library/Typography";
import TestRender from "./TestRender";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import SaveIcon from "@mui/icons-material/Save";
import useTest from "./hooks/useTest";
import { EventContext } from "@/contexts/EventContextProvider";
interface Props {}
export const Test: React.FC<Props> = (props) => {
  const { socket, events } = useContext(EventContext);
  const [open, setOpen] = useState(false);
  const { reloadPermissions } = usePermissions();
  const { safeProjectsQuery } = useTest();
  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  const closeSocket = () => {
    socket?.close();
  };
  const handleOnClickButtonSave = () => {
    safeProjectsQuery.mutate();
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5">
      <Container direction="col" className="bg-white p-5">
        <Heading variant="h1">Events</Heading>
        {events.length > 0
          ? events.map((event, index) => (
              <div key={index}>{JSON.stringify(event)}</div>
            ))
          : "No Events"}
      </Container>
      <Button title="Close WebSocket" onClick={closeSocket} />
      <Button title="open" onClick={openMenu}>
        Open
      </Button>
      <Button title="reloadPermissions" onClick={reloadPermissions} />
      <Modal
        open={open}
        closeModal={closeMenu}
        className="flex w-full flex-row"
      >
        <TestRender />
      </Modal>
      <PermissionGate element={"ProjectButtonSave"}>
        <Button
          size="sm"
          startIcon={<SaveIcon />}
          title="Projekte in DB Speichern"
          onClick={handleOnClickButtonSave}
        />
      </PermissionGate>
    </div>
  );
};
