import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Badge } from "@component-library/Badge/Badge";
import { ReactComponent as LogoIcon } from "@icons/Logo.svg";
import { INavigationItem } from "@/data/navigation";
import { Button } from "@component-library/index";

interface Props extends React.HTMLProps<HTMLLIElement> {
  isMenuItem?: boolean;
  headeritem: INavigationItem;
  onlyIcon?: boolean;
  closeMenus(): void;
  badge?: number;
}

const HeaderItem = React.forwardRef<HTMLLIElement, Props>((props, ref) => {
  const { headeritem, closeMenus, isMenuItem, badge, onlyIcon } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onClick = (e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (headeritem.extern === false) {
      e?.preventDefault();
      closeMenus();
      navigate(headeritem.link);
    }
  };

  const handleOnClickButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    onClick(e);
  };

  const handleOnClickLi = () => {
    onClick();
  };

  const renderIcon =
    typeof headeritem.icon === "string" ? (
      <div className="relative h-6 w-6 xl:h-8 xl:w-8">
        <LogoIcon className="absolute h-6 opacity-100 duration-300 ease-in-out group-hover:opacity-0 xl:h-8" />
        <LogoIcon className="absolute h-6 opacity-0 duration-300 ease-in-out group-hover:opacity-100 xl:h-8" />
      </div>
    ) : (
      headeritem.icon
    );

  return (
    <li
      ref={ref}
      onClick={handleOnClickLi}
      title={headeritem.title}
      className="hidden xs:block"
    >
      <Button
        className={`${
          !isMenuItem ? "w-full justify-start" : "w-fit justify-center"
        }`}
        size="sm"
        to={headeritem.link}
        onClick={handleOnClickButton}
        variant="tertiary"
        title={t(`data.NavigationItem.${headeritem.title}`)}
        startIcon={
          <Badge count={badge === undefined ? 0 : badge}>{renderIcon}</Badge>
        }
        children={
          onlyIcon !== undefined && onlyIcon === true ? null : (
            <span className="text-xl">
              {t(`data.NavigationItem.${headeritem.title}`)}
            </span>
          )
        }
      />
    </li>
  );
});

export default HeaderItem;
