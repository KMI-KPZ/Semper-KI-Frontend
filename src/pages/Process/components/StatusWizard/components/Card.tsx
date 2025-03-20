import { Badge, Container, Text } from "@component-library/index";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StatusWizardItem } from "../StatusWizard";
import { Process } from "@/api/Process/Querys/useGetProcess";
import { useNavigate } from "react-router-dom";
import useEvents from "@/hooks/useEvents/useEvents";

interface StatusWizardCardProps {
  process: Process;
  item: StatusWizardItem;
}

const isCardInView = (item: StatusWizardItem): boolean => {
  const element = document.getElementById(item.targetID);
  if (element) {
    const rect = element.getBoundingClientRect();
    return rect.bottom >= 0 && rect.top <= window.innerHeight;
  }
  return false;
};

const StatusWizardCard: React.FC<StatusWizardCardProps> = (props) => {
  const { item, process } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getProcessEvents } = useEvents();

  const originEvents = getProcessEvents(process.processID).filter(
    (event) =>
      event.eventData.additionalInformation !== undefined &&
      event.eventData.additionalInformation.origin === item.targetID
  );

  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setInView(isCardInView(item));
    };
    setInView(isCardInView(item));

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const active =
    item.startStatus !== undefined &&
    process.processStatus >= item.startStatus &&
    item.endStatus !== undefined &&
    process.processStatus <= item.endStatus;

  const reachable =
    (item.startStatus !== undefined &&
      process.processStatus >= item.startStatus) ||
    item.startStatus === undefined;

  const handleOnClickCard = () => {
    const element = document.getElementById(item.targetID);
    if (element && reachable) {
      navigate(`#${item.targetID}`);
    }
  };

  const handleOnKeyDownCard = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleOnClickCard();
    }
  };

  return (
    <Badge count={originEvents.length} containerClassName="w-full">
      <Container
        width="full"
        justify="start"
        direction="row"
        onClick={handleOnClickCard}
        onKeyDown={handleOnKeyDownCard}
        tabIndex={reachable}
        className={`justify-center rounded-md border-2 border-slate-100 bg-white p-2 duration-300 hover:bg-gray-100 md:justify-start   ${
          active ? "text-orange-600" : ""
        }
      ${reachable ? "hover:cursor-pointer hover:border-ultramarinblau " : ""}
      ${inView ? "ring-2 ring-ultramarinblau " : "ring-0"}`}
      >
        {item.icon}
        <Text>{t(`types.ProcessOrigin.${item.targetID}`)}</Text>
      </Container>
    </Badge>
  );
};

export default StatusWizardCard;
