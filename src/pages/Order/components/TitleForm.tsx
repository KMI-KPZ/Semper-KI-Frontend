import { getTitleFromSubOrder } from "@/pages/Service/Overview/components/Item";
import { Button } from "@component-library/Button";
import Container from "@component-library/Container";
import { Heading } from "@component-library/Typography";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface OrderTitleFormProps {
  title: string;
  updateTitle(title: string): void;
  headerType: "h1" | "h2" | "h3";
}

const OrderTitleForm: React.FC<OrderTitleFormProps> = (props) => {
  const { title, updateTitle, headerType } = props;
  const { t } = useTranslation();
  const [state, setState] = useState<{ edit: boolean; titleText: string }>({
    edit: false,
    titleText: "",
  });

  const handleOnClickEditCheckButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (state.edit) updateTitle(state.titleText);
    setState((prevState) => {
      return {
        edit: !prevState.edit,
        titleText: prevState.edit ? prevState.titleText : title,
      };
    });
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prevState) => ({
      ...prevState,
      titleText: e.target.value,
    }));
  };

  return (
    <Container direction="row" gap={3} className="flex-wrap md:flex-nowrap">
      {state.edit === true ? (
        <>
          <Heading variant={headerType} className="md:whitespace-nowrap">
            {t("Orders.OrderView.name")}
          </Heading>
          <input
            type="text"
            value={state.titleText}
            className="w-full bg-slate-100 p-2 md:w-fit"
            onChange={handleOnChangeInput}
          />
        </>
      ) : (
        <Heading variant={headerType} className="md:whitespace-nowrap">
          {t("Orders.OrderView.name")} {title}
        </Heading>
      )}
      <PermissionGate element="OrderButtonEditName">
        <Button
          width="fit"
          onClick={handleOnClickEditCheckButton}
          variant="icon"
          title={t("Orders.OrderView.button.editName")}
          children={
            state.edit ? (
              <CheckIcon fontSize="small" />
            ) : (
              <EditIcon fontSize="small" />
            )
          }
        />
      </PermissionGate>
    </Container>
  );
};

export default OrderTitleForm;
