import { useState } from "react";
import { Button } from "@component-library/Button";
import Modal from "@component-library/Modal";
import Bubbles1IMG from "../../../assets/images/Bubbles1_Trans.png";
interface Props {}
export const RequestTest: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  return (
    <div className="flex w-full flex-col items-center justify-start gap-5">
      <Button title="open" onClick={openMenu}>
        Open
      </Button>
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
