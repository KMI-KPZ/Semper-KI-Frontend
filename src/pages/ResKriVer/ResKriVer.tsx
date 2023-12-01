import logger from "@/hooks/useLogger";
import Container from "@component-library/Container";
import { Heading, Text } from "@component-library/Typography";
import { Button, LoadingAnimation } from "@component-library/index";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useProcess from "../Projects/hooks/useProcess";
import { useProject } from "../Projects/hooks/useProject";
import { AppContext } from "../App/App";
import ContentBox from "@component-library/ContentBox";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";

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
      <Container direction="col" className="bg-white p-5" width="full">
        <Heading variant="h1">{t("ResKriVer.ResKriVer.title")}</Heading>
        <Container width="full" direction="auto">
          <Container direction="col" className="grow basis-1/2">
            <form
              onSubmit={handleSubmit((data) => console.log(data))}
              className="flex w-full flex-col items-center justify-center gap-5 text-black"
            >
              <Container direction="row" width="full">
                <Container
                  direction="col"
                  width="fit"
                  align="start"
                  justify="center"
                  className="gap-6"
                >
                  <label htmlFor="name">Artikelname</label>
                  <label htmlFor="count">Anzahl</label>
                  <label htmlFor="time">Zeit</label>
                  <label htmlFor="material">Material</label>
                  <label htmlFor="sterilizability">Sterilisierbarkeit</label>
                </Container>
                <Container direction="col" width="full" justify="center">
                  <input
                    id="name"
                    {...(register("name"), { placeholder: "Artikelname..." })}
                    className="w-full rounded-xl border-2 pl-3"
                  />
                  <input
                    id="count"
                    {...(register("count"), { placeholder: "Anzahl..." })}
                    className="w-full rounded-xl border-2  pl-3"
                  />
                  <input
                    id="time"
                    {...(register("time"), { placeholder: "Zeit..." })}
                    className="w-full rounded-xl border-2  pl-3"
                  />
                  <input
                    id="material"
                    {...(register("material"), { placeholder: "Material..." })}
                    className="w-full rounded-xl border-2  pl-3"
                  />
                  <input
                    id="sterilizability"
                    {...(register("sterilizability"),
                    { placeholder: "Sterilisierbarkeit..." })}
                    className="w-full rounded-xl border-2  pl-3"
                  />
                </Container>
              </Container>

              <Button
                title={t("ResKriVer.ResKriVer.button.search")}
                endIcon={<NavigateNextIcon />}
                onClick={handleSubmit(onSubmit)}
              />
            </form>
          </Container>
          <Container direction="col" className="grow basis-1/2">
            <Container
              direction="col"
              justify="end"
              align="center"
              width="full"
              className="h-64 grow rounded-xl border-2 p-5"
            >
              <Text>Hallo ich bin der Semper-Bot.</Text>
              <Text>Wie kann ich ihnen helfen?</Text>
              <Container width="full">
                <input
                  type="search"
                  className="w-full resize-none rounded-xl border-2 p-2"
                  placeholder="Ich möchte das mein Artikel ..."
                />
                <Button title="senden" children={<SendIcon />} />
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </ContentBox>
  );
};

export default ResKriVer;
