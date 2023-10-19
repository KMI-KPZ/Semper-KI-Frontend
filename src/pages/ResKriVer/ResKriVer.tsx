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
    // setAppState((prevState) => ({
    //   ...prevState,
    //   guideFilter: [
    //     {
    //       id: 5,
    //       isChecked: false,
    //       isOpen: false,
    //       question: {
    //         isSelectable: true,
    //         title: "materialcategory",
    //         category: "general",
    //         type: "multiselection",
    //         range: [0, 9999],
    //         values: ["Metall", "Plastic", "Ceramic", "Organic"],
    //         units: null,
    //       },
    //       answer: { value: "Metall", unit: null },
    //     },
    //   ],
    // }));
    createProject.mutate();
  };

  return (
    <Container direction="col" className="bg-white p-5" width="full">
      <Heading variant="h1">{t("ResKriVer.ResKriVer.title")}</Heading>
      {/* <LoadingAnimation /> */}
      <Container direction="col">
        {data_.length > 0 ? (
          <>
            <Heading variant="h2">{t("ResKriVer.ResKriVer.data")}</Heading>
            {data_.map((entry, index) => (
              <Text variant="body" key={index}>
                {entry.key} : {entry.value}
              </Text>
            ))}
          </>
        ) : (
          <Text variant="body">{t("ResKriVer.ResKriVer.loading")}</Text>
        )}
      </Container>
      <Button
        title={t("ResKriVer.ResKriVer.button.search")}
        endIcon={<NavigateNextIcon />}
        onClick={handleOnClickButton}
      />
    </Container>
  );
};

export default ResKriVer;
