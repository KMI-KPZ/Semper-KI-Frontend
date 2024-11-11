import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import BugReportIcon from "@mui/icons-material/BugReport";
import TableContainer from "@/components/Table/TableContainer";
import Table from "@/components/Table/Table";

interface UITestProps {}

type UITestButton = {
  title:
    | "active"
    | "inactive"
    | "starticon"
    | "endicon"
    | "xs"
    | "sm"
    | "md"
    | "lg";
  active: boolean;
  icon: "start" | "end" | undefined;
  size: "xs" | "sm" | "md" | "lg";
};

const UITest: React.FC<UITestProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const buttonrow: UITestButton[] = [
    {
      title: "active",
      active: true,
      icon: undefined,
      size: "md",
    },
    {
      title: "inactive",
      active: false,
      icon: undefined,
      size: "md",
    },
    {
      title: "starticon",
      active: true,
      icon: "start",
      size: "md",
    },
    {
      title: "endicon",
      active: true,
      icon: "end",
      size: "md",
    },
    {
      title: "xs",
      active: true,
      icon: undefined,
      size: "xs",
    },
    {
      title: "sm",
      active: true,
      icon: undefined,
      size: "sm",
    },
    {
      title: "md",
      active: true,
      icon: undefined,
      size: "md",
    },
    {
      title: "lg",
      active: true,
      icon: undefined,
      size: "lg",
    },
  ];

  return (
    <Container width="full" direction="col" className="bg-white p-5">
      <Heading variant="h1">{t("Test.UITest.heading")}</Heading>
      <Heading variant="h2">{t("Test.UITest.h2")}</Heading>
      <Heading variant="h3">{t("Test.UITest.h3")}</Heading>
      <Heading variant="h4">{t("Test.UITest.h4")}</Heading>
      <Heading variant="subtitle">{t("Test.UITest.subHeading")}</Heading>
      <Text>{t("Test.UITest.text")}</Text>
      <Divider />
      <table className="w-full table-auto border-separate border-spacing-5">
        <caption>{t("Test.UITest.button-heading")}</caption>
        <thead>
          <tr>
            <th />
            <th>{t("Test.UITest.primary-buttons")}</th>
            <th>{t("Test.UITest.secondary-buttons")}</th>
            <th>{t("Test.UITest.tertiary-buttons")}</th>
            <th>{t("Test.UITest.text-buttons")}</th>
          </tr>
        </thead>
        <tbody>
          {buttonrow.map((row, index) => (
            <tr key={index}>
              <th>{t(`Test.UITest.rows.${row.title}`)}</th>
              <td>
                <Container width="full">
                  <Button
                    variant="primary"
                    active={row.active}
                    size={row.size}
                    startIcon={
                      row.icon === "start" ? <BugReportIcon /> : undefined
                    }
                    endIcon={row.icon === "end" ? <BugReportIcon /> : undefined}
                    title={t(
                      `Test.UITest.button.primary-${
                        row.active ? "active" : "inactive"
                      }`
                    )}
                  />
                </Container>
              </td>

              <td>
                <Container width="full">
                  <Button
                    variant="secondary"
                    active={row.active}
                    size={row.size}
                    startIcon={
                      row.icon === "start" ? <BugReportIcon /> : undefined
                    }
                    endIcon={row.icon === "end" ? <BugReportIcon /> : undefined}
                    title={t(
                      `Test.UITest.button.secondary-${
                        row.active ? "active" : "inactive"
                      }`
                    )}
                  />
                </Container>
              </td>
              <td>
                <Container width="full">
                  <Button
                    variant="tertiary"
                    active={row.active}
                    size={row.size}
                    startIcon={
                      row.icon === "start" ? <BugReportIcon /> : undefined
                    }
                    endIcon={row.icon === "end" ? <BugReportIcon /> : undefined}
                    title={t(
                      `Test.UITest.button.tertiary-${
                        row.active ? "active" : "inactive"
                      }`
                    )}
                  />
                </Container>
              </td>
              <td>
                <Container width="full">
                  <Button
                    variant="text"
                    active={row.active}
                    size={row.size}
                    startIcon={
                      row.icon === "start" ? <BugReportIcon /> : undefined
                    }
                    endIcon={row.icon === "end" ? <BugReportIcon /> : undefined}
                    title={t(
                      `Test.UITest.button.text-${
                        row.active ? "active" : "inactive"
                      }`
                    )}
                  />
                </Container>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Divider />
      <Heading variant="h2">{t("Test.UITest.card-heading")}</Heading>
      <Container width="full">
        <Container className="card">card</Container>
        <Container className="card-container">card-container</Container>
        <Container className="hover-card">hover-card</Container>
        <Container className="active-card">active-card</Container>
        <Container className="container">container</Container>
      </Container>
      <Divider />
      <Heading variant="h2">{t("Test.UITest.table-heading")}</Heading>
      <Heading variant="h3">Table type="normal"</Heading>

      <TableContainer>
        <Table type="normal">
          <thead>
            <tr>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data</td>
              <td>Data</td>
              <td>Data</td>
              <td>Data</td>
            </tr>
            <tr>
              <td>Data</td>
              <td>Data</td>
              <td>Data</td>
              <td>Data</td>
            </tr>
            <tr>
              <td>Data</td>
              <td>Data</td>
              <td>Data</td>
              <td>Data</td>
            </tr>
            <tr>
              <td>Data</td>
              <td>Data</td>
              <td>Data</td>
              <td>Data</td>
            </tr>
          </tbody>
        </Table>
      </TableContainer>
      <Heading variant="h3">Table type="fixed_last_row"</Heading>
      <TableContainer>
        <Table type="fixed_last_row">
          <caption>table-fixed-last-row (nur im admin bereich )</caption>
          <thead>
            <tr>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">action</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">action</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">action</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">
                Data - Extra long so you can see shit
              </td>
              <td className="whitespace-nowrap">action</td>
            </tr>
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UITest;
