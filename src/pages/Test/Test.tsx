import React, { ReactNode, useRef } from "react";
import { Button } from "@component-library/index";
import { Container } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingAnimation, LoadingSuspense } from "@component-library/index";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useEvents from "@/hooks/useEvents/useEvents";
import logger from "@/hooks/useLogger";
import ExampleForm from "@/components/Form/ExampleForm";
import useReloadPermissions from "@/api/Permissions/Mutations/useReloadPermissions";
import useDynamicButtonRequest from "@/api/Test/Mutations/useDynamicButtonRequest";
import useGetDynamicTestButtons, {
  TestDynamicProps,
} from "@/api/Test/Querys/useGetDynamicTestButtons";
import useSaveProjects from "@/api/Project/Mutations/useSaveProjects";
import useGetPrivateGraph from "@/api/Graph/Querys/useGetPrivateGraph";
import NetworkGraph from "@/components/NetworkGraph/GraphViewer";

interface Props {}
export const Test: React.FC<Props> = (props) => {
  const {} = props;
  const { socket, events } = useEvents();
  const reloadPermissions = useReloadPermissions();

  const saveProjects = useSaveProjects();
  const dynamicButtonRequest = useDynamicButtonRequest();
  const testDynamicQuery = useGetDynamicTestButtons();
  const graph = useGetPrivateGraph();
  const horizontalScroll = useRef<HTMLDivElement>(null);

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

  const handleOnButtonClickScrollLeft = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    scroll("left");
  };
  const handleOnButtonClickScrollRight = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    scroll("right");
  };

  const scroll = (dir: "left" | "right") => {
    if (horizontalScroll.current !== null) {
      if (dir === "left") {
        logger("scroll", horizontalScroll.current);
        horizontalScroll.current.scrollLeft =
          horizontalScroll.current.scrollLeft - 300;
      } else {
        horizontalScroll.current.scrollLeft =
          horizontalScroll.current.scrollLeft + 300;
      }
    }
  };

  return (
    <div className="flex w-full snap-mandatory flex-col items-center justify-start gap-5">
      <Container direction="col" className="bg-white p-5">
        <Heading variant="h1">TestPage</Heading>
      </Container>

      {graph.isFetched && graph.data !== undefined ? (
        <NetworkGraph edges={graph.data.edges} nodes={graph.data.nodes} />
      ) : (
        <LoadingAnimation />
      )}

      <div className="container relative  h-[400px] w-[400px] bg-slate-500 ">
        <div
          className="peer/big absolute left-1/2 top-1/2 z-10 flex h-40 w-40 -translate-x-20 -translate-y-20 items-center justify-center rounded-full border-2 bg-blue-500 duration-300 hover:cursor-pointer hover:border-orange-500 active:border-green-500 active:bg-green-300"
          onClick={() => logger("big")}
        >
          Hover Here
        </div>
        <div
          className=" absolute left-20 top-20 h-20 w-20 rounded-full bg-white duration-300 hover:cursor-pointer hover:bg-gray-500 active:border-red-500 active:bg-red-300 peer-hover/big:animate-pulse peer-hover/big:bg-orange-500"
          onClick={() => logger("small lt")}
        />
        <div
          className=" absolute right-20 top-20 h-20  w-20 rounded-full bg-white duration-300 hover:cursor-pointer hover:bg-gray-500 active:border-red-500  active:bg-red-300 peer-hover/big:animate-ping  peer-hover/big:bg-orange-500"
          onClick={() => logger("small rt")}
        />
        <div
          className=" absolute bottom-20 right-20  h-20 w-20 rounded-full bg-white duration-300 hover:cursor-pointer hover:bg-gray-500 active:border-red-500 active:bg-red-300 peer-hover/big:animate-bounce  peer-hover/big:bg-orange-500"
          onClick={() => logger("small rb")}
        />
        <div
          className=" absolute bottom-20 left-20 flex h-20 w-20  items-center justify-center rounded-full bg-white duration-300 hover:cursor-pointer hover:bg-gray-500 active:border-red-500 active:bg-red-300 peer-hover/big:animate-spin  peer-hover/big:bg-orange-500"
          onClick={() => logger("small lb")}
        >
          LOL
        </div>
      </div>

      <Container
        direction="col"
        width="full"
        className="container bg-white p-5"
      >
        <Heading variant="h2">Events</Heading>
        {events.length > 0
          ? events.map((event, index) => (
              <Container
                direction="col"
                justify="start"
                align="start"
                className="card"
                width="full"
                key={index}
              >
                <table className="auto border-separate border-spacing-3">
                  <tbody>
                    <tr>
                      <th>UserHashedID</th>
                      <th className="whitespace-pre-wrap break-words">
                        {event.userHashedID}
                      </th>
                    </tr>
                    <tr>
                      <td>EventID</td>
                      <td>{event.eventID}</td>
                    </tr>
                    <tr>
                      <td>CreatedWhen</td>
                      <td>{event.createdWhen.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>EventType</td>
                      <td>{event.eventType}</td>
                    </tr>
                    <tr>
                      <td>TriggerEvent</td>
                      <td>{event.triggerEvent === true ? "True" : "False"}</td>
                    </tr>
                  </tbody>
                </table>
                {event.eventType === "projectEvent" ? (
                  <Container
                    direction="col"
                    justify="start"
                    align="start"
                    className="card"
                  >
                    <table className="auto border-separate border-spacing-3">
                      <tbody>
                        <tr>
                          <th>ProjectID</th>
                          <th>{event.projectID}</th>
                        </tr>
                        {event.processEvents.map((processEvent, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td>ProcessID</td>
                              <td>{processEvent.processID}</td>
                            </tr>
                            <tr>
                              <td>Status:</td>
                              <td>{processEvent.processStatus}</td>
                            </tr>
                            <tr>
                              <td>Files:</td>
                              <td>{processEvent.files}</td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </Container>
                ) : null}
              </Container>
            ))
          : "No Events"}
      </Container>
      <Button title="Close WebSocket" onClick={closeSocket} />

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
        className="h-screen snap-center flex-wrap rounded-md border-2 border-white bg-white p-5"
      >
        <ExampleForm />
      </Container>
      <Container
        direction="row"
        className="h-screen max-w-md snap-center  flex-wrap rounded-md border-2 border-white bg-white p-5"
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
          className="max-w-4xl flex-wrap overflow-clip rounded-md border-2 border-white p-5"
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
      <div className="relative flex h-fit w-full  items-center justify-start">
        <a
          href="#"
          onClick={handleOnButtonClickScrollLeft}
          className="invisible absolute left-5 flex h-8 w-8 flex-row items-center justify-center rounded-full border-2 bg-white p-5 md:visible"
        >
          {" < "}
        </a>
        <a
          href="#"
          onClick={handleOnButtonClickScrollRight}
          className="invisible absolute right-5 flex h-8 w-8 flex-row items-center justify-center rounded-full border-2 bg-white p-5 md:visible"
        >
          {" > "}
        </a>
        <div
          ref={horizontalScroll}
          className="flex h-fit w-full snap-x snap-mandatory flex-row items-center justify-start gap-5 overflow-auto scroll-smooth px-5 md:overflow-hidden"
        >
          <div className="flex h-80 w-80 shrink-0 snap-center  items-center justify-center  bg-red-500 ">
            vrtvrtvrt
          </div>
          <div className="flex h-80 w-80 shrink-0 snap-center  items-center justify-center bg-blue-500">
            2vtthvrvhtsr
          </div>
          <div className="flex h-80 w-80 shrink-0 snap-center  items-center justify-center  bg-green-500">
            kzukzukzu3
          </div>
          <div className="flex h-80 w-80 shrink-0 snap-center  items-center justify-center bg-yellow-500">
            zukzukw34tbej 4
          </div>
          <div className="flex h-80 w-80 shrink-0 snap-center  items-center justify-center bg-purple-500">
            etzje546je56j5
          </div>
          <div className="flex h-80 w-80 shrink-0 snap-center  items-center justify-center bg-red-500">
            14w4w5z q36e7k67kj
          </div>
          <div className="flex h-80 w-80 shrink-0 snap-center items-center justify-center bg-blue-500">
            2435vhjmzf8ki687i
          </div>
          <div className="flex h-80 w-80 shrink-0 snap-center items-center justify-center bg-green-500">
            34jhd bgzerbh gizuhaoergh 3
          </div>
          <div className="flex h-80 w-80 shrink-0 snap-center items-center justify-center bg-yellow-500">
            4iurwenoiengnuizhmoidtnmz
          </div>
          <div className="  flex h-80 w-80 shrink-0 snap-center items-center justify-center bg-purple-500">
            5oiwjuienntusö
          </div>
        </div>
      </div>
      <div className="flex h-96 w-fit snap-y snap-mandatory flex-col items-center justify-start gap-5 overflow-auto px-5 md:overflow-clip">
        <div className="flex h-80 w-80 shrink-0 snap-center items-center justify-center  bg-red-500 ">
          vrtvrtvrt
        </div>
        <div className="flex h-80 w-80 shrink-0 snap-center items-center justify-center bg-blue-500">
          2vtthvrvhtsr
        </div>
        <div className="flex h-80 w-80 shrink-0 snap-center items-center justify-center  bg-green-500">
          kzukzukzu3
        </div>
        <div className="flex h-80 w-80 shrink-0 snap-center items-center justify-center bg-yellow-500">
          zukzukw34tbej 4
        </div>
        <div className="flex h-80 w-80 shrink-0 snap-center items-center justify-center bg-purple-500">
          etzje546je56j5
        </div>
        <div className="flex h-80 w-80 shrink-0 snap-center items-center justify-center bg-red-500">
          14w4w5z q36e7k67kj
        </div>
        <div className="flex h-80 w-80 shrink-0 snap-center items-center justify-center bg-blue-500">
          2435vhjmzf8ki687i
        </div>
        <div className="flex h-80 w-80 shrink-0 snap-center items-center justify-center bg-green-500">
          34jhd bgzerbh gizuhaoergh 3
        </div>
        <div className="flex h-80 w-80 shrink-0 snap-center items-center justify-center bg-yellow-500">
          4iurwenoiengnuizhmoidtnmz
        </div>
        <div className="flex h-80 w-80 shrink-0 snap-center items-center justify-center bg-purple-500">
          5oiwjuienntusö
        </div>
      </div>
    </div>
  );
};
