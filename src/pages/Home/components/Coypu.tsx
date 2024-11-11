import { Button } from "@component-library/index";
import { Container } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useGetCoypuData from "@/api/Coypu/Querys/useGetCoypuData";

interface CoypuProps {}

const Coypu: React.FC<CoypuProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const coypuDataQuery = useGetCoypuData();
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Container direction="col" width="full">
      <Container className="bg-white p-5" gap={3} direction="col" width="full">
        <Heading variant="h2">{t("Home.components.Coypu.heading")}</Heading>
        <Heading variant="h3">{t("Home.components.Coypu.heading2")}</Heading>
      </Container>
      {coypuDataQuery.data !== undefined && coypuDataQuery.data.length > 0 ? (
        <ul className="flex h-fit w-full flex-row flex-wrap items-start justify-center gap-5">
          {coypuDataQuery.data
            .slice(0, expanded === false ? 9 : undefined)
            .map((coypu, index) => (
              <li
                className="flex grow basis-96 flex-col justify-between gap-5 bg-white p-3 shadow-md"
                key={index}
              >
                <Text variant="body">{coypu.date.toLocaleDateString()}</Text>
                <Text variant="body">{coypu.rawhtml}</Text>
                <Container justify="end" width="full">
                  <Button
                    target="_blank"
                    className="gap-2"
                    endIcon={<OpenInNewIcon />}
                    size="sm"
                    variant="secondary"
                    extern
                    to={coypu.url}
                    title={t(`Home.components.Coypu.button.link`)}
                  />
                </Container>
              </li>
            ))}
        </ul>
      ) : null}
      <Button
        className="w-full"
        variant="primary"
        startIcon={expanded === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        onClick={() => setExpanded(!expanded)}
        title={t(`general.button.${expanded ? "showLess" : "showMore"}`)}
      />
    </Container>
  );
};

export default Coypu;
