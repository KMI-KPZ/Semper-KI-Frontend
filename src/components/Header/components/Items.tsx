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
import { TWBreakpoint, useBreakpoint } from "@/hooks/useBreakePoints";

interface HeaderItemsProps {}

const HeaderItems: React.FC<HeaderItemsProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useUser();
  const { setMenu } = useApp();
  const { calcBadge } = useBadge();
  const { totalEventCount } = useEvents();
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const breakPoint = useBreakpoint();

  const closeMenus = () => {
    setMenu(false);
  };

  const handleOnClickButtonInvoice = () => {
    setInvoiceOpen((prevState) => !prevState);
  };

  const filteredItems = NavigationItemData.filter(
    (item) =>
      item.preferred.includes("header") &&
      item.userTypes.includes(user.usertype)
  );

  return (
    <ul className="relative  flex flex-row items-center  justify-center">
      {user.usertype !== UserType.ANONYM ? (
        <>
          {invoiceOpen ? (
            <HeaderInvoice closeInvoice={handleOnClickButtonInvoice} />
          ) : null}
          <Button
            title={t(`components.Header.button.events`)}
            className="text-xl"
            size="sm"
            variant="tertiary"
            onClick={handleOnClickButtonInvoice}
          >
            <Badge count={totalEventCount}>
              <NotificationsIcon fontSize="large" />
            </Badge>
            <span className="hidden text-xl xl:flex">
              {t(`components.Header.button.events`)}
            </span>
          </Button>
        </>
      ) : null}
      {filteredItems.map((item, index: number) => (
        <HeaderItem
          // ref={(el: HTMLLIElement) => {
          //   itemsRef.current[index] = el;
          // }}
          key={index}
          onlyIcon={breakPoint < TWBreakpoint.xl}
          closeMenus={closeMenus}
          headeritem={item}
          badge={calcBadge(item.title)}
        />
      ))}
    </ul>
  );
};

export default HeaderItems;
