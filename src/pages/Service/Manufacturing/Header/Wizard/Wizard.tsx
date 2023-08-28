import React from "react";
import ServiceManufacturingWizardItem from "./components/Card";
import _wizardItems from "./data/items.json";
import { useLocation } from "react-router-dom";
import useSubOrder from "@/pages/Order/SubOrder/hooks/useSubOrder";
const wizardItems: WizardItemProps[] = _wizardItems;

interface WizardItemProps {
  title: string;
  link: string;
}

interface Props {}

export const ServiceManufacturingWizard: React.FC<Props> = (props) => {
  const {} = props;
  const location = useLocation();

  const { getCurrentSubOrder } = useSubOrder();
  return (
    <div className="flex flex-col items-center justify-around gap-3 sm:flex-row sm:gap-0">
      {wizardItems.map((wizardItem: WizardItemProps, index: number) => (
        <ServiceManufacturingWizardItem
          key={index}
          title={wizardItem.title}
          path={wizardItem.link}
          active={location.pathname.includes(wizardItem.link)}
        />
      ))}
    </div>
  );
};
