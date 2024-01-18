import logger from "@/hooks/useLogger";
import { Container } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import { Button, LoadingAnimation } from "@component-library/index";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useProcess from "../Projects/hooks/useProcess";
import { useProject } from "../Projects/hooks/useProject";
import { AppContext } from "../App/App";
import { ContentBox } from "@component-library/index";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import SemperKILogo from "@images/Logo-Semper.png";
import ResKriVerLogo from "@images/ResKriVer_Logo.svg";

interface ResKriVerProps {}

interface SearchParamProps {
  key: string;
  value: string;
}

const ResKriVer: React.FC<ResKriVerProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  let [searchParams] = useSearchParams();
  const entries = searchParams.entries();
  const { createProject } = useProject();
  const { setAppState } = useContext(AppContext);

  let data_: SearchParamProps[] = [];
  for (const entry of entries) {
    data_.push({ key: entry[0], value: entry[1] });
  }

  const handleOnClickButton = () => {
    createProject();
  };

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      count: "",
      time: "",
      material: "",
      sterilizability: "",
    },
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <ContentBox>
      <Container direction="col" width="full">
        <Container width="full" className="bg-white p-20">
          <form
            onSubmit={handleSubmit((data) => console.log(data))}
            className="relative flex w-full flex-col items-center justify-center gap-10 border-2 bg-white p-5 py-16 text-black"
          >
            <Heading
              variant="h1"
              className="absolute -left-8 -top-8 rounded-full border-2 bg-white p-3"
            >
              {t("ResKriVer.ResKriVer.title")}
            </Heading>
            <img
              src={ResKriVerLogo}
              className="absolute -right-16 -top-16 w-32 "
            />
            <Heading variant="h2">Diese Daten wurden übermittelt</Heading>
            <Container direction="col" width="full">
              <Container direction="row" width="full">
                <Container
                  direction="col"
                  width="fit"
                  align="end"
                  justify="center"
                  className="gap-8"
                >
                  <label htmlFor="name">Artikelname</label>
                  <label htmlFor="count">Anzahl</label>
                  <label htmlFor="time">Zeit</label>
                  <label htmlFor="material">Material</label>
                  <label htmlFor="sterilizability">Sterilisierbarkeit</label>
                </Container>
                <Container
                  direction="col"
                  width="full"
                  justify="center"
                  className="max-w-xl"
                >
                  <input
                    id="name"
                    {...(register("name"), { placeholder: "Artikelname..." })}
                    className="w-full rounded-full border-2 bg-gradient-to-r from-blue-200/50 to-pink-200/50 py-1 pl-3"
                  />
                  <input
                    id="count"
                    {...(register("count"), { placeholder: "Anzahl..." })}
                    className="w-full rounded-full border-2 bg-gradient-to-r from-blue-200/50 to-pink-200/50 py-1 pl-3"
                  />
                  <input
                    id="time"
                    {...(register("time"), { placeholder: "Zeit..." })}
                    className="w-full rounded-full border-2 bg-gradient-to-r from-blue-200/50 to-pink-200/50 py-1 pl-3"
                  />
                  <input
                    id="material"
                    {...(register("material"), { placeholder: "Material..." })}
                    className="w-full rounded-full border-2 bg-gradient-to-r from-blue-200/50 to-pink-200/50 py-1 pl-3"
                  />
                  <input
                    id="sterilizability"
                    {...(register("sterilizability"),
                    { placeholder: "Sterilisierbarkeit..." })}
                    className="w-full rounded-full border-2 bg-gradient-to-r from-blue-200/50 to-pink-200/50 py-1 pl-3"
                  />
                </Container>
              </Container>
            </Container>
            <Button
              title={t("ResKriVer.ResKriVer.button.search")}
              endIcon={<NavigateNextIcon />}
              onClick={handleSubmit(onSubmit)}
              className="absolute -bottom-5 right-20 rounded-full  bg-white"
            />
          </form>
        </Container>
        <Container width="full" className="px-20">
          <Container direction="row" width="full" className="relative">
            <input
              type="search"
              className="w-full resize-none rounded-full bg-gradient-to-r from-blue-200/50 to-white px-5 py-3 tracking-wider"
              placeholder="Message SEMPER-KI..."
            />
            <Button
              width="fit"
              title="senden"
              children={
                <img
                  src={SemperKILogo}
                  className="h-10 rotate-180 object-contain"
                />
              }
              className="absolute right-0 rounded-full bg-white px-4 py-1 "
            />
          </Container>
        </Container>
      </Container>
    </ContentBox>
  );
};

export default ResKriVer;
