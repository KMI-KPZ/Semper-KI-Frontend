import { render } from "@testing-library/react";
import { Background } from "./Background";

describe("Background Component", () => {
  test("renders without crashing", () => {
    const { container } = render(<Background />);
    expect(container).toBeTruthy();
  });

  test("renders a div with correct styling classes", () => {
    const { container } = render(<Background />);
    const bgDiv = container.firstChild as HTMLElement;

    const expectedClasses = [
      "fixed",
      "left-0",
      "top-0",
      "-z-10",
      "h-full",
      "min-h-[200px]",
      "w-full",
      "bg-ultramarinblau-dark",
    ];

    expectedClasses.forEach((className) => {
      expect(bgDiv.classList.contains(className)).toBeTruthy();
    });
  });

  test("has correct position fixed at top-left", () => {
    const { container } = render(<Background />);
    const bgDiv = container.firstChild as HTMLElement;

    expect(bgDiv.classList.contains("fixed")).toBeTruthy();
    expect(bgDiv.classList.contains("left-0")).toBeTruthy();
    expect(bgDiv.classList.contains("top-0")).toBeTruthy();
  });
});
