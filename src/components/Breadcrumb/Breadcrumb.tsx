import { stringify } from "querystring";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Breadcrumb.scss";

interface Props {}

const Breadcrumb: React.FC<Props> = ({}) => {
  const navigate = useNavigate();
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
    <div className="breadcrumb">
      {splittet.length > 1
        ? splittet.map((name: string, index: number) => (
            <React.Fragment key={index}>
              <a
                href={generateLink(index)}
                onClick={(e) => handleOnClick(e, index)}
              >
                {name}
              </a>
              {index + 1 < splittet.length ? " > " : null}
            </React.Fragment>
          ))
        : null}
    </div>
  );
};

export default Breadcrumb;
