import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {}

const Breadcrumb: React.FC<Props> = () => {
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

  // splittet.length > 1 ? (
  return (
    <nav className="text-left w-full hidden md:block p-3 text-lg font-bold">
      {splittet.map((name: string, index: number) => (
        <React.Fragment key={index}>
          <a
            className="p-1 hover:text-türkis hover:cursor-pointer duration-300 "
            href={generateLink(index)}
            onClick={(e) => handleOnClick(e, index)}
          >
            {name}
          </a>
          <span className="">{index + 1 < splittet.length ? " > " : null}</span>
        </React.Fragment>
      ))}
    </nav>
  );
  // ) : null;
};

export default Breadcrumb;
