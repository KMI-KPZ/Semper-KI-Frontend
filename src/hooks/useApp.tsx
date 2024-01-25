import { authorizedCustomAxios } from "@/api/customAxios";
import { AppContext, AppState } from "@/pages/App/App";
import { useContext } from "react";

interface useAppReturnProps {
  appState: AppState;
  setMenu: (menuOpen: boolean) => void;
}

const useApp = (): useAppReturnProps => {
  const { appState, setAppState } = useContext(AppContext);

  const setMenu = (menuOpen: boolean) => {
    setAppState((prevState) => ({ ...prevState, menuOpen }));
  };

  return { appState, setMenu };
};

export default useApp;
