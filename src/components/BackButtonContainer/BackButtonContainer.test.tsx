import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import BackButtonContainer from "./BackButtonContainer";
import { useTranslation } from "react-i18next";
import logger from "@/hooks/useLogger";

// Mock the dependencies
jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

// Mock the component library
jest.mock("@component-library/index", () => ({
  Button: jest.fn(({ children, className, ...props }) => (
    <button data-testid="mock-button" {...props} className={className}>
      {children}
    </button>
  )),
  Container: jest.fn(({ children, className, ...props }) => (
    <div data-testid="mock-container" {...props} className={className}>
      {children}
    </div>
  )),
}));

// Mock the icon
jest.mock("@mui/icons-material/ArrowBackIos", () => () => (
  <span data-testid="mock-arrow-icon" />
));

describe("BackButtonContainer", () => {
  const mockT = jest.fn((key) =>
    key === "general.button.back" ? "Back" : key
  );

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: mockT,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("renders the component structure correctly", () => {
    render(<BackButtonContainer />);
    expect(screen.getByTestId("mock-container")).toBeInTheDocument();
    expect(screen.getByTestId("mock-button")).toBeInTheDocument();
    expect(screen.getByTestId("mock-arrow-icon")).toBeInTheDocument();
  });

  it("translates the back button text correctly", () => {
    render(<BackButtonContainer />);
    expect(mockT).toHaveBeenCalledWith("general.button.back");
    expect(screen.getByTestId("mock-button")).toHaveAttribute("title", "Back");
  });

  it('uses default path ".." when backPath is not provided', () => {
    render(<BackButtonContainer />);
    expect(screen.getByTestId("mock-button")).toHaveAttribute("to", "..");
  });

  it("uses the provided backPath when specified", () => {
    render(<BackButtonContainer backPath="/custom-path" />);
    expect(screen.getByTestId("mock-button")).toHaveAttribute(
      "to",
      "/custom-path"
    );
  });

  it("renders children inside the container", () => {
    const testChild = "Test Child Content";
    render(
      <BackButtonContainer>
        <div data-testid="test-child">{testChild}</div>
      </BackButtonContainer>
    );
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByTestId("test-child").textContent).toBe(testChild);
  });

  it("applies the correct props and styling to components", () => {
    render(<BackButtonContainer />);
    const button = screen.getByTestId("mock-button");
    expect(button).toHaveAttribute("width", "fit");
    expect(button).toHaveAttribute("variant", "text");
    logger(button);

    const container = screen.getByTestId("mock-container");
    expect(container).toHaveAttribute("width", "full");
  });
});
