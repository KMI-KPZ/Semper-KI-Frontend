import { render } from "@testing-library/react";
import BottomFixedContainer from "./BottomFixedContainer";
import "@testing-library/jest-dom";

describe("BottomFixedContainer", () => {
  it("should render children correctly", () => {
    const { getByText } = render(
      <BottomFixedContainer>
        <div>Test Child</div>
      </BottomFixedContainer>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("should apply the correct class names", () => {
    const { container } = render(<BottomFixedContainer />);
    expect(container.firstChild).toHaveClass(
      "fixed bottom-5 right-5 z-50 gap-5"
    );
  });

  it("should merge additional class names", () => {
    const { container } = render(
      <BottomFixedContainer className="additional-class" />
    );
    expect(container.firstChild).toHaveClass(
      "fixed bottom-5 right-5 z-50 gap-5 additional-class"
    );
  });
});
