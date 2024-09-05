import { render } from "@test/render";
import { ContentBox } from "./ContextBox";

describe("ContentBox", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <ContentBox>
        <div>Child 1</div>
        <div>Child 2</div>
      </ContentBox>
    );

    expect(getByText("Child 1")).toBeInTheDocument();
    expect(getByText("Child 2")).toBeInTheDocument();
  });

  it("applies custom className correctly", () => {
    const { container } = render(
      <ContentBox className="custom-class">
        <div>Child</div>
      </ContentBox>
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
