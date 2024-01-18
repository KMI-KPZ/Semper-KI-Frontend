import useService from "@/pages/Service/hooks/useService";
import { Button } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {}

export type DataNaviagtionTranlationType =
  | "edit"
  | "home"
  | "process"
  | "model"
  | "upload"
  | "material"
  | "postprocessing"
  | "cart"
  | "manufacturer"
  | "checkout"
  | "guide"
  | "order"
  | "orders"
  | "account"
  | "test"
  | "service"
  | "use"
  | "provide"
  | "portfolio"
  | "use-service"
  | "provide-service"
  | "continue"
  | "new-contract"
  | "proceedings"
  | "company"
  | "user"
  | "procedure"
  | "printer"
  | "about-us"
  | "login"
  | "register"
  | "logout"
  | "organization"
  | "materials"
  | "printers"
  | "postprocessings"
  | "resources"
  | "add"
  | "demo"
  | "admin"
  | "users"
  | "contractorSelection"
  | "verification"
  | "registerOrganization"
  | "verifyEMail"
  | "manufacturing"
  | "projects"
  | "project"
  | "demonstrator";

interface BreadcrumbItem {
  name: string;
  link: string;
  tname?: DataNaviagtionTranlationType;
}

export function isDataNaviagtionTranlationType(
  input: string
): input is DataNaviagtionTranlationType {
  return [
    "edit",
    "home",
    "process",
    "model",
    "upload",
    "material",
    "postprocessing",
    "cart",
    "manufacturer",
    "checkout",
    "guide",
    "order",
    "orders",
    "account",
    "test",
    "service",
    "use",
    "provide",
    "portfolio",
    "use-service",
    "provide-service",
    "continue",
    "new-contract",
    "proceedings",
    "company",
    "user",
    "procedure",
    "printer",
    "about-us",
    "login",
    "register",
    "logout",
    "organization",
    "materials",
    "printers",
    "postprocessings",
    "resources",
    "add",
    "demo",
    "admin",
    "users",
    "contractorSelection",
    "verification",
    "registerOrganization",
    "verifyEMail",
    "manufacturing",
    "projects",
    "project",
    "demonstrator",
  ].includes(input);
}

export const Breadcrumb: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const generateBreadcrumbItems = (): BreadcrumbItem[] => {
    let breadcrumbItems: BreadcrumbItem[] = [];
    let splittet: string[] = pathname.split("/");
    if (splittet[0] === "" && splittet[1] === "") {
      splittet.splice(0, 1);
    }
    splittet.forEach((item: string, index: number) => {
      if (index === 0) {
        breadcrumbItems.push({
          tname: "home",
          name: "home",
          link: "/",
        });
      } else if (index === 2 && splittet[1] === "projects") {
        breadcrumbItems.push({
          link: `/projects/${item}`,
          tname: "project",
          name: "project",
        });
      } else if (index === 3 && splittet[1] === "projects") {
        breadcrumbItems.push({
          link: `/projects/${splittet[2]}/${item}`,
          tname: "process",
          name: "process",
        });
      } else if (index === 1 && item === "projects") {
        breadcrumbItems.push({
          tname: "projects",
          name: "projects",
          link: "/projects",
        });
      } else if (index === 2 && splittet[1] === "projects") {
        //nothing
      } else if (index === 3 && item === "process") {
        breadcrumbItems.push({
          tname: "projects",
          name: "projects",
          link:
            splittet[4] === undefined
              ? `/projects/${splittet[2]}`
              : `/projects/${splittet[2]}/process/${splittet[4]}`,
        });
      } else if (index === 4 && splittet[3] === "process") {
        //nothing
      } else {
        const link = splittet.slice(0, index + 1).join("/");
        breadcrumbItems.push({
          name: item,
          link: link,
          tname: isDataNaviagtionTranlationType(item) ? item : undefined,
        });
      }
    });

    return breadcrumbItems;
  };

  return (
    <nav className="hidden w-full flex-row items-center justify-start text-left text-lg font-bold text-white md:flex">
      {generateBreadcrumbItems().map((item: BreadcrumbItem, index: number) => (
        <React.Fragment key={index}>
          <span>{" > "}</span>
          <Button
            size="sm"
            variant="secondary"
            title={
              item.tname !== undefined
                ? t(`data.NavigationItem.${item.tname}`)
                : item.name
            }
            to={item.link}
          />
        </React.Fragment>
      ))}
    </nav>
  );
};
