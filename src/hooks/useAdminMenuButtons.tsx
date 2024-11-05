import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FactoryIcon from "@mui/icons-material/Factory";
import NoteIcon from "@mui/icons-material/Note";
import BusinessIcon from "@mui/icons-material/Business";
import HomeIcon from "@mui/icons-material/Home";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface useAdminMenuButtonsReturnProps {
  adminMenuButtons: AdminMenuButton[];
}

interface RawAdminMenuButton {
  icon: React.ReactNode;
  title: string;
  to: string;
}
interface AdminMenuButton extends RawAdminMenuButton {
  isActive: boolean;
}

const useAdminMenuButtons = (): useAdminMenuButtonsReturnProps => {
  const { t } = useTranslation();

  const { pathname } = useLocation();

  const isActive = (to: string) => {
    if (to === "/admin") return to === pathname;
    return pathname.includes(to);
  };

  const rawAdminMenuButtons: RawAdminMenuButton[] = [
    {
      icon: <HomeIcon />,
      title: t("Admin.Admin.buttons.dashboard"),
      to: "/admin",
    },
    {
      icon: <SupervisorAccountIcon />,
      title: t("Admin.Admin.buttons.user"),
      to: "/admin/user",
    },
    {
      icon: <BusinessIcon />,
      title: t("Admin.Admin.buttons.orga"),
      to: "/admin/organization",
    },
    {
      icon: <NoteIcon />,
      title: t("Admin.Admin.buttons.projects"),
      to: "/admin/projects",
    },
    {
      icon: <FactoryIcon />,
      title: t("Admin.Admin.buttons.resources"),
      to: "/admin/resources/printer",
    },
  ];

  const adminMenuButtons: AdminMenuButton[] = rawAdminMenuButtons.map(
    (button) => ({
      ...button,
      isActive: isActive(button.to),
    })
  );

  return { adminMenuButtons };
};

export default useAdminMenuButtons;
