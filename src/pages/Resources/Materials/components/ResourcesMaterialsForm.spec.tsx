import { render, screen } from "@test/render";
import ResourcesMaterialsForm from "./ResourcesMaterialsForm";

describe("<ResourcesMaterialsForm>", () => {
  it("should render", () => {
    render(<ResourcesMaterialsForm />);
    expect(screen.getByTestId("resources-material-form")).toBeInTheDocument();
  });
  it.todo("should render material items");
});
