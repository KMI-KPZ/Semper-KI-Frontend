import { useContext, useState } from "react";
import { IOrder } from "../../interface/Interface";
import Button from "../General/Button";
import MailIcon from "@mui/icons-material/Mail";
import PopUp from "../PopUp/PopUp";
import { AppContext } from "../App/App";
import ChatView from "./ChatView";
import StatusView from "./StatusView";

interface Props {
  order: IOrder;
}

interface State {
  chatOpen: boolean;
}

const OrderView: React.FC<Props> = (props) => {
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
      <div className="flex flex-col md:flex-row justify-between w-full">
        <h3>Bestellung: {order.id}</h3>
        <Button icon={<MailIcon />} onClick={handleOnClickButtonChat}>
          Chat
        </Button>
      </div>
      <StatusView status={order.orderState} />
      <div className="flex flex-col md:flex-row gap-5 w-full items-center justify-center flex-wrap">
        {order.processList.length > 0 ? (
          order.processList.map((processItem) => (
            <div className="flex flex-row md:flex-col gap-3 w-full md:w-1/4 lg:w-1/6 items-center justify-start md:justify-center border-2 rounded-xl overflow-clip">
              <img
                src={processItem.model?.URI}
                className="object-fit md:h-20 w-20 md:w-fit"
              />
              <div className="flex flex-col items-center justify-center p-3 w-full">
                <h3>{processItem.title}</h3>
              </div>
            </div>
          ))
        ) : (
          <h3>keine Items vorhanden</h3>
        )}
      </div>
      <PopUp open={chatOpen} onOutsideClick={handleOnOutsideClickChat}>
        <ChatView chat={order.chat} user={user} closeMenu={closeMenu} />
      </PopUp>
    </div>
  );
};

export default OrderView;
