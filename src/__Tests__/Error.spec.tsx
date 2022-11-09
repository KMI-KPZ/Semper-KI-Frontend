import { render, fireEvent, screen } from "@testing-library/react";
import { Error } from "../Error";

const mockedUseNavigate = jest.fn((str: string): string => str);
const mockedT = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUseNavigate,
}));

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: mockedT, //(str: string): string => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe("Error Page Test", () => {
  it("should render Error", () => {
    render(<Error />);

    expect(screen.findByTestId("Error")).toBeInTheDocument;
  });
  it("should call t to translate Text", () => {
    render(<Error />);
    const errorMessage = screen.findByTestId("ErrorMessage");
    const homeButton = screen.findByTestId("HomeButton");

    expect(mockedT).toBeCalledTimes(2);
    expect(mockedT).toHaveBeenCalledWith("error.text");
    expect(mockedT).toHaveBeenCalledWith("error.button");
    expect(errorMessage).not.toBeEmptyDOMElement;
    expect(homeButton).not.toBeEmptyDOMElement;
  });
  it("should call UseNavigate on HomeButtonpress", () => {
    render(<Error />);

    fireEvent.click(screen.getByTestId("HomeButton"));
    expect(mockedUseNavigate).toHaveBeenCalled;
  });
});
