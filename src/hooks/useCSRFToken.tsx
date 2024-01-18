import Cookies from "js-cookie";

interface ReturnProps {
  CSRFTokenIsLoaded(): boolean;
}

const useCSRFToken = (): ReturnProps => {
  const CSRFTokenIsLoaded = (): boolean => {
    return Cookies.get("csrftoken") !== undefined ? true : false;
  };

  return {
    CSRFTokenIsLoaded,
  };
};

export default useCSRFToken;
