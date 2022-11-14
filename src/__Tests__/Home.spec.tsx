import { render, fireEvent, screen } from "@testing-library/react";
import { Home } from "../containers/Home/Home";

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

beforeEach(() => {
  render(<Home />);
});

describe(Home, () => {
  it("should render Home", () => {
    expect(screen.getByTestId("home")).toBeInTheDocument;
  });
  it("should have header", () => {
    expect(screen.getByTestId("header")).toBeInTheDocument;
    expect(mockedT).toBeCalledWith("home.header");
  });
});
