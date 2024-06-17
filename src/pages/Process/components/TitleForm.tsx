import { Button } from "@component-library/index";
import { Container } from "@component-library/index";
import { Heading } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { boolean } from "yup";
import OwnerGate from "@/components/OwnerGate/OwnerGate";
import useUpdateProject from "@/api/Project/Mutations/useUpdateProject";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import { useParams } from "react-router-dom";

interface ProcessTitleFormProps {
  title?: string;
  close: () => void;
  processID: string;
}

const ProcessTitleForm: React.FC<ProcessTitleFormProps> = (props) => {
  const { title, close, processID } = props;
  const { t } = useTranslation();
  const [state, setState] = useState<string>(title !== undefined ? title : "");
  const updateProcess = useUpdateProcess();

  const updatedTitle = () => {
    updateProcess.mutate(
      {
        processIDs: [processID],
        updates: { changes: { processDetails: { title: state } } },
      },
      {
        onSuccess: () => {
          close();
        },
      }
    );
  };

  const handleOnClickEditCheckButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    updatedTitle();
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prevState) => e.target.value);
  };

  const handelOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updatedTitle();
    }
  };

  return (
    <Container direction="row" gap={3} className="flex-wrap md:flex-nowrap ">
      <Heading variant={"h2"} className="md:whitespace-nowrap">
        {t("Process.components.TitleForm.name")}
      </Heading>
      <input
        autoFocus
        onKeyDown={handelOnKeyDown}
        type="text"
        value={state}
        className="w-fit rounded-xl border-2 bg-gray-100 p-2"
        onChange={handleOnChangeInput}
      />
      <OwnerGate>
        <PermissionGate element="ProjectButtonEditName">
          <Button
            onClick={handleOnClickEditCheckButton}
            variant="secondary"
            title={t("Process.components.TitleForm.button.save")}
            size="xs"
            width="fit"
            children={<CheckIcon fontSize="small" />}
          />
        </PermissionGate>
      </OwnerGate>
    </Container>
  );
};

export default ProcessTitleForm;
