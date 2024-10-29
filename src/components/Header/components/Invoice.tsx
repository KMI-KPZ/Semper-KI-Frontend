import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading, Text } from "@component-library/index";
import useEvents from "@/hooks/useEvents/useEvents";
import CloseIcon from "@mui/icons-material/Close";
import useDeleteEvent from "@/api/Events/Mutations/useDeleteEvent";
import useDeleteEvents from "@/api/Events/Mutations/useDeleteEvents";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Event } from "@/hooks/useEvents/EventTypes";
import { useNavigate } from "react-router-dom";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";

interface HeaderInvoiceProps {
  closeInvoice: () => void;
}

const HeaderInvoice: React.FC<HeaderInvoiceProps> = (props) => {
  const { closeInvoice } = props;
  const { t } = useTranslation();
  const { events } = useEvents();
  const deleteEvent = useDeleteEvent();
  const deleteEvents = useDeleteEvents();
  const navigate = useNavigate();

  const handleOnClickButtonDeleteEvent = (eventID: string) => {
    deleteEvent.mutate(eventID);
  };

  const handleOnClickButtonDeleteEvents = () => {
    deleteEvents.mutate();
  };

  const handleOnClickButtonEvent = (event: Event) => {
    switch (event.eventType) {
      case "projectEvent":
        closeInvoice();
        navigate(`/projects/${event.eventData.projectID}`);
        deleteEvent.mutate(event.eventID);
        break;
      case "processEvent":
        closeInvoice();
        navigate(
          `/projects/${event.eventData.projectID}/${event.eventData.processID}`
        );
        deleteEvent.mutate(event.eventID);
        break;
      case "orgaEvent":
        closeInvoice();
        navigate(`organization`);
        deleteEvent.mutate(event.eventID);
        break;
    }
  };

  const getEventContent = (event: Event): string => {
    switch (event.eventData.reason) {
      case "test":
        return event.eventData.content;
      case "files":
        return event.eventData.content;
      case "messages":
        return `"` + event.eventData.content + `"`;
      case "serviceDetails":
        return event.eventData.content;
      case "serviceType":
        return event.eventData.content;
      case "serviceStatus":
        return event.eventData.content;
      case "processDetails":
        return event.eventData.content;
      case "processStatus":
        return t(
          `enum.ProcessStatus.${
            ProcessStatus[
              Number(event.eventData.content)
            ] as keyof typeof ProcessStatus
          }`
        );
      case "provisionalContractor":
        return event.eventData.content;
      case "dependenciesIn":
        return event.eventData.content;
      case "dependenciesOut":
        return event.eventData.content;
      case "roleChanged":
        return event.eventData.content;
      case "userDeleted":
        return event.eventData.content;
    }
  };

  return (
    <Container
      className="card absolute left-0 top-20 z-40 max-h-[80vh] gap-3 overflow-y-auto bg-white  p-0"
      direction="col"
      justify="start"
      align="center"
      width="fit"
    >
      <Container
        width="full"
        direction="row"
        justify="between"
        className="sticky top-0 z-50 border-b-2 bg-white p-5"
      >
        <Heading variant="h2">
          {t("components.Header.HeaderInvoice.title")}
        </Heading>
        <Button
          title={t("components.Header.HeaderInvoice.close")}
          children={<CloseIcon />}
          size="sm"
          variant="text"
          onClick={closeInvoice}
        />
      </Container>

      <Container width="full" direction="col" className="gap-3 p-3">
        {events.length === 0 ? (
          <Text>{t("components.Header.HeaderInvoice.noEvents")}</Text>
        ) : (
          <>
            <Button
              title={t("components.Header.HeaderInvoice.deleteAll")}
              startIcon={<DeleteOutlineOutlinedIcon />}
              size="sm"
              variant="secondary"
              className=""
              onClick={handleOnClickButtonDeleteEvents}
            />
            {events.map((event, index) => (
              <Container
                key={index}
                className=" relative gap-2 rounded-md border-2 p-3 duration-300 hover:cursor-pointer hover:border-gray-300 hover:bg-gray-50"
                width="full"
                align="start"
                direction="col"
                onClick={() => handleOnClickButtonEvent(event)}
              >
                <Button
                  title={t("components.Header.HeaderInvoice.delete")}
                  children={<DeleteOutlineOutlinedIcon />}
                  size="sm"
                  variant="text"
                  className="absolute right-1 top-1"
                  onClick={() => handleOnClickButtonDeleteEvent(event.eventID)}
                />
                <Heading variant="h3">
                  {t(`types.EventDataReason.${event.eventData.reason}`)}
                </Heading>
                <Text>{getEventContent(event)}</Text>
                <Text>{event.createdWhen.toLocaleString()}</Text>
              </Container>
            ))}
          </>
        )}
      </Container>
    </Container>
  );
};

export default HeaderInvoice;
