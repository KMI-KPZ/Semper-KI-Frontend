import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {}

const Breadcrumb: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const splittet: string[] = pathname.split("/");
  if (splittet[0] === "" && splittet[1] === "") {
    splittet.splice(0, 1);
  }
  splittet[0] = "home";

  const generateLink = (index: number): string => {
    let link: string = "";
    for (let i = 1; i <= index; i++) {
      link = link.concat("/");
      link = link.concat(splittet[i]);
    }
    return link === "" ? "/" : link;
  };

  const handleOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    navigate(generateLink(index));
  };

  return (
    <nav className="hidden w-full text-left text-lg  font-bold md:block">
      {splittet.map((name: string, index: number) => (
        <React.Fragment key={index}>
          <span>{" > "}</span>
          <a
            className="p-1 duration-300 hover:cursor-pointer hover:text-türkis "
            href={generateLink(index)}
            onClick={(e) => handleOnClick(e, index)}
          >
            {i18n.exists(`data.NavigationItem.${name}`)
              ? t(`data.NavigationItem.${name}`)
              : name}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
  // ) : null;
};

export default Breadcrumb;
