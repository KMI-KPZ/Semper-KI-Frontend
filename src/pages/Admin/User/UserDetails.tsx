import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading, Modal } from "@component-library/index";
import useAdmin from "../../../hooks/useAdmin";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import BackButtonContainer from "@/components/BackButtonContainer/BackButtonContainer";

interface AdminUserDetailsProps {}

const AdminUserDetails: React.FC<AdminUserDetailsProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { userID } = useParams();
  const { users } = useAdmin();

  const user = users.find((user) => user.hashedID === userID);

  if (user === undefined) return <Navigate to=".." />;

  return (
    <Modal
      modalKey="adminuserdetails"
      open={true}
      closeModal={() => navigate("..")}
    >
      <Container width="full" direction="col" className="bg-white p-5">
        <BackButtonContainer>
          <Heading variant="h1">{t("Admin.User.details.heading")}</Heading>
        </BackButtonContainer>
        <table className="w-fit table-auto border-collapse border-spacing-x-4  border-spacing-y-1 rounded-md border-2">
          <tbody>
            <tr>
              <th colSpan={2} className="border-2">
                {t("Admin.User.general")}
              </th>
            </tr>
            <tr>
              <td className="border-b-2 px-5 py-2">{t("Admin.User.name")}</td>
              <td className="border-b-2 border-l-2 px-5 py-2">{user.name}</td>
            </tr>
            <tr>
              <td className="border-b-2 px-5 py-2">{t("Admin.User.email")}</td>
              <td className="border-b-2 border-l-2 px-5 py-2">
                {user.details.email ?? "---"}
              </td>
            </tr>
            <tr>
              <td className="border-b-2 px-5 py-2">{t("Admin.User.locale")}</td>
              <td className="border-b-2 border-l-2 px-5 py-2">
                {user.details.locale ?? "---"}
              </td>
            </tr>
            <tr>
              <th colSpan={2} className="border-2">
                {t("Admin.User.statistics")}
              </th>
            </tr>
            <tr>
              <td className="border-b-2 px-5 py-2">
                {t("Admin.User.lastLogin")}
              </td>
              <td className="border-b-2 border-l-2 px-5 py-2">
                {user.details.statistics?.lastLogin !== undefined
                  ? new Date(
                      user.details.statistics?.lastLogin
                    ).toLocaleString()
                  : "---"}
              </td>
            </tr>
            <tr>
              <td className="border-b-2 px-5 py-2">
                {t("Admin.User.locationOfLastLogin")}
              </td>
              <td className="border-b-2 border-l-2 px-5 py-2">
                {user.details.statistics?.locationOfLastLogin}
              </td>
            </tr>
            <tr>
              <td className="border-b-2 px-5 py-2">
                {t("Admin.User.numberOfLoginsTotal")}
              </td>
              <td className="border-b-2 border-l-2 px-5 py-2">
                {user.details.statistics?.numberOfLoginsTotal}
              </td>
            </tr>
            <tr>
              <th colSpan={2} className="border-2">
                {t("Admin.User.orga")}
              </th>
            </tr>
            {user.organizationNames === undefined ||
            user.organizationNames.length === 0 ? (
              <tr>
                <td colSpan={2} className=" border-b-2 px-5 py-2 text-center">
                  ---
                </td>
              </tr>
            ) : (
              user.organizationNames.map((orgaName, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td colSpan={2} className="px-5 py-2">
                      {orgaName}
                    </td>
                  </tr>
                  {/* <tr>
                    <td colSpan={2} className="border-b-2 px-5 py-2">
                      {user.organization !== undefined
                        ? user.organization[index]
                        : "---"}
                    </td>
                  </tr> */}
                </React.Fragment>
              ))
            )}
            <tr>
              <th colSpan={2} className="border-2">
                {t("Admin.User.adresses")}
              </th>
            </tr>
            <tr>
              <td colSpan={2} className=" border-b-2 px-5 py-2 text-center">
                ---
              </td>
            </tr>
            {/* {user.details.addresses === undefined ||
          user.details.addresses.length === 0
            ? "---"
            : user.details.addresses.map((address) => (
                <tr>
                  <td className="border-b-2 px-5 py-2">
                    {t("Admin.User.created")}
                  </td>
                  <td className="border-b-2 border-l-2 px-5 py-2">
                    {address.street}
                    {address.houseNumber}, {address.zipcode} {address.city},{" "}
                    {address.country}
                  </td>
                </tr>
              ))} */}
            <tr>
              <th colSpan={2} className="border-2">
                {t("Admin.User.dates")}
              </th>
            </tr>
            <tr>
              <td className="border-b-2 px-5 py-2">
                {t("Admin.User.created")}
              </td>
              <td className="whitespace-nowrap border-b-2 border-l-2 px-5 py-2">
                {new Date(user.createdWhen).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="border-b-2 px-5 py-2 ">
                {t("Admin.User.accessed")}
              </td>
              <td className="whitespace-nowrap border-b-2 border-l-2 px-5 py-2">
                {new Date(user.accessedWhen).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="border-b-2 px-5 py-2">
                {t("Admin.User.updated")}
              </td>
              <td className="whitespace-nowrap border-b-2 border-l-2 px-5 py-2">
                {new Date(user.updatedWhen).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="border-b-2 px-5 py-2">
                {t("Admin.User.lastSeen")}
              </td>
              <td className="whitespace-nowrap border-b-2 border-l-2 px-5 py-2">
                {new Date(user.lastSeen).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          size="sm"
          variant="primary"
          title={t("Admin.User.button.edit")}
          to={"edit"}
        />
      </Container>
    </Modal>
  );
};

export default AdminUserDetails;
