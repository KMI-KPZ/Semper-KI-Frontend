import { render, screen, fireEvent } from "@test/render";
import Profile from "./Proflle";
import { UserType } from "@/hooks/useUser/types";
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
    render(<Profile user={user} />);
    expect(true).toBeTruthy();
  });
  it("should call deleteUser onClickButtonDelete", () => {
    const user = new UserBuilder().withType(UserType.USER).build();
    render(<Profile user={user} />);
    const button = screen.getByTestId("button-delete");
    fireEvent.click(button);
    expect(mockedDeleteUser).toBeCalledTimes(1);
  });
  it("should render data from user", () => {
    const user = new UserBuilder().withType(UserType.USER).build();
    render(<Profile user={user} />);
    expect(screen.getByText(/test@test.de/)).toBeVisible();
    expect(screen.getByText(/testCity/)).toBeVisible();
    expect(screen.getByText(/germany/)).toBeVisible();
    expect(screen.getByText(/testStreet/)).toBeVisible();
    expect(screen.getByText(/54321/)).toBeVisible();
    expect(screen.getByText(/12345/)).toBeVisible();
  });
});
