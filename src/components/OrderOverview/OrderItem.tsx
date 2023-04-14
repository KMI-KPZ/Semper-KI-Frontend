import { ChangeEvent, useContext, useState } from "react";
import { IChatMessage, IOrder } from "../../interface/Interface";
import Button from "../General/Button";
import MailIcon from "@mui/icons-material/Mail";
import PopUp from "../PopUp/PopUp";
import { AppContext } from "../App/App";
import SendIcon from "@mui/icons-material/Send";
import useChat from "../../hooks/useChat";
import ChatView from "./ChatView";

interface Props {
  order: IOrder;
}

interface State {
  chatOpen: boolean;
}

const OrderItem: React.FC<Props> = (props) => {
  const { order } = props;
  const [state, setState] = useState<State>({
    chatOpen: false,
  });
  const { chatOpen } = state;
  const { user } = useContext(AppContext);

  const handleOnClickButtonChat = () => {
    setState((prevState) => ({ ...prevState, chatOpen: true }));
  };
  const handleOnOutsideClickChat = () => {
    closeMenu();
  };
  const closeMenu = () => {
    setState((prevState) => ({
      ...prevState,
      chatOpen: false,
    }));
  };

  return (
    <div className="flex flex-col justify-start items-start gap-3 border-2 w-full p-3">
      <h3>Bestellung: {order.id}</h3>
      <Button icon={<MailIcon />} onClick={handleOnClickButtonChat}>
        Chat
      </Button>
      <PopUp open={chatOpen} onOutsideClick={handleOnOutsideClickChat}>
        <ChatView chat={order.chat} user={user} closeMenu={closeMenu} />
      </PopUp>
    </div>
  );
};

export default OrderItem;
