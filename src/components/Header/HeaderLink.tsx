import React from "react";

interface Props {
  icon?: React.ReactNode;
  text: string;
  link: string;
  navigate(link: string): void;
  toggleUserType?: () => void;
  className?: string;
}

const HeaderLink = ({
  icon,
  text,
  link,
  toggleUserType,
  navigate,
  className,
}: Props) => {
  const handleOnClick = () => {
    if (toggleUserType !== undefined) toggleUserType();
    navigate(`${link}`);
  };

  return (
    <li
      className={`nav-list-item ${className}`}
      onClick={handleOnClick}
      title={text}
    >
      <a href={`${link}`} className="nav-list-item-link">
        {icon}
        {text}
      </a>
    </li>
  );
};

export default HeaderLink;
