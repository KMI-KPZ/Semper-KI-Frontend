import { useState } from "react";
import { Button } from "@component-library/Button";
import Modal from "@component-library/Modal";
import Bubbles1IMG from "../../../assets/images/Bubbles1_Trans.png";
import logger from "@/hooks/useLogger";
import usePermissions from "@/hooks/usePermissions";
interface Props {
  socket: WebSocket | null;
}
export const RequestTest: React.FC<Props> = (props) => {
  const { socket } = props;
  const [open, setOpen] = useState(false);
  const { reloadPermissions } = usePermissions();
  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  const closeSocket = () => {
    socket?.close();
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5">
      <Button title="Close WebSocket" onClick={closeSocket} />
      <Button title="open" onClick={openMenu}>
        Open
      </Button>
      <Button title="reloadPermissions" onClick={reloadPermissions} />
      <Modal
        open={open}
        closeModal={closeMenu}
        className="flex w-full flex-row"
      >
        <img src={Bubbles1IMG} />
      </Modal>
    </div>
  );
};
