import { render, screen } from "@test/render";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";

describe("Breadcrumb", () => {
  it("renders breadcrumb items correctly", () => {
    render(<Breadcrumb />);

    const breadcrumbItems = screen.getAllByTestId("button");

    expect(breadcrumbItems).toHaveLength(1);
    expect(breadcrumbItems[0]).toHaveTextContent("data.NavigationItem.home");
  });

  it("navigates to the correct links when clicked", () => {
    render(<Breadcrumb />);

    const breadcrumbItems = screen.getAllByTestId("button");

    // Simulate click on the first breadcrumb item
    breadcrumbItems[0].click();
    expect(window.location.pathname).toBe("/");
  });
});
