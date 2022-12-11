import { render, fireEvent, screen } from "@testing-library/react";
import { Header } from "./Header";

const mockedUseNavigate = jest.fn((str: string): string => str);
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUseNavigate,
}));

const mockedT = jest.fn();
const mockedChangeLanguage = jest.fn((str: string): void => {});
jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: mockedT, //(str: string): string => str,
      i18n: {
        changeLanguage: mockedChangeLanguage,
        language: "de",
      },
    };
  },
}));

const mockedSetUserType = jest.fn();
const mockedSetUser = jest.fn();

beforeEach(() => {
  render(
    <Header
      setUserType={mockedSetUserType}
      authToken={null}
      userType="client"
    />
  );
});

describe(Header, () => {
  it("should render Header", () => {
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
  it("should have logo and logoName", () => {
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("logoName")).toBeInTheDocument();
  });
  it("should have language menu", () => {
    expect(screen.getByTestId("languageMenu")).toBeInTheDocument();
  });
  describe("Test Language Menu", () => {
    it("should have language menu", () => {
      expect(screen.getByTestId("languageMenu")).toBeInTheDocument();
    });
    it("should open Menu onClick an show Flags", () => {
      const menu = screen.getByTestId("languageMenu");
      fireEvent.click(menu);

      expect(screen.getByTestId("dropdown")).toBeInTheDocument();
      expect(screen.getByTestId("gb")).toBeInTheDocument();
      expect(screen.getByTestId("de")).toBeInTheDocument();
    });
    it("should change language onClick gbFlag", () => {
      const menu = screen.getByTestId("languageMenu");
      fireEvent.click(menu);
      const gbFlag = screen.getByTestId("gb");
      fireEvent.click(gbFlag);
      expect(mockedChangeLanguage).toBeCalledWith("en");
    });
    it("should not change language onClick deFlag", () => {
      const menu = screen.getByTestId("languageMenu");
      fireEvent.click(menu);
      const deFlag = screen.getByTestId("de");
      fireEvent.click(deFlag);
      expect(mockedChangeLanguage).not.toBeCalled();
      expect(deFlag).toHaveClass("disabled");
    });
    it.skip("should close Menu onClick somewhere else", () => {
      const menu = screen.getByTestId("languageMenu");
      const mainNav = screen.getByTestId("mainNav");
      fireEvent.click(menu);
      const dropdown = screen.getByTestId("dropdown");
      fireEvent.click(mainNav);
      expect(screen.findByTestId("dropdown")).not.toBeInTheDocument();
    });
  });
});
