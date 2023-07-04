import { render, screen, fireEvent } from "@test/render";
import Profil from ".";
import { UserType } from "@/hooks/useUser/types";

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
    render(
      <Profil
        user={{
          accessed: new Date(),
          address: {
            city: "test",
            country: "germany",
            houseNumber: "1",
            street: "teststreet",
            zipcode: "12345",
          },
          created: new Date(),
          email: "test@test.de",
          name: "test",
          organization: "",
          updated: new Date(),
          type: UserType.client,
          hashedID: "",
        }}
      />
    );
    expect(true).toBeTruthy();
  });
  it("should call deleteUser onClickButtonDelete", () => {
    render(
      <Profil
        user={{
          accessed: new Date(),
          address: {
            city: "test",
            country: "germany",
            houseNumber: "1",
            street: "teststreet",
            zipcode: "12345",
          },
          created: new Date(),
          email: "test@test.de",
          name: "test",
          organization: "",
          updated: new Date(),
          type: UserType.client,
          hashedID: "",
        }}
      />
    );
    const button = screen.getByTestId("button-delete");
    fireEvent.click(button);
    expect(mockedDeleteUser).toBeCalledTimes(1);
  });
  it("should render data from user", () => {
    render(
      <Profil
        user={{
          accessed: new Date(),
          address: {
            city: "testCity",
            country: "germany",
            houseNumber: "34567641",
            street: "testStreet",
            zipcode: "12345",
          },
          created: new Date(),
          email: "test@test.de",
          name: "testName",
          organization: "",
          updated: new Date(),
          type: UserType.client,
          hashedID: "",
        }}
      />
    );
    expect(screen.getByText(/testName/)).toBeVisible();
    expect(screen.getByText(/testCity/)).toBeVisible();
    expect(screen.getByText(/germany/)).toBeVisible();
    expect(screen.getByText(/34567641/)).toBeVisible();
    expect(screen.getByText(/testStreet/)).toBeVisible();
    expect(screen.getByText(/12345/)).toBeVisible();
    expect(screen.getByText(/test@test.de/)).toBeVisible();
  });
});
