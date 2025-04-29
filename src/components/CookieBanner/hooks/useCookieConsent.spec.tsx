import { renderHook, act } from "@testing-library/react";
import useCookieConsent from "./useCookieConsent";
import Cookies from "js-cookie";
import logger from "@/hooks/useLogger";

// Mock dependencies
jest.mock("js-cookie");
jest.mock("@/hooks/useLogger");

describe("useCookieConsent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("initial state should be undefined", () => {
    (Cookies.get as jest.Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useCookieConsent());

    expect(result.current.cookieConsent).toBeUndefined();
  });

  test("should get cookie consent value on mount", () => {
    (Cookies.get as jest.Mock).mockReturnValue("true");

    const { result } = renderHook(() => useCookieConsent());

    expect(Cookies.get).toHaveBeenCalledWith("cookieConsent");
    expect(result.current.cookieConsent).toBe("true");
  });

  test("acceptCookies should set cookie and update state", () => {
    (Cookies.get as jest.Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useCookieConsent());

    act(() => {
      result.current.acceptCookies();
    });

    expect(Cookies.set).toHaveBeenCalledWith("cookieConsent", "true", {
      expires: 365,
    });
    expect(logger).toHaveBeenCalledWith("Cookies accepted");
    expect(result.current.cookieConsent).toBe("true");
  });

  test("rejectCookies should set cookie and update state", () => {
    (Cookies.get as jest.Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useCookieConsent());

    act(() => {
      result.current.rejectCookies();
    });

    expect(Cookies.set).toHaveBeenCalledWith("cookieConsent", "false", {
      expires: 365,
    });
    expect(logger).toHaveBeenCalledWith("Cookies rejected");
    expect(result.current.cookieConsent).toBe("false");
  });
});
