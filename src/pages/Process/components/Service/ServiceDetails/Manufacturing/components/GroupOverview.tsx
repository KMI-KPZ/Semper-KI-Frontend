import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Divider, Heading } from "@component-library/index";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ManufacturingServiceProps } from "@/api/Service/Querys/useGetServices";
import { ManufactoringProcessProps } from "@/api/Process/Querys/useGetProcess";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import logger from "@/hooks/useLogger";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";

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

  const groups: ManufacturingServiceProps[] = process.serviceDetails;
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const updatedProcess = useUpdateProcess();

  useEffect(() => {
    const currentActiveGroup = buttonRefs.current[activeGroup];
    if (currentActiveGroup !== null) {
      currentActiveGroup.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [activeGroup]);

  const handleOnClickGroup = (group: number) => {
    changeActiveGroup(group);
  };

  const handleOnClickNextGroup = () => {
    changeActiveGroup((activeGroup + 1) % groups.length);
  };

  const handleOnClickPreviousGroup = () => {
    changeActiveGroup((activeGroup - 1 + groups.length) % groups.length); // Adding groups.length to prevent negative values
  };

  const handleOnClickNewGroup = () => {
    updatedProcess.mutate({
      processIDs: [process.processID],
      updates: {
        changes: {
          serviceDetails: {
            groups: [...groups, {}],
          },
        },
      },
    });
  };

  const handleOnClickDelete = (index: number) => {
    logger("delete group", index);
  };

  return (
    <Container
      width="full"
      direction="col"
      justify="start"
      align="start"
      className="rounded-md border-2 "
    >
      <Container
        width="full"
        direction="col"
        justify="center"
        align="start"
        className="p-3 pb-0"
      >
        <Heading variant="h3">
          {t(
            "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.heading"
          )}
        </Heading>
      </Container>
      <Divider />
      <Container
        width="full"
        direction="row"
        justify="between"
        className="p-3 pt-0"
      >
        <Button
          title={t(
            "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.previousGroup"
          )}
          className="rounded-full border-2 p-2 hover:cursor-pointer hover:bg-slate-50"
          onClick={handleOnClickPreviousGroup}
        >
          <KeyboardArrowLeftIcon />
        </Button>
        <Container
          width="full"
          direction="row"
          justify="start"
          className="max-w-3xl overflow-auto "
        >
          {groups.map((group, index) => (
            <div
              ref={(el) => (buttonRefs.current[index] = el)}
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
              className={`flex flex-row items-center  rounded-md border-2 p-2 hover:cursor-pointer hover:bg-slate-50 ${
                activeGroup === index ? "border-blau-button " : ""
              }`}
            >
              <table className="w-fit table-auto border-separate border-spacing-1 border-spacing-x-2">
                <tbody>
                  <tr>
                    <th className="text-left">
                      {t(
                        "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.model"
                      )}
                    </th>
                    <td className="whitespace-nowrap">
                      {group.models !== undefined && group.models.length > 0
                        ? group.models.map((model) => model.fileName).join(", ")
                        : t(
                            "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.noModel"
                          )}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">
                      {t(
                        "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.material"
                      )}
                    </th>
                    <td className="whitespace-nowrap">
                      {group.material !== undefined
                        ? group.material.title
                        : t(
                            "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.noMaterial"
                          )}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left">
                      {t(
                        "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.postProcessing"
                      )}
                    </th>
                    <td className="whitespace-nowrap">
                      {group.postProcessings !== undefined &&
                      group.postProcessings.length > 0
                        ? group.postProcessings
                            .map((model) => model.title)
                            .join(", ")
                        : t(
                            "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.noPostProcessing"
                          )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Container width="fit" justify="center" align="center">
                <Button
                  size="sm"
                  variant="text"
                  title={t("general.button.delete")}
                  onClick={() => handleOnClickDelete(index)}
                >
                  <DeleteIcon />
                </Button>
              </Container>
            </div>
          ))}
          <Button
            title={t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.newGroup"
            )}
            className=" border-2 p-2 hover:bg-slate-50"
            onClick={handleOnClickNewGroup}
          >
            <AddIcon />
          </Button>
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
    </Container>
  );
};

export default ServiceManufacturingGroupOverview;
