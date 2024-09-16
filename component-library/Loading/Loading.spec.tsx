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

// describe.skip("LoadingSuspense", () => {
//   it("renders loading state", () => {
//     render(<LoadingSuspense query={mockedQuery} />);
//   });

//   it("renders loading state with animation", () => {
//     render(<LoadingSuspense query={mockedQuery} animation />);
//   });

//   it("renders loading state with custom loading text", () => {
//     render(
//       <LoadingSuspense query={mockedQuery} loadingText="Custom Loading Text" />
//     );
//   });

//   it("renders error state", () => {
//     const query = { status: "error", error: new Error("Test Error") };
//     render(<LoadingSuspense query={mockedQuery} />);
//   });

//   it("renders error state with custom error text", () => {
//     const query = { status: "error", error: new Error("Test Error") };
//     render(
//       <LoadingSuspense query={mockedQuery} errorText="Custom Error Text" />
//     );
//   });

//   it("renders children when not in loading or error state", () => {
//     const query = { status: "success" };
//     render(
//       <LoadingSuspense query={mockedQuery}>
//         <div>Child Component</div>
//       </LoadingSuspense>
//     );
//   });
// });

describe("AppLoadingSuspense", () => {
  it("renders without error", () => {
    render(<AppLoadingSuspense />);
  });
});
