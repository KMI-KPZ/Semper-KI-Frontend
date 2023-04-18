import { useContext, useState } from "react";
import { IOrder } from "../../interface/Interface";
import Button from "../General/Button";
import MailIcon from "@mui/icons-material/Mail";
import PopUp from "../PopUp/PopUp";
import { AppContext } from "../App/App";
import ChatView from "./ChatView";
import StatusView from "./StatusView";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface Props {
  order: IOrder;
}

interface State {
  chatOpen: boolean;
  menuOpen: boolean;
}

const OrderView: React.FC<Props> = (props) => {
  const { order } = props;
  const [state, setState] = useState<State>({
    chatOpen: false,
    menuOpen: false,
  });
  const { chatOpen, menuOpen } = state;
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

  const handleOnClickButtonCancel = () => {
    if (window.confirm("Auftrag wirklich stonieren?")) {
      console.log("//TODO Delete");
    }
  };
  const handleOnClickButtonReOrder = () => {
    if (window.confirm("Auftrag wirklich erneut Bestellen?")) {
      console.log("//TODO ReOrder");
    }
  };

  const handleOnClickButtonExpand = () => {
    setState((prevState) => ({ ...prevState, menuOpen: !prevState.menuOpen }));
  };

  return (
    <div className="flex flex-col justify-start items-start gap-3 border-2 w-full p-3">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <h3 className="break-words">Bestellung: {order.id}</h3>
        <div className=" flex flex-col md:flex-row gap-3 items-center justify-center">
          <Button
            size="small"
            icon={<MailIcon />}
            onClick={handleOnClickButtonChat}
          >
            Chat
          </Button>
          {menuOpen ? (
            <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
              <Button
                size="small"
                icon={<CancelIcon />}
                onClick={handleOnClickButtonCancel}
              >
                Stonieren
              </Button>
              <Button
                size="small"
                icon={<ReplayIcon />}
                onClick={handleOnClickButtonReOrder}
              >
                Erneut Bestellen
              </Button>
            </div>
          ) : null}
          <div
            className={`flex items-center justify-center ${
              menuOpen ? "rotate-90" : "-rotate-90"
            }`}
          >
            <Button
              size="small"
              icon={<ExpandLessIcon />}
              onClick={handleOnClickButtonExpand}
            />
          </div>
        </div>
      </div>
      <StatusView status={order.orderState} />
      <div className="flex flex-col md:flex-row gap-5 w-full items-start justify-center md:justify-around p-5">
        <img src={order.item.model?.URI} className="object-fit w-40 h-40" />
        <div className="flex flex-col items-center justify-start p-3">
          <h3>{order.item.model?.title}</h3>
        </div>
        <div className="flex flex-col items-center justify-start p-3">
          <h3>{order.item.material?.title}</h3>
        </div>
        <div className="flex flex-col items-center justify-start p-3">
          <h3>Nachbearbeitungen</h3>
          {order.item.postProcessings?.map((postProcessing, index) => (
            <span key={index}>{postProcessing.title}</span>
          ))}
        </div>
      </div>
      <PopUp open={chatOpen} onOutsideClick={handleOnOutsideClickChat}>
        <ChatView chat={order.chat} user={user} closeMenu={closeMenu} />
      </PopUp>
    </div>
  );
};

export default OrderView;
