import React, { useState } from "react";
import { NavigationItemData } from "@/data/navigation";
import HeaderItem from "./Item";
import useUser, { UserType } from "@/hooks/useUser";
import useApp from "@/hooks/useApp";
import useBadge from "@/hooks/useBadge";
import { Badge, Button } from "@component-library/index";
import { useTranslation } from "react-i18next";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HeaderInvoice from "./Invoice";
import useEvents from "@/hooks/useEvents/useEvents";

interface HeaderItemsProps {}

const HeaderItems: React.FC<HeaderItemsProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useUser();
  const { setMenu } = useApp();
  const { calcBadge } = useBadge();
  const { totalEventCount } = useEvents();

  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const closeMenus = () => {
    setMenu(false);
  };

  const handleOnClickButtonInvoice = () => {
    setInvoiceOpen((prevState) => !prevState);
  };

  return (
    <>
      <ul className="relative hidden flex-row items-center justify-center  md:flex">
        {user.usertype !== UserType.ANONYM ? (
          <>
            {invoiceOpen ? (
              <HeaderInvoice closeInvoice={handleOnClickButtonInvoice} />
            ) : null}
            <Button
              title={t(`components.Header.Header.button.events`)}
              className="text-xl"
              size="sm"
              variant="tertiary"
              onClick={handleOnClickButtonInvoice}
            >
              <Badge count={totalEventCount}>
                <NotificationsIcon fontSize="large" />
              </Badge>
              <span className="hidden text-xl md:flex">
                {t(`components.Header.Header.button.events`)}
              </span>
            </Button>
          </>
        ) : null}
        {NavigationItemData.filter(
          (item) =>
            item.preferred.includes("header") &&
            item.userTypes.includes(user.usertype)
        ).map((item, index: number) => (
          <HeaderItem
            key={index}
            closeMenus={closeMenus}
            headeritem={item}
            badge={calcBadge(item.title)}
          />
        ))}
      </ul>
      <ul className=" relative hidden flex-row items-center justify-center xs:flex md:hidden">
        {user.usertype !== UserType.ANONYM ? (
          <>
            {invoiceOpen ? (
              <HeaderInvoice closeInvoice={handleOnClickButtonInvoice} />
            ) : null}
            <Button
              title={t(`components.Header.Header.button.events`)}
              className="text-xl"
              size="sm"
              variant="tertiary"
              onClick={handleOnClickButtonInvoice}
            >
              <Badge count={totalEventCount}>
                <NotificationsIcon fontSize="large" />
              </Badge>
              <span className="hidden text-xl md:flex">
                {t(`components.Header.Header.button.events`)}
              </span>
            </Button>
          </>
        ) : null}
        {NavigationItemData.filter(
          (item) =>
            item.preferred.includes("header") &&
            item.userTypes.includes(user.usertype)
        ).map((item, index: number) => (
          <HeaderItem
            key={index}
            onlyIcon
            closeMenus={closeMenus}
            headeritem={item}
            badge={calcBadge(item.title)}
          />
        ))}
      </ul>
    </>
  );
};

export default HeaderItems;
