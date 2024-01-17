import { render, screen, fireEvent } from "@test/render";
import { Button } from "./Button";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Button", () => {
  it("renders button with title", () => {
    render(<Button title="Click me" />);
    const buttonElement = screen.getByText("Click me");
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button title="Click me" onClick={handleClick} />);
    const buttonElement = screen.getByText("Click me");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("navigates to the specified URL when clicked", () => {
    render(<Button title="Go to Home" to="/home" />);
    const buttonElement = screen.getByText("Go to Home");
    fireEvent.click(buttonElement);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/home");
  });

  it("should not call onCLick handler when button is not active", () => {
    const handleClick = jest.fn();
    render(<Button title="Click me" onClick={handleClick} active={false} />);
    const buttonElement = screen.getByText("Click me");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
