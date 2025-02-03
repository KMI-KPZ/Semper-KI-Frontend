import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Divider,
  Heading,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import { ManufacturingServiceProps } from "@/api/Service/Querys/useGetServices";
import { ManufactoringProcessProps } from "@/api/Process/Querys/useGetProcess";

interface ServiceManufacturingFreeTextProps {
  process: ManufactoringProcessProps;
  activeGroup: number;
}

const ServiceManufacturingFreeText: React.FC<
  ServiceManufacturingFreeTextProps
> = (props) => {
  const { activeGroup, process } = props;
  const { t } = useTranslation();
  const groups: ManufacturingServiceProps[] = process.serviceDetails.groups;
  const [text, setText] = useState(
    groups[activeGroup].context !== undefined ? groups[activeGroup].context : ""
  );
  const [showSavingHint, setShowSavingHint] = useState(false);
  const updatedProcess = useUpdateProcess();

  useEffect(() => {
    setText(
      groups[activeGroup].context !== undefined
        ? groups[activeGroup].context
        : ""
    );
  }, [activeGroup]);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const showHint = () => {
    setShowSavingHint(true);
    setTimeout(() => {
      setShowSavingHint(false);
    }, 800);
  };

  const handleOnBlur = () => {
    showHint();
    updatedProcess.mutate({
      processIDs: [process.processID],
      updates: {
        changes: {
          serviceDetails: {
            groups: [
              ...groups.slice(0, activeGroup).map(() => ({})),
              { context: text },
              ...groups.slice(activeGroup + 1).map(() => ({})),
            ],
          },
        },
      },
    });
  };

  return (
    <Container
      width="full"
      className="rounded-md border-2"
      direction="col"
      align="start"
    >
      <Container
        width="fit"
        direction="row"
        justify="start"
        className="p-5 pb-2"
      >
        <Heading variant="h3">
          {t(
            "Process.components.Service.ServiceDetails.components.Manufacturing.FreeText.heading"
          )}
        </Heading>
      </Container>
      <Divider />
      <Container className="gap-4 p-5 pt-0" width="full" direction="col">
        <textarea
          className="min-h-[100px] w-full rounded-md border-2 p-3"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          value={text}
          placeholder={t(
            "Process.components.Service.ServiceDetails.components.Manufacturing.FreeText.placeholder"
          )}
        />
        {showSavingHint ? (
          <Container direction="row">
            <LoadingAnimation />
            <Text>{t("general.button.saving")}</Text>
          </Container>
        ) : null}
      </Container>
    </Container>
  );
};

export default ServiceManufacturingFreeText;
