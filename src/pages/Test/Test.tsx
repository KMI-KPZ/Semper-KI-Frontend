import { ReactNode, useContext, useEffect, useState } from "react";
import { Button } from "@component-library/Button";
import Container from "@component-library/Container";
import { Heading, Text } from "@component-library/Typography";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import SaveIcon from "@mui/icons-material/Save";
import { EventContext } from "@/contexts/EventContextProvider";
import { PermissionContext } from "@/contexts/PermissionContextProvider";
import { LoadingAnimation, LoadingSuspense } from "@component-library/Loading";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import usePermissions from "@/hooks/usePermissions";
import useEvents from "@/hooks/useEvents/useEvents";
import useTest, { TestDynamicProps } from "@/api/Test/useTest";
import logger from "@/hooks/useLogger";

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
              <div key={index}>{JSON.stringify(event)}</div>
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
