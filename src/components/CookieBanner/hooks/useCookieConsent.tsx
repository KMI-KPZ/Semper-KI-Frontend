import logger from "@/hooks/useLogger";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface ReturnProps {
  acceptCookies(): void;
  rejectCookies(): void;
  cookieConsent: string | undefined;
}

const useCookieConsent = (): ReturnProps => {
  const [cookieConsent, setCookieConsent] = useState<string | undefined>();

  useEffect(() => {
    setCookieConsent(Cookies.get("cookieConsent"));
  }, []);

  const acceptCookies = () => {
    logger("Cookies accepted");
    Cookies.set("cookieConsent", "true", { expires: 365 }); // Cookies accepted for one year
    setCookieConsent("true");
  };

  const rejectCookies = () => {
    logger("Cookies rejected");
    Cookies.set("cookieConsent", "false", { expires: 365 }); // Cookies accepted for one year
    setCookieConsent("false");
  };

  return { acceptCookies, rejectCookies, cookieConsent };
};

export default useCookieConsent;
