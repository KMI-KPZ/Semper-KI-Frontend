import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Card from "./Card";

describe("Card component", () => {
  test("renders children correctly", () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("applies default classes correctly", () => {
    render(<Card>Test Content</Card>);
    const cardElement = screen.getByText("Test Content").closest("a");
    expect(cardElement).toHaveClass("items-center");
  });

  test("applies custom className", () => {
    render(<Card className="custom-class">Test Content</Card>);
    const cardElement = screen.getByText("Test Content").closest("a");
    expect(cardElement).toHaveClass("custom-class");
  });

  test("handles onClick event", () => {
    const handleClick = jest.fn();
    render(<Card onClick={handleClick}>Test Content</Card>);
    const cardElement = screen.getByText("Test Content").closest("a");
    if (cardElement) {
      userEvent.click(cardElement);
    }
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies hover effects by default", () => {
    render(<Card>Test Content</Card>);
    const cardElement = screen.getByText("Test Content").closest("a");
    expect(cardElement).toHaveClass("hover:cursor-pointer");
  });

  test("does not apply hover effects when hoverEffects is false", () => {
    render(<Card hoverEffects={false}>Test Content</Card>);
    const cardElement = screen.getByText("Test Content").closest("a");
    expect(cardElement).not.toHaveClass("hover:cursor-pointer");
  });
});
