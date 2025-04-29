import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CookieBanner from "./CookieBanner";
import useCookieConsent from "./hooks/useCookieConsent";

// Mock dependencies
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("./hooks/useCookieConsent", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@component-library/index", () => ({
  Button: ({ title, onClick }: { title: string; onClick?: () => void }) => (
    <button onClick={onClick} data-testid={`button-${title}`}>
      {title}
    </button>
  ),
  Modal: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div data-testid="modal">{children}</div> : null,
  Heading: ({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant: string;
  }) => <div data-testid={`heading-${variant}`}>{children}</div>,
  Text: ({
    children,
    variant,
    className,
  }: {
    children: React.ReactNode;
    variant: string;
    className?: string;
  }) => (
    <div data-testid={`text-${variant}`} className={className}>
      {children}
    </div>
  ),
}));

describe("CookieBanner", () => {
  const acceptCookiesMock = jest.fn();
  const rejectCookiesMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders when cookieConsent is undefined", () => {
    (useCookieConsent as jest.Mock).mockReturnValue({
      cookieConsent: undefined,
      acceptCookies: acceptCookiesMock,
      rejectCookies: rejectCookiesMock,
    });

    render(<CookieBanner />);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  test("does not render when cookieConsent is defined", () => {
    (useCookieConsent as jest.Mock).mockReturnValue({
      cookieConsent: true,
      acceptCookies: acceptCookiesMock,
      rejectCookies: rejectCookiesMock,
    });

    render(<CookieBanner />);
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  test("shows settings when settings button is clicked", () => {
    (useCookieConsent as jest.Mock).mockReturnValue({
      cookieConsent: undefined,
      acceptCookies: acceptCookiesMock,
      rejectCookies: rejectCookiesMock,
    });

    render(<CookieBanner />);

    // Settings section should not be visible initially
    expect(
      screen.queryByText("components.CookieBanner.functional.heading")
    ).not.toBeInTheDocument();

    // Click the settings button
    fireEvent.click(
      screen.getByTestId("button-components.CookieBanner.button.showSettings")
    );

    // Settings section should now be visible
    expect(
      screen.getByText("components.CookieBanner.functional.heading")
    ).toBeInTheDocument();
  });

  test("clicking accept calls acceptCookies", () => {
    (useCookieConsent as jest.Mock).mockReturnValue({
      cookieConsent: undefined,
      acceptCookies: acceptCookiesMock,
      rejectCookies: rejectCookiesMock,
    });

    render(<CookieBanner />);
    fireEvent.click(
      screen.getByTestId("button-components.CookieBanner.button.accept")
    );
    expect(acceptCookiesMock).toHaveBeenCalledTimes(1);
  });

  test("clicking reject calls rejectCookies", () => {
    (useCookieConsent as jest.Mock).mockReturnValue({
      cookieConsent: undefined,
      acceptCookies: acceptCookiesMock,
      rejectCookies: rejectCookiesMock,
    });

    render(<CookieBanner />);
    fireEvent.click(
      screen.getByTestId("button-components.CookieBanner.button.reject")
    );
    expect(rejectCookiesMock).toHaveBeenCalledTimes(1);
  });

  test("clicking settings button when settings are shown calls acceptCookies", () => {
    (useCookieConsent as jest.Mock).mockReturnValue({
      cookieConsent: undefined,
      acceptCookies: acceptCookiesMock,
      rejectCookies: rejectCookiesMock,
    });

    render(<CookieBanner />);

    // First click shows settings
    fireEvent.click(
      screen.getByTestId("button-components.CookieBanner.button.showSettings")
    );

    // Second click should save settings and call acceptCookies
    fireEvent.click(
      screen.getByTestId("button-components.CookieBanner.button.saveSettings")
    );
    expect(acceptCookiesMock).toHaveBeenCalledTimes(1);
  });
});
