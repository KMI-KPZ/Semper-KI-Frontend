import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "@component-library/index";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ManufacturingServiceProps } from "@/api/Service/Querys/useGetServices";
import { ManufactoringProcessProps } from "@/api/Process/Querys/useGetProcess";

interface ServiceManufacturingGroupOverviewProps {
  process: ManufactoringProcessProps;
  activeGroup: number;
  changeActiveGroup: (group: number) => void;
}

const ServiceManufacturingGroupOverview: React.FC<
  ServiceManufacturingGroupOverviewProps
> = (props) => {
  const { process, activeGroup, changeActiveGroup } = props;
  const { t } = useTranslation();

  const groups: ManufacturingServiceProps[] = [
    process.serviceDetails,
    process.serviceDetails,
  ];

  const handleOnClickGroup = (group: number) => {
    changeActiveGroup(group);
  };

  const handleOnClickNextGroup = () => {
    changeActiveGroup((activeGroup + 1) % groups.length);
  };
  const handleOnClickPreviousGroup = () => {
    changeActiveGroup((activeGroup - 1) % groups.length);
  };

  return (
    <Container width="full" direction="row">
      <Button
        title={t(
          "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.previousGroup"
        )}
        className="rounded-full border-2 p-2 hover:cursor-pointer hover:bg-slate-50"
        onClick={handleOnClickPreviousGroup}
      >
        <KeyboardArrowLeftIcon />
      </Button>
      <Container width="full" direction="row">
        {groups.map((group, index) => (
          <Button
            title={t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.item",
              {
                name:
                  group.models !== undefined && group.models.length > 0
                    ? group.models.map((model) => model.fileName).join(", ")
                    : index,
              }
            )}
            onClick={() => handleOnClickGroup(index)}
            key={index}
            size="sm"
            variant={activeGroup === index ? "primary" : "secondary"}
          >
            {group.models !== undefined && group.models.length > 0
              ? group.models.map((model) => model.fileName).join(", ")
              : t(
                  "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.noModel"
                )}
          </Button>
        ))}
      </Container>
      <Button
        title={t(
          "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.nextGroup"
        )}
        className="rounded-full border-2 p-2 hover:cursor-pointer hover:bg-slate-50"
        onClick={handleOnClickNextGroup}
      >
        <KeyboardArrowRightIcon />
      </Button>
    </Container>
  );
};

export default ServiceManufacturingGroupOverview;
