import { ReactNode, useContext, useEffect, useState } from "react";
import { Button } from "@component-library/index";
import { Container } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import SaveIcon from "@mui/icons-material/Save";
import { EventContext } from "@/contexts/EventContextProvider";
import { PermissionContext } from "@/contexts/PermissionContextProvider";
import { LoadingAnimation, LoadingSuspense } from "@component-library/index";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import usePermissions from "@/hooks/usePermissions";
import useEvents from "@/hooks/useEvents/useEvents";
import useTest, { TestDynamicProps } from "@/api/Test/useTest";
import logger from "@/hooks/useLogger";
import ExampleForm from "@/components/Form/ExampleForm";

interface Props {}
export const Test: React.FC<Props> = (props) => {
  const { socket, events } = useEvents();
  const [open, setOpen] = useState(false);
  const { reloadPermissions } = usePermissions();

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
              <Container
                direction="col"
                justify="start"
                align="start"
                key={index}
              >
                <Text>{event.eventType}</Text>
                {event.eventType === "projectEvent"
                  ? event.events.map((projectEventItem, _index) => (
                      <Container
                        direction="col"
                        justify="start"
                        align="start"
                        key={_index}
                      >
                        <Text> ProjektID: {projectEventItem.projectID}</Text>
                        {projectEventItem.processes.map(
                          (processEventItem, __index) => (
                            <Container
                              direction="col"
                              justify="start"
                              align="start"
                              key={__index}
                            >
                              <Text>
                                ProcessID: {processEventItem.processID}
                              </Text>
                              <Text>
                                Status: {processEventItem.processStatus}
                              </Text>
                              <Text>Messages: {processEventItem.messages}</Text>
                            </Container>
                          )
                        )}
                      </Container>
                    ))
                  : null}
              </Container>
            ))
          : "No Events"}
      </Container>
      <Button title="Close WebSocket" onClick={closeSocket} />
      <Button title="open" onClick={openMenu}>
        Open
      </Button>
      <Button title="reloadPermissions" onClick={reloadPermissions} />
      <PermissionGate element={"ProjectButtonSave"}>
        <Button
          size="sm"
          startIcon={<SaveIcon />}
          title="Projekte in DB Speichern"
          onClick={handleOnClickButtonSave}
        />
      </PermissionGate>
      <Container
        direction="row"
        className=" max-w-md flex-wrap rounded-xl border-2 border-white bg-white p-5"
      >
        <div className="bg-red-500 p-5 backdrop-brightness-50">ergwerg</div>
      </Container>
      <Container
        direction="row"
        className="  flex-wrap rounded-xl border-2 border-white bg-white p-5"
      >
        <ExampleForm />
      </Container>
      <Container
        direction="row"
        className=" max-w-md flex-wrap rounded-xl border-2 border-white bg-white p-5"
      >
        <Text className="text-bold w-full px-3 text-center">ButtonTest</Text>
        <Button title="Primary Active" variant="primary" active />
        <Button title="Primary Passive" variant="primary" active={false} />
        <Button title="Secondary Active" variant="secondary" active />
        <Button title="Secondary Passive" variant="secondary" active={false} />
        <Button title="Tertiary Active" variant="tertiary" active />
        <Button title="Tertiary Passive" variant="tertiary" active={false} />
      </Container>
      <LoadingSuspense query={testDynamicQuery}>
        <Container
          direction="row"
          className="max-w-4xl flex-wrap overflow-clip rounded-xl border-2 border-white p-5"
        >
          {testDynamicQuery.data !== undefined
            ? testDynamicQuery.data.map((item, index) => (
                <Button
                  key={index}
                  variant="secondary"
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
