import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

jest.mock("axios", () => {});
jest.mock("react-router-dom", () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual("react-router-dom");

  return {
    __esModule: true,
    ...originalModule,
    // add your noops here
    useParams: jest.fn(),
    useHistory: jest.fn(),
    useNavigate: jest.fn(),
  };
});

const mockedT = jest.fn();
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

describe.skip(App, () => {
  it("should render", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.findByTestId("app")).toBeInTheDocument;
  });
  it("should have header", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.findAllByTestId("header")).toBeInTheDocument;
  });
  it("should have Routes", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.findAllByTestId("routes")).toBeInTheDocument;
  });
  it("should have Rout in Routes", () => {
    const routes = screen.findAllByTestId("routes");
    expect(routes).toContainHTML;
  });
});
