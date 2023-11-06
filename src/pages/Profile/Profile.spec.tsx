import { render, screen, fireEvent } from "@test/render";
import Profile from "./Proflle";
import { UserType } from "@/hooks/UseUser";
import { UserBuilder } from "@test/builder";

const mockedDeleteUser = jest.fn();
const mockedUpdateUser = jest.fn();
jest.mock("@/hooks/useUser", () => ({
  __esModule: true,
  default: () => ({
    deleteUser: mockedDeleteUser,
    updateUser: mockedUpdateUser,
  }),
}));

describe("Profil", () => {
  it("should render without crashing", () => {
    const user = new UserBuilder().withType(UserType.USER).build();
    render(<Profile />);
    expect(true).toBeTruthy();
  });
  it("should call deleteUser onClickButtonDelete", () => {
    const user = new UserBuilder().withType(UserType.USER).build();
    render(<Profile />);
    const button = screen.getByTestId("button-delete");
    fireEvent.click(button);
    expect(mockedDeleteUser).toBeCalledTimes(1);
  });
  it("should render data from user", () => {
    const user = new UserBuilder().withType(UserType.USER).build();
    render(<Profile />);
    expect(screen.getByText(/enum.UserType.USER/)).toBeVisible();
    expect(screen.getByText(/test@test.de/)).toBeVisible();
    expect(screen.getByText(/testName/)).toBeVisible();
  });
});
