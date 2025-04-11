import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading, Text } from "@component-library/index";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ManufacturingServiceProps } from "@/api/Service/Querys/useGetServices";
import {
  ManufactoringProcessProps,
  ProcessStatus,
} from "@/api/Process/Querys/useGetProcess";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import ProcessStatusGate from "@/components/Process/StatusGate";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Hint from "@/components/Hint/Hint";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

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

  const groups: ManufacturingServiceProps[] = process.serviceDetails.groups;
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = useState<boolean>(
    process.serviceDetails.groups.length > 1
  );
  const updatedProcess = useUpdateProcess();

  useEffect(() => {
    const currentActiveGroup = buttonRefs.current[activeGroup];
    if (currentActiveGroup !== null && buttonRefs.current.length > 0) {
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
            groups: [...groups.map(() => ({})), {}],
          },
        },
      },
    });
  };

  const handleOnClickDelete = (index: number) => {
    changeActiveGroup(0);
    updatedProcess.mutate(
      {
        processIDs: [process.processID],
        updates: {
          deletions: {
            serviceDetails: {
              groups: [
                ...groups.slice(0, index).map(() => ({})),
                { delete: true },
                ...groups.slice(index + 1).map(() => ({})),
              ],
            },
          },
        },
      },
      {
        onSuccess() {
          if (groups.length === 1) {
            changeActiveGroup(0);
            updatedProcess.mutate({
              processIDs: [process.processID],
              updates: {
                changes: {
                  serviceDetails: {
                    groups: [{}],
                  },
                },
              },
            });
          }
        },
      }
    );
  };

  return (
    <Container
      width="full"
      direction="col"
      justify="start"
      items="start"
      className="gap-0 rounded-md border-2 bg-white"
    >
      <Container
        width="full"
        direction="row"
        justify="center"
        items="center"
        className="gap-3 p-4 px-5"
      >
        <Heading variant="h3" className="whitespace-nowrap">
          {t(
            "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.heading"
          )}{" "}
          {t(
            `Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.group`,
            {
              count: groups.length,
            }
          )}
        </Heading>
        <Hint
          title={
            <Container width="full" direction="col" className="gap-0 p-2">
              <Text className="text-center">
                {t(
                  `Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.hint`
                )}
              </Text>
            </Container>
          }
        />
        <Container width="full">
          {!open ? (
            <Button
              title={t("general.button.expand")}
              children={<ExpandMoreIcon />}
              width="full"
              variant="text"
              size="xs"
              onClick={() => setOpen((prev) => !prev)}
            />
          ) : null}
        </Container>
      </Container>
      {open ? (
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
                className={`flex flex-row items-center rounded-md border-2 bg-gray-100 p-2 hover:cursor-pointer hover:bg-slate-50 ${
                  activeGroup === index ? "border-blau-button " : ""
                }`}
              >
                <table className="w-fit table-auto border-separate border-spacing-1 border-spacing-x-2">
                  <tbody>
                    <tr>
                      <th className="text-center" colSpan={2}>
                        {`${t("general.group")} ${index + 1}`}
                      </th>
                    </tr>
                    <tr>
                      <th className="text-left">
                        {t(
                          "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.model"
                        )}
                      </th>
                      <td className="whitespace-nowrap">
                        {group.models !== undefined && group.models.length > 0
                          ? group.models
                              .map((model) => model.fileName)
                              .join(", ")
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
                <ProcessStatusGate
                  endExclude
                  end={ProcessStatus.SERVICE_COMPLETED}
                >
                  <Container
                    width="fit"
                    justify="center"
                    items="start"
                    className="self-stretch"
                  >
                    <PermissionGate element="ProcessManufacturingServiceDeleteGroup">
                      <Button
                        size="sm"
                        variant="text"
                        title={t("general.button.delete")}
                        onClick={() => handleOnClickDelete(index)}
                      >
                        <DeleteIcon />
                      </Button>
                    </PermissionGate>
                  </Container>
                </ProcessStatusGate>
              </div>
            ))}
            <ProcessStatusGate endExclude end={ProcessStatus.SERVICE_COMPLETED}>
              <PermissionGate element="ProcessManufacturingServiceAddGroup">
                <Button
                  title={t(
                    "Process.components.Service.ServiceDetails.components.Manufacturing.GroupOverview.newGroup"
                  )}
                  className=" border-2 p-2 hover:bg-slate-50"
                  onClick={handleOnClickNewGroup}
                >
                  <AddIcon />
                </Button>
              </PermissionGate>
            </ProcessStatusGate>
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
      ) : null}
      {open ? (
        <Container width="full" className="p-3">
          <Button
            title={t("general.button.collapse")}
            children={<ExpandLessIcon />}
            variant="text"
            width="full"
            size="xs"
            onClick={() => setOpen((prev) => !prev)}
          />
        </Container>
      ) : null}
    </Container>
  );
};

export default ServiceManufacturingGroupOverview;
