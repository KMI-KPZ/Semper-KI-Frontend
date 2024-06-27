import { Container, Text } from "@component-library/index";
import React, { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StatusWizardItem } from "../StatusWizard";
import { Process } from "@/api/Process/Querys/useGetProcess";
import logger from "@/hooks/useLogger";

interface StatusWizardCardProps {
  process: Process;
  item: StatusWizardItem;
}

const isCardInView = (item: StatusWizardItem): boolean => {
  const element = document.getElementById(item.text);
  if (element) {
    const rect = element.getBoundingClientRect();
    return rect.bottom >= 0 && rect.top <= window.innerHeight;
  }
  return false;
};

const StatusWizardCard: React.FC<StatusWizardCardProps> = (props) => {
  const { item, process } = props;
  const { t } = useTranslation();

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
    (item.startStatus !== undefined &&
      process.processStatus >= item.startStatus &&
      item.endStatus === undefined) ||
    (item.endStatus !== undefined && process.processStatus > item.endStatus);
  const onGoing =
    (process.processStatus === item.startStatus &&
      item.endStatus === undefined) ||
    (item.endStatus !== undefined && process.processStatus === item.endStatus);

  const handleOnClickCard = () => {
    const element = document.getElementById(
      item.id !== undefined ? item.id : item.text
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Container
      width="full"
      justify="start"
      onClick={handleOnClickCard}
      className={`rounded-xl border-2 p-2 hover:cursor-pointer hover:border-orange-100 hover:bg-gray-50 ${
        active ? "border-orange-500" : "border-slate-100"
      }
      ${inView ? "ring-2 ring-ultramarinblau " : "ring-0"}`}
    >
      {item.icon}
      <Text>{t(`Process.StatusWizard.StatusWizard.item.${item.text}`)}</Text>
    </Container>
  );
};

export default StatusWizardCard;
