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

interface HeaderInvoiceProps {
  closeInvoice: () => void;
}

const HeaderInvoice: React.FC<HeaderInvoiceProps> = (props) => {
  const { closeInvoice } = props;
  const { t } = useTranslation();
  const { events, getEventContent } = useEvents();
  const deleteEvent = useDeleteEvent();
  const deleteEvents = useDeleteEvents();
  const navigate = useNavigate();

  const handleOnClickButtonDeleteEvent = (eventID: string) => {
    deleteEvent.mutate(eventID);
  };

  const handleOnClickButtonDeleteEvents = () => {
    deleteEvents.mutate();
    closeInvoice();
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
          `/projects/${event.eventData.projectID}/${
            event.eventData.processID
          }#${
            event.eventData.additionalInformation === undefined
              ? "newest"
              : event.eventData.additionalInformation.origin
          }`
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

  return (
    <Container
      className="card absolute left-0 top-20 z-40 max-h-[80vh] gap-3 overflow-y-auto bg-white  p-0"
      direction="col"
      justify="start"
      items="center"
      width="fit"
    >
      <Container
        width="full"
        direction="row"
        justify="between"
        className="sticky top-0 z-50 border-b-2 bg-white p-5"
      >
        <Heading variant="h2">{t("components.Header.Invoice.heading")}</Heading>
        <Button
          title={t("components.Header.Invoice.close")}
          children={<CloseIcon />}
          size="sm"
          variant="text"
          onClick={closeInvoice}
        />
      </Container>

      <Container width="full" direction="col" className="gap-3 p-3">
        {events.length === 0 ? (
          <Text>{t("components.Header.Invoice.noEvents")}</Text>
        ) : (
          <>
            <Button
              title={t("components.Header.Invoice.deleteAll")}
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
                items="start"
                tabIndex
                direction="col"
                onClick={() => handleOnClickButtonEvent(event)}
              >
                <Button
                  title={t("components.Header.Invoice.delete")}
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
