import logger from "@/hooks/useLogger";
import { Button } from "@component-library/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {}

interface BreadcrumbItem {
  name: string;
  link: string;
}

const Breadcrumb: React.FC<Props> = () => {
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
          name: "home",
          link: "/",
        });
      } else if (index === 1 && item === "order") {
        breadcrumbItems.push({
          name: "orders",
          link: "/orders",
        });
        breadcrumbItems.push({
          name: "order",
          link: `/order/${splittet[2]}`,
        });
      } else if (index === 2 && splittet[1] === "order") {
        //nothing
      } else {
        const link = splittet.slice(0, index + 1).join("/");
        breadcrumbItems.push({
          name: item,
          link: link,
        });
      }
    });

    return breadcrumbItems;
  };

  return (
    <nav className="hidden w-full flex-row items-center justify-start text-left text-lg font-bold md:flex">
      {generateBreadcrumbItems().map((item: BreadcrumbItem, index: number) => (
        <React.Fragment key={index}>
          <span>{" > "}</span>
          <Button
            size="xs"
            variant="text"
            title={
              i18n.exists(`data.NavigationItem.${item.name}`)
                ? t(`data.NavigationItem.${item.name}`)
                : item.name
            }
            to={item.link}
          />
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
