import { render, fireEvent } from "@test/render";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("should render the switch component", () => {
    const { getByTestId } = render(
      <Switch onChange={() => {}} value={false} />
    );
    const switchComponent = getByTestId("switch-component");

    expect(switchComponent).toBeInTheDocument();
  });

  it("should call the onChange function when clicked", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <Switch onChange={onChangeMock} value={false} />
    );
    const switchComponent = getByTestId("switch-component");

    fireEvent.click(switchComponent);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(true);
  });
});
