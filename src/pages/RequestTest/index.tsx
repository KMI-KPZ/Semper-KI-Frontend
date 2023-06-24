import { useEffect, useState } from "react";
import { Button } from "@component-library/Button";
import { User } from "@/hooks/useUser/types";
import { Heading } from "@component-library/Typography";
import { useWebsocket } from "../App/hooks/useWebsocket";
import PopUp from "@/components/PopUp";

interface Props {}
export const RequestTest: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const handleOnClick = () => {
    setOpen(true);
  };

  const handleOnOutsideClick = () => {
    setOpen(false);
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5">
      TestSeite
    </div>
  );
};
