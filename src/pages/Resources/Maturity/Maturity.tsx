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
import useGetMaturityLevel from "@/api/Resources/Organization/Querys/useGetMaturityLevel";
import useOrganization from "@/hooks/useOrganization";

interface ResourcesMaturityProps {}

const ResourcesMaturity: React.FC<ResourcesMaturityProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const getMaturityLevel = useGetMaturityLevel();
  const { organization } = useOrganization();

  const url: string = `${process.env.VITE_MATURITY}/assessment?id=${organization.hashedID}`;

  return (
    <Container direction="col" width="full" justify="start">
      <Container width="full" direction="row">
        <Heading variant="h2">{t("Resources.Maturity.header")}</Heading>
      </Container>
      <Divider />
      <Container width="full" className="rounded-md border-2 p-3">
        <Text className="text-center">
          {t(`Resources.Maturity.describtion`)}
        </Text>
      </Container>

      {getMaturityLevel.isLoading ? (
        <LoadingAnimation />
      ) : (
        <Container direction="row" className="rounded-md border-2 p-3">
          {getMaturityLevel.isFetched &&
          getMaturityLevel.data !== undefined &&
          getMaturityLevel.data.maturityLevel > 0 ? (
            <>
              <Text>{t("Resources.Maturity.level")}</Text>
              <Text>{getMaturityLevel.data.maturityLevel}</Text>
              <Button
                title={t("Resources.Maturity.button.calculate")}
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
              <Text>{t("Resources.Maturity.level")}</Text>
              <Text>{t("Resources.Maturity.noLevel")}</Text>
              <Button
                title={t("Resources.Maturity.button.recalculate")}
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

export default ResourcesMaturity;
