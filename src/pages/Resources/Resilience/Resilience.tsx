import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Heading,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import LaunchIcon from "@mui/icons-material/Launch";
import useGetResilienceScore from "@/api/Resources/Organization/Querys/useGetResilienceScore";
import useOrganization from "@/hooks/useOrganization";

interface ResourcesResilienceProps {}

const ResourcesResilience: React.FC<ResourcesResilienceProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { organization } = useOrganization();

  const getResilienceScore = useGetResilienceScore();

  const url: string = `${process.env.VITE_RESILIENCE}/assessment?orgaID=${organization.hashedID}`;

  return (
    <Container direction="col" width="full" justify="start">
      <Container width="full" direction="row">
        <Heading variant="h2">{t("Resources.Resilience.header")}</Heading>
      </Container>
      <Divider />
      <Container width="full" className="rounded-md border-2 p-3">
        <Text className="text-center">
          {t(`Resources.Resilience.describtion`)}
        </Text>
      </Container>

      {getResilienceScore.isLoading ? (
        <LoadingAnimation />
      ) : (
        <Container direction="row" className="rounded-md border-2 p-3">
          {getResilienceScore.isFetched &&
          getResilienceScore.data !== undefined &&
          getResilienceScore.data.score > 0 ? (
            <>
              <Text>{t("Resources.Resilience.level")}</Text>
              <Text>{getResilienceScore.data.score}</Text>
              <Button
                title={t("Resources.Resilience.button.calculate")}
                size="sm"
                variant="primary"
                endIcon={<LaunchIcon />}
                extern
                target="_blank"
                to={url}
              />
            </>
          ) : (
            <>
              <Text>{t("Resources.Resilience.level")}</Text>
              <Text>{t("Resources.Resilience.noLevel")}</Text>
              <Button
                title={t("Resources.Resilience.button.recalculate")}
                size="sm"
                variant="primary"
                endIcon={<LaunchIcon />}
                extern
                target="_blank"
                to={url}
              />
            </>
          )}
        </Container>
      )}
    </Container>
  );
};

export default ResourcesResilience;
