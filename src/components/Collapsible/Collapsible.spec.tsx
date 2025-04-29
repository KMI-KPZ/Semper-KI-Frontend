import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Collapsible from "./Collapsible";

// Mock the translation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === "general.button.expand") return "Expand";
      if (key === "general.button.collapse") return "Collapse";
      return key;
    },
  }),
}));

// Mock the material UI icon
jest.mock("@mui/icons-material/ExpandMore", () => () => (
  <div>ExpandMoreIcon</div>
));

// Mock the component library components
jest.mock("@component-library/index", () => ({
  Button: ({ children, onClick, title }: any) => (
    <button onClick={onClick} title={title} data-testid="button">
      {children}
    </button>
  ),
  Text: ({ children, variant }: any) => (
    <span data-variant={variant} data-testid="text">
      {children}
    </span>
  ),
}));

describe("Collapsible", () => {
  test("renders children when expanded", () => {
    render(
      <Collapsible initialOpen>
        <div data-testid="child-content">Test Content</div>
      </Collapsible>
    );

    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  test("does not visibly render children when collapsed", () => {
    render(
      <Collapsible>
        <div data-testid="child-content">Test Content</div>
      </Collapsible>
    );

    const container = screen.getByTestId("child-content").parentElement;
    expect(container).toHaveClass("h-0");
  });

  test("toggles expansion state when button is clicked", () => {
    render(
      <Collapsible showButton>
        <div data-testid="child-content">Test Content</div>
      </Collapsible>
    );

    // Initially collapsed
    let container = screen.getByTestId("child-content").parentElement;
    expect(container).toHaveClass("h-0");

    // Expand
    fireEvent.click(screen.getByTestId("button"));
    container = screen.getByTestId("child-content").parentElement;
    expect(container).toHaveClass("h-fit");
    expect(screen.getByText("Collapse")).toBeInTheDocument();

    // Collapse again
    fireEvent.click(screen.getByTestId("button"));
    container = screen.getByTestId("child-content").parentElement;
    expect(container).toHaveClass("h-0");
    expect(screen.getByText("Expand")).toBeInTheDocument();
  });

  test("shows button when showButton is true", () => {
    render(
      <Collapsible showButton>
        <div>Test Content</div>
      </Collapsible>
    );

    expect(screen.getByTestId("button")).toBeInTheDocument();
  });

  test("does not show button when showButton is false", () => {
    render(
      <Collapsible>
        <div>Test Content</div>
      </Collapsible>
    );

    expect(screen.queryByTestId("button")).not.toBeInTheDocument();
  });

  test("calls setExpand when provided and button is clicked", () => {
    const setExpandMock = jest.fn();

    render(
      <Collapsible expand={false} setExpand={setExpandMock} showButton>
        <div>Test Content</div>
      </Collapsible>
    );

    fireEvent.click(screen.getByTestId("button"));
    expect(setExpandMock).toHaveBeenCalledWith(true);
  });

  test("applies custom className", () => {
    render(
      <Collapsible className="custom-class" initialOpen>
        <div data-testid="child-content">Test Content</div>
      </Collapsible>
    );

    const container = screen.getByTestId("child-content").parentElement;
    expect(container).toHaveClass("custom-class");
  });
});
