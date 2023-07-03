import { render } from "@testing-library/react";
import Profil from ".";
import { UserType } from "@/hooks/useUser/types";

const mockedT = jest.fn();
jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: mockedT,
    };
  },
}));

const mockedDeleteUser = jest.fn();
const mockedUpdateUser = jest.fn();
jest.mock("@/hooks/useUser", () => ({
  default: () => ({
    deleteUser: mockedDeleteUser,
    updateUser: mockedUpdateUser,
  }),
}));

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => ({
    navigate: mockedNavigate,
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
});
