import { render } from "@test/render";
import { LoadingAnimation, AppLoadingSuspense } from "./Loading";

describe("LoadingAnimation", () => {
  it("renders without error", () => {
    render(<LoadingAnimation />);
  });

  it("renders with custom color", () => {
    render(<LoadingAnimation color="red" />);
  });

  it("renders with text", () => {
    render(<LoadingAnimation text />);
  });

  it("renders with custom className", () => {
    render(<LoadingAnimation className="custom-class" />);
  });
});

describe("AppLoadingSuspense", () => {
  it("renders without error", () => {
    render(<AppLoadingSuspense />);
  });
});
