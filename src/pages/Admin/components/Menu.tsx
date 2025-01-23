import React from "react";
import { Button, Container } from "@component-library/index";
import useAdminMenuButtons from "@/hooks/useAdminMenuButtons";

interface AdminMenuProps {}

const AdminMenu: React.FC<AdminMenuProps> = (props) => {
  const {} = props;
  const { adminMenuButtons } = useAdminMenuButtons();

  return (
    <Container width="fit" direction="col" className="  shrink bg-white p-5">
      {adminMenuButtons.map((button, index) => (
        <Button
          key={index}
          startIcon={button.icon}
          title={button.title}
          to={button.to}
          width="full"
          variant={button.isActive ? "primary" : "secondary"}
        />
      ))}
    </Container>
  );
};

export default AdminMenu;
