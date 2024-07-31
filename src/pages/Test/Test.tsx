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
import logger from "@/hooks/useLogger";
import ExampleForm from "@/components/Form/ExampleForm";
import useReloadPermissions from "@/api/Permissions/Mutations/useReloadPermissions";
import useDynamicButtonRequest from "@/api/Test/Mutations/useDynamicButtonRequest";
import useGetDynamicTestButtons, {
  TestDynamicProps,
} from "@/api/Test/Querys/useGetDynamicTestButtons";
import useSaveProjects from "@/api/Project/Mutations/useSaveProjects";

interface Props {}
export const Test: React.FC<Props> = (props) => {
  const { socket, events } = useEvents();
  const [open, setOpen] = useState(false);
  const reloadPermissions = useReloadPermissions();

  const saveProjects = useSaveProjects();
  const dynamicButtonRequest = useDynamicButtonRequest();
  const testDynamicQuery = useGetDynamicTestButtons();

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
    saveProjects.mutate();
  };

  const handleOnButtonClick = (props: TestDynamicProps) => {
    dynamicButtonRequest.mutate(props);
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
    <div className="flex w-full snap-mandatory flex-col items-center justify-start gap-5">
      <Container direction="col" className="bg-white p-5">
        <Heading variant="h1">TestPage</Heading>
      </Container>

      <Container direction="col" className="bg-white p-5">
        <Heading variant="h2">Events</Heading>
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
      <Button
        title="reloadPermissions"
        onClick={() => {
          reloadPermissions;
        }}
      />
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
        className="h-screen snap-center flex-wrap rounded-xl border-2 border-white bg-white p-5"
      >
        <ExampleForm />
      </Container>
      <Container
        direction="row"
        className="h-screen max-w-md snap-center snap-always flex-wrap rounded-xl border-2 border-white bg-white p-5"
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
      <div className="flex h-96 snap-y flex-col gap-5 overflow-auto">
        <div className="h-60 w-96 shrink-0 snap-center bg-red-500 "></div>
        <div className="h-60 w-80 shrink-0 snap-center bg-blue-500">2</div>
        <div className="h-60 w-80 shrink-0 snap-center  bg-green-500">3</div>
        <div className="h-60 w-80 shrink-0 snap-center  bg-yellow-500">4</div>
        <div className="h-60 w-80 shrink-0 snap-center  bg-purple-500">5</div>
        <div className="h-60 w-80 shrink-0 snap-center  bg-red-500">1</div>
        <div className="h-60 w-80 shrink-0 snap-center  bg-blue-500">2</div>
        <div className="h-60 w-80 shrink-0 snap-center  bg-green-500">3</div>
        <div className="h-60 w-80 shrink-0 snap-center  bg-yellow-500">4</div>
        <div className="h-60 w-80 shrink-0 snap-center  bg-purple-500">5</div>
      </div>
    </div>
  );
};
