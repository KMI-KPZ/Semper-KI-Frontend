import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "@component-library/index";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface BackButtonPropsContainer {}

const BackButtonContainer: React.FC<
  PropsWithChildren<BackButtonPropsContainer>
> = (props) => {
  const { children } = props;
  const { t } = useTranslation();

  return (
    <Container width="full" className="relative  bg-white">
      <Button
        width="fit"
        to=".."
        title={t("general.button.back")}
        variant="text"
        className="absolute left-5"
      >
        <ArrowBackIosIcon />
      </Button>
      {children}
    </Container>
  );
};

export default BackButtonContainer;
