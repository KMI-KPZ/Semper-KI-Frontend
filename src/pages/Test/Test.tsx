import { ReactNode, useContext, useState } from "react";
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
import useTest, { TestDynamicProps } from "./hooks/useTest";
import { EventContext } from "@/contexts/EventContextProvider";
import { PermissionContext } from "@/contexts/PermissionContextProvider";
import { LoadingAnimation, LoadingSuspense } from "@component-library/Loading";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {}
export const Test: React.FC<Props> = (props) => {
  const { socket, events } = useContext(EventContext);
  const [open, setOpen] = useState(false);
  const { reloadPermissions } = useContext(PermissionContext);
  const { saveProjectsQuery, testDynamicQuery, dynamicButtonMutation } =
    useTest();
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
    saveProjectsQuery.mutate();
  };

  const handleOnButtonClick = (props: TestDynamicProps) => {
    dynamicButtonMutation.mutate(props);
  };

  const getButtonIcon = (icon: string): ReactNode => {
    switch (icon) {
      case "Edit":
        return <EditIcon />;
      case "Delete":
        return <DeleteIcon />;
      default:
        return;
    }
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
        title="TestRender"
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
      <LoadingSuspense query={testDynamicQuery}>
        <Container
          direction="row"
          className="max-w-4xl flex-wrap overflow-clip rounded-xl border-2 p-5"
        >
          {testDynamicQuery.data !== undefined
            ? testDynamicQuery.data.map((item, index) => (
                <Button
                  key={index}
                  variant="icon"
                  title={item.title}
                  onClick={() => handleOnButtonClick(item)}
                  startIcon={getButtonIcon(item.icon)}
                />
              ))
            : null}
        </Container>
      </LoadingSuspense>
    </div>
  );
};
